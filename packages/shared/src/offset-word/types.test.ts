import { OffsetWord } from './types';

describe('OffsetWord', () => {
  it('create with text and offset', () => {
    const word = OffsetWord.create('test', 10);

    expect(word.text).toEqual('test');
    expect(word.offset).toEqual(10);
  });

  it('create with text only - defaults to offset 0', () => {
    const word = OffsetWord.create('test');

    expect(word.text).toEqual('test');
    expect(word.offset).toEqual(0);
  });

  it('is - valid OffsetWord', () => {
    const word = { text: 'example', offset: 5 };

    expect(OffsetWord.is(word)).toBeTruthy();
  });

  it('is - invalid OffsetWord with missing text', () => {
    const word = { offset: 5 };

    expect(OffsetWord.is(word)).toBeFalsy();
  });

  it('is - invalid OffsetWord with missing offset', () => {
    const word = { text: 'example' };

    expect(OffsetWord.is(word)).toBeFalsy();
  });

  it('is - invalid OffsetWord with wrong types', () => {
    const word = { text: 123, offset: 'wrong' };

    expect(OffsetWord.is(word)).toBeFalsy();
  });

  it('is - null value', () => {
    expect(OffsetWord.is(null)).toBeFalsy();
  });

  it('is - string value', () => {
    expect(OffsetWord.is('string')).toBeFalsy();
  });
});
