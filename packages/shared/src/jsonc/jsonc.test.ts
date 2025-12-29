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

  describe('To with invalid JSON', () => {
    const originalConsoleError = console.error;
    
    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = originalConsoleError;
    });

    it('should handle invalid JSON string', () => {
      const data = `{invalid json}`;
      const obj = Json.To<TestInterface>(data);

      expect(obj).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle invalid JSON from TextDocument', () => {
      const data = `{invalid json}`;
      const obj = Json.To<TestInterface>({ getText: () => data, uri: 'test://invalid.json' });

      expect(obj).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Cannot cast file to json: test://invalid.json'));
    });

    it('should handle empty string', () => {
      const obj = Json.To<TestInterface>('');

      expect(obj).toBeUndefined();
    });

    it('should handle error without message property', () => {
      // Mock jsonc.parse to throw an error without message property
      const originalParse = require('jsonc').jsonc.parse;
      const mockError = { code: 'SOME_ERROR' };
      require('jsonc').jsonc.parse = jest.fn(() => {
        throw mockError;
      });

      const obj = Json.To<TestInterface>('test');

      expect(obj).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(mockError)));

      // Restore original parse
      require('jsonc').jsonc.parse = originalParse;
    });
  });
});

interface TestInterface {
  id: string;
  documentation: string;
}