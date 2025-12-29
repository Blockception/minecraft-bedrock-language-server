import { Json } from './jsonc';

describe('Json', () => {
  describe('To', () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>(data);

    it('should parse valid JSON', () => {
      expect(obj).toBeDefined();
    });

    if (!obj) return;

    it('should parse fields correctly', () => {
      expect(obj.documentation).toEqual('example');
      expect(obj.id).toEqual('controller.example');
    });
  });

  describe('To with TextDocument', () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>({ getText: () => data, uri: 'example' });

    it('should parse valid JSON from TextDocument', () => {
      expect(obj).toBeDefined();
    });

    if (!obj) return;

    it('should parse fields correctly from TextDocument', () => {
      expect(obj.documentation).toEqual('example');
      expect(obj.id).toEqual('controller.example');
    });
  });

  describe('To with JSONC (comments)', () => {
    const data = `{
      // This is a comment
      "id": "controller.example",
      /* Another comment */
      "documentation": "example"
    }`;
    const obj = Json.To<TestInterface>(data);

    it('should parse JSONC with comments', () => {
      expect(obj).toBeDefined();
    });

    if (!obj) return;

    it('should parse fields correctly from JSONC', () => {
      expect(obj.documentation).toEqual('example');
      expect(obj.id).toEqual('controller.example');
    });
  });

  describe('parse', () => {
    it('should parse basic JSON', () => {
      const result = Json.parse('{"key": "value"}');
      expect(result).toEqual({ key: 'value' });
    });

    it('should parse JSONC with comments when stripComments is true', () => {
      const result = Json.parse('{"key": "value" /* comment */}', { stripComments: true });
      expect(result).toEqual({ key: 'value' });
    });
  });
});

interface TestInterface {
  id: string;
  documentation: string;
}