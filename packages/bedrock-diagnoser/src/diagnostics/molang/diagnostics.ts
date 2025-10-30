import { Identifiable } from 'bc-minecraft-bedrock-types/src/types';
import { MolangDataSetKey, MolangSet, ResourceReferenceNode, ResourceScope, VariableNode, VariableScope } from 'bc-minecraft-molang';
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

  for (const res of resource.molang.using.values()) {
    if (res.scope === 'this') return;
    const identifier = getId(res);
    if (assigned.has(identifier)) continue;

    diagnoser.add(
      user.id,
      `${identifier} is used by, but no definition is found by: ${diagnoser.metadata.userType} with id: ${user.id}`,
      DiagnosticSeverity.error,
      `molang.${res.scope}.undefined`,
    );
  }
}

function getId(item: VariableNode | ResourceReferenceNode) {
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

    return `${item}.${item.names.join('.')}`
}

function getAssignedIds(receiver: Set<string>, data: MolangSet) {
  for (const item of data.assigned.values()) {
    receiver.add(getId(item));
  }
}
