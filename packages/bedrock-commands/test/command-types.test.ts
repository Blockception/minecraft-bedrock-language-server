import { Command } from '../src';

describe('Command', () => {
  it('parse 1 - simple test', () => {
    const comm = Command.parse('scoreboard players set @a[scores={foo=1..}] foo 1', 0);

    expect(comm.parameters).toHaveLength(6);
    expect(comm.parameters[0].text).toEqual('scoreboard');
    expect(comm.parameters[1].text).toEqual('players');
    expect(comm.parameters[2].text).toEqual('set');
    expect(comm.parameters[3].text).toEqual('@a[scores={foo=1..}]');
    expect(comm.parameters[4].text).toEqual('foo');
    expect(comm.parameters[5].text).toEqual('1');

    expect(comm.getCommandData(false).length).toBeGreaterThanOrEqual(0);
  });

  it('parse 2 - condensed ~ coordinates', () => {
    const comm = Command.parse('tp @s ~~~', 0);

    expect(comm.parameters).toHaveLength(5);
  });

  it('parse 3 - condensed ^ coordinates', () => {
    const comm = Command.parse('tp @s ^^^', 0);

    expect(comm.parameters).toHaveLength(5);
  });

  it('parse 4 - unknown command', () => {
    const comm = Command.parse('fakecommand fakeparameter @s a', 0);

    expect(comm.parameters).toHaveLength(4);

    expect(comm.getCommandData(false)).toHaveLength(0);
  });

  it('parse 5 - offset', () => {
    const comm = Command.parse('    execute @s ~~~', 0);

    expect(comm.parameters).toHaveLength(5);
    expect(comm.parameters[0].offset).toEqual(4);
  });

  it('subcommand 1', () => {
    const comm = Command.parse('execute @s[scores={foo=1..}] ~ ~ ~ tp @a[tag=target] @s', 0);

    const sub = comm.getSubCommand();

    if (sub) {
      expect(sub.parameters).toHaveLength(3);

      expect(sub.parameters[0].text).toEqual('tp');
      expect(sub.parameters[1].text).toEqual('@a[tag=target]');
      expect(sub.parameters[2].text).toEqual('@s');
    } else {
      throw new Error('expected a sub command');
    }
  });

  it('subcommand 2', () => {
    const comm = Command.parse(
      'execute @s[scores={foo=1..}] ~ ~ ~ detect ~ ~ ~ minecraft:air -1 tp @a[tag=target] @s',
      0,
    );

    const sub = comm.getSubCommand();

    if (sub) {
      expect(sub.parameters).toHaveLength(3);

      expect(sub.parameters[0].text).toEqual('tp');
      expect(sub.parameters[1].text).toEqual('@a[tag=target]');
      expect(sub.parameters[2].text).toEqual('@s');
    } else {
      throw new Error('expected a sub command');
    }
  });

  it('is in subcommand 1', () => {
    const comm = Command.parse('execute @s[scores={foo=1..}] ~ ~ ~ tp @a[tag=target] @s', 0);
    const sub = comm.isInSubCommand(46, false);

    if (sub) {
      expect(sub.parameters).toHaveLength(3);

      expect(sub.parameters[0].text).toEqual('tp');
      expect(sub.parameters[1].text).toEqual('@a[tag=target]');
      expect(sub.parameters[2].text).toEqual('@s');
    } else {
      throw new Error('expected a sub command');
    }
  });

  it('is in subcommand 2', () => {
    const comm = Command.parse(
      'execute @s[scores={foo=1..}] ~ ~ ~ detect ~ ~ ~ minecraft:air -1 tp @a[tag=target] @s',
      0,
    );
    const sub = comm.isInSubCommand(38, false);

    expect(sub).toBeUndefined();
  });

  it('cursorIndex must match specific parameter', () => {
    const comm = Command.parse('execute @s[scores={foo=1..}] ~ ~ ~ tp @a[tag=target] @s', 0);

    expect(comm.findCursorIndex(2)).toEqual(0);
    expect(comm.findCursorIndex(29)).toEqual(2);
    expect(comm.findCursorIndex(30)).toEqual(2);
    //In the selector
    expect(comm.findCursorIndex(14)).toEqual(1);
    //In the second selector
    expect(comm.findCursorIndex(41)).toEqual(6);
  });

  it('cursorIndex must be in the first word', () => {
    const comm = Command.parse('execute @s[scores={foo=1..}]', 0);

    expect(comm.findCursorIndex(29)).toEqual(2);
  });

  it('cursorIndex must be in the first word if before', () => {
    const comm = Command.parse('execute @s[scores={foo=1..}]', 30);

    expect(comm.findCursorIndex(5)).toEqual(0);
  });
});
