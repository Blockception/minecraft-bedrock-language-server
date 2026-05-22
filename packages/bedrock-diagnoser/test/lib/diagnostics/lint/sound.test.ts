import { MCProject } from 'bc-minecraft-project';
import { lint_check_sound_extension } from '../../../../src/diagnostics/lint/sound';
import { TestDiagnoser } from '../../../diagnoser';

function createProjectWithRule(rule: unknown): MCProject {
  const project = MCProject.createEmpty();
  (project.linting.rules as Record<string, unknown>)['sound.extensions'] = rule;
  return project;
}

describe('lint_check_sound_extension', () => {
  test('does nothing when rule is off', () => {
    const project = MCProject.createEmpty();
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.mp3', diagnoser);
    diagnoser.expectEmpty();
  });

  test('does nothing for paths without an extension', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar', diagnoser);
    diagnoser.expectEmpty();
  });

  test('accepts .ogg extension (default allowed list)', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.ogg', diagnoser);
    diagnoser.expectEmpty();
  });

  test('accepts .wav extension (default allowed list)', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.wav', diagnoser);
    diagnoser.expectEmpty();
  });

  test('flags .mp3 extension with default allowed list', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.mp3', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.sound.extensions');
  });

  test('flags .fsb extension with default allowed list', () => {
    const project = createProjectWithRule('error');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.fsb', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.sound.extensions');
  });

  test('accepts extension from custom allowed list', () => {
    const project = createProjectWithRule(['warn', ['.mp3', '.ogg']]);
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.mp3', diagnoser);
    diagnoser.expectEmpty();
  });

  test('flags extension not in custom allowed list', () => {
    const project = createProjectWithRule(['warn', ['.mp3']]);
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.ogg', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.sound.extensions');
  });

  test('extension matching is case-insensitive', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    lint_check_sound_extension('sounds/foo/bar.OGG', diagnoser);
    diagnoser.expectEmpty();
  });

  test('does not mistake directory name with dot for extension', () => {
    const project = createProjectWithRule('warn');
    const diagnoser = new TestDiagnoser(undefined, project);
    // dot is part of directory segment, not the filename extension
    lint_check_sound_extension('sounds/v1.0/bar', diagnoser);
    diagnoser.expectEmpty();
  });
});
