import { provideInlayHints } from './service';

describe('provideInlayHints', () => {
  it('provides parameter-name hints for mcfunction command arguments', () => {
    const result = provideInlayHints('say hello world', 'say hello world'.length, false);

    expect(result).toEqual([{ label: 'message', offset: 4 }]);
  });

  it('provides hints on the active subcommand in execute chains', () => {
    const line = 'execute as @s run say hi';
    const result = provideInlayHints(line, line.length, false);

    expect(result).toEqual([{ label: 'message', offset: 22 }]);
  });

  it('does not include hints for keyword parameters', () => {
    const line = 'execute as @s run say hi';
    const result = provideInlayHints(line, line.length, false);

    expect(result.length).toBe(1);
    expect(result[0]?.offset).toBe(22);
  });

  it('returns no hints for empty input', () => {
    expect(provideInlayHints('', 0, false)).toEqual([]);
  });
});
