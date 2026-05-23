jest.mock('vscode', () => ({ workspace: {} }), { virtual: true });

import { formatBedrockContext, parseIdentifier, parseManifestName, parseNamespaces } from './context-variable';

describe('bedrock chat context variable helpers', () => {
  it('parses manifest pack names and falls back to the folder name', () => {
    expect(parseManifestName(JSON.stringify({ header: { name: 'Behavior Pack' } }), 'behavior_pack')).toBe('Behavior Pack');
    expect(parseManifestName('{', 'behavior_pack')).toBe('behavior_pack');
  });

  it('parses namespaces from mcattributes content', () => {
    const content = ['pack_format=7', 'namespace = blockception', '# namespace=ignored', 'namespace=bedrock'].join('\n');

    expect(parseNamespaces(content)).toEqual(['bedrock', 'blockception']);
  });

  it('extracts identifiers from supported bedrock file shapes', () => {
    expect(
      parseIdentifier(JSON.stringify({ 'minecraft:entity': { description: { identifier: 'test:entity' } } }), [
        ['minecraft:entity', 'description', 'identifier'],
      ]),
    ).toBe('test:entity');

    expect(
      parseIdentifier(JSON.stringify({ 'minecraft:client_entity': { description: { identifier: 'test:client' } } }), [
        ['minecraft:entity', 'description', 'identifier'],
        ['minecraft:client_entity', 'description', 'identifier'],
      ]),
    ).toBe('test:client');
  });

  it('formats a complete project summary', () => {
    expect(
      formatBedrockContext({
        workspaceFolders: ['demo'],
        packNames: ['BP', 'RP'],
        namespaces: ['blockception'],
        entities: ['blockception:test_entity'],
        blocks: ['blockception:test_block'],
        items: ['blockception:test_item'],
      }),
    ).toContain('- Pack names (2): BP, RP');
  });
});
