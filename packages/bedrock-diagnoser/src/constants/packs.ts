import { PackType } from 'bc-minecraft-bedrock-project';

export type PackStringType = ReturnType<typeof packTypeToString>;

export function packTypeToString(type: PackType) {
  switch (type) {
    case PackType.resource_pack:
      return 'resourcepack';
    case PackType.behavior_pack:
      return 'behaviorpack';
    case PackType.skin_pack:
      return 'skinpack';
    case PackType.world:
      return 'world';
    default:
    case PackType.unknown:
      return 'unknown';
  }
}
