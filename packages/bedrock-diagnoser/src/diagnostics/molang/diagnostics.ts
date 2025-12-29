import { Identifiable } from '@blockception/packages-shared';
import {
  Data,
  MolangData,
  MolangDataSet,
  MolangDataSetKey,
  MolangSet,
  ResourceReferenceNode,
  ResourceScope,
  VariableNode,
  VariableScope,
} from 'bc-minecraft-molang';
import { DiagnosticsBuilder, DiagnosticSeverity, WithMetadata } from '../../types';

/**
 * The user of the resource, the user should have the nessecary things defined for the resource to use
 */
export interface User extends Identifiable {
  id: string;
  molang: MolangSet;
}

/**
 * The resource that has molang / statements that require to be defined
 */
export interface Resource extends Identifiable {
  id: string;
  molang: MolangSet;
}

export interface MolangMetadata {
  userType: MolangDataSetKey;
}

/**
 * Diagnoses the given molang sets, the using party checks upon the definer if they have setup properly
 * @param using The set of molang data that is being used
 * @param definer The set of molang data that is defined
 * @param diagnoser The diagnoser to report to
 */
export function diagnose_molang_implementation(
  user: User,
  resource: Resource,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>,
): void {
  const assigned = new Set<string>();
  getAssignedIds(assigned, resource.molang);
  getAssignedIds(assigned, user.molang);
  const molangset = MolangData.get(diagnoser.metadata.userType);

  for (const res of resource.molang.using.values()) {
    if (res.scope === 'this') return;
    const identifier = getId(res);
    if (assigned.has(identifier)) continue;

    // Check if this is a built-in variable/context/temp for this user type
    // Resource references (texture, geometry, material) are never built-in, they must be defined
    const normalizedScope = normalizeVariableScope(res);

    if (!isResourceReference(normalizedScope)) {
      // Only check built-in data for variable scopes (not resources)
      const builtInData = MolangDataSet.get(molangset, normalizedScope);
      const fnId = getFnId(res);

      if (builtInData?.some((x) => x.id === fnId)) {
        continue;
      }
    }

    diagnoser.add(
      user.id,
      `${identifier} is used by, but no definition is found by: ${diagnoser.metadata.userType} with id: ${user.id}`,
      DiagnosticSeverity.error,
      `molang.${res.scope}.undefined`,
    );
  }
}

function isResourceReference(item: string): item is 'texture' | 'geometry' | 'material' {
  switch (item) {
    case 'texture':
    case 'geometry':
    case 'material':
      return true;
  }

  return false;
}

function getId(item: VariableNode | ResourceReferenceNode) {
  const scope = normalizeVariableScope(item);
  return `${scope}.${item.names.join('.')}`;
}

function getFnId(item: VariableNode | ResourceReferenceNode) {
  return `${item.names.join('.')}`;
}

function normalizeVariableScope(item: VariableNode | ResourceReferenceNode) {
  let scope: VariableScope | ResourceScope = item.scope;

  switch (scope) {
    case 'c':
      scope = 'context';
      break;
    case 't':
      scope = 'temp';
      break;
    case 'v':
      scope = 'variable';
      break;
  }

  return scope;
}

function getAssignedIds(receiver: Set<string>, data: MolangSet) {
  for (const item of data.assigned.values()) {
    receiver.add(getId(item));
  }
}
