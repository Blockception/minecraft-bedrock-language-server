export const invalid_syntaxes = [
  'v.agent.anim_state == (2 * 3',
  'v.agent.anim_state == {2 * 3',
  'v.agent.anim_state == [2 * 3',
  'v.agent.anim_state == 2 * 3)',
  'v.agent.anim_state == 2 * 3}',
  'v.agent.anim_state == 2 * 3]',

  // Issue: a multi-statement scope should still reject malformed statements
  'v.a ? { v.b=1; v.c=; }',
];
