import { Range } from './types';
import { Position } from '../position/types';

describe('Range', () => {
  it('is - valid range', () => {
    const range = {
      start: { line: 0, character: 0 },
      end: { line: 5, character: 10 },
    };

    expect(Range.is(range)).toBeTruthy();
  });

  it('is - invalid range with invalid start', () => {
    const range = {
      start: { line: 0 },
      end: { line: 5, character: 10 },
    };

    expect(Range.is(range)).toBeFalsy();
  });

  it('is - invalid range with invalid end', () => {
    const range = {
      start: { line: 0, character: 0 },
      end: { line: 5 },
    };

    expect(Range.is(range)).toBeFalsy();
  });

  it('is - null value', () => {
    expect(Range.is(null)).toBeFalsy();
  });

  it('is - undefined value', () => {
    expect(Range.is(undefined)).toBeFalsy();
  });

  it('create', () => {
    const start = Position.create(0, 5);
    const end = Position.create(10, 15);
    const range = Range.create(start, end);

    expect(range.start).toEqual(start);
    expect(range.end).toEqual(end);
  });

  it('createR', () => {
    const range = Range.createR(1, 5, 10, 20);

    expect(range.start.line).toEqual(1);
    expect(range.start.character).toEqual(5);
    expect(range.end.line).toEqual(10);
    expect(range.end.character).toEqual(20);
  });
});
