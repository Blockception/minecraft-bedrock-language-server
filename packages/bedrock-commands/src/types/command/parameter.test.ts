import { Parameter } from './parameter';

describe('Parameter', () => {
  describe('constructor', () => {
    it('should create a Parameter with default values', () => {
      const param = new Parameter();
      
      expect(param.text).toBe('');
      expect(param.offset).toBe(0);
    });

    it('should create a Parameter with text only', () => {
      const param = new Parameter('test');
      
      expect(param.text).toBe('test');
      expect(param.offset).toBe(0);
    });

    it('should create a Parameter with text and offset', () => {
      const param = new Parameter('command', 10);
      
      expect(param.text).toBe('command');
      expect(param.offset).toBe(10);
    });

    it('should create a Parameter with empty string and offset', () => {
      const param = new Parameter('', 5);
      
      expect(param.text).toBe('');
      expect(param.offset).toBe(5);
    });
  });

  describe('Parameter.is', () => {
    it('should return true for valid Parameter instance', () => {
      const param = new Parameter('test', 5);
      
      expect(Parameter.is(param)).toBe(true);
    });

    it('should return true for object with text and offset properties', () => {
      const obj = { text: 'hello', offset: 10 };
      
      expect(Parameter.is(obj)).toBe(true);
    });

    it('should return false for null', () => {
      expect(Parameter.is(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(Parameter.is(undefined)).toBe(false);
    });

    it('should return false for object missing text property', () => {
      const obj = { offset: 5 };
      
      expect(Parameter.is(obj)).toBe(false);
    });

    it('should return false for object missing offset property', () => {
      const obj = { text: 'test' };
      
      expect(Parameter.is(obj)).toBe(false);
    });

    it('should return false for object with wrong text type', () => {
      const obj = { text: 123, offset: 5 };
      
      expect(Parameter.is(obj)).toBe(false);
    });

    it('should return false for object with wrong offset type', () => {
      const obj = { text: 'test', offset: 'not a number' };
      
      expect(Parameter.is(obj)).toBe(false);
    });

    it('should return false for empty object', () => {
      expect(Parameter.is({})).toBe(false);
    });

    it('should return false for string', () => {
      expect(Parameter.is('test')).toBe(false);
    });

    it('should return false for number', () => {
      expect(Parameter.is(42)).toBe(false);
    });

    it('should return false for array', () => {
      expect(Parameter.is([])).toBe(false);
    });

    it('should return true for object with extra properties', () => {
      const obj = { text: 'test', offset: 5, extra: 'property' };
      
      expect(Parameter.is(obj)).toBe(true);
    });
  });

  describe('property assignment', () => {
    it('should allow modifying text property', () => {
      const param = new Parameter('initial', 0);
      param.text = 'modified';
      
      expect(param.text).toBe('modified');
    });

    it('should allow modifying offset property', () => {
      const param = new Parameter('test', 0);
      param.offset = 20;
      
      expect(param.offset).toBe(20);
    });
  });
})