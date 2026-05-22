import { MCProject } from 'bc-minecraft-project';
import { lint_check_fake_player_naming, lint_check_mcfunction_naming } from '../../../../src/diagnostics/lint';
import { TestDiagnoser } from '../../../diagnoser';

// ---------------------------------------------------------------------------
// mcfunction.naming
// ---------------------------------------------------------------------------

describe('lint_check_mcfunction_naming', () => {
  it('does nothing when rule is off', () => {
    const diagnoser = new TestDiagnoser();
    // Rule not set → off by default
    lint_check_mcfunction_naming('my_folder/my_function', diagnoser);
    diagnoser.expectEmpty();
  });

  it('does nothing when function ID matches the pattern', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['mcfunction.naming'] = ['warn', '^[a-z_/]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_mcfunction_naming('my_folder/my_function', diagnoser);
    diagnoser.expectEmpty();
  });

  it('reports a warning when function ID does not match the pattern', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['mcfunction.naming'] = ['warn', '^[a-z_/]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_mcfunction_naming('BadName', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.mcfunction.naming');
  });

  it('reports an error when severity is "error"', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['mcfunction.naming'] = ['error', '^[a-z_/]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_mcfunction_naming('BadName', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.mcfunction.naming');
  });

  it('does nothing when pattern option is missing', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['mcfunction.naming'] = 'warn';
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_mcfunction_naming('BadName', diagnoser);
    diagnoser.expectEmpty();
  });

  it('does nothing when regex is invalid', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['mcfunction.naming'] = ['warn', '[invalid('];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_mcfunction_naming('any_name', diagnoser);
    diagnoser.expectEmpty();
  });
});

// ---------------------------------------------------------------------------
// fake-player.naming
// ---------------------------------------------------------------------------

describe('lint_check_fake_player_naming', () => {
  it('does nothing when rule is off', () => {
    const diagnoser = new TestDiagnoser();
    lint_check_fake_player_naming('#myScore', diagnoser);
    diagnoser.expectEmpty();
  });

  it('does nothing when fake player name matches the pattern', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['fake-player.naming'] = ['warn', '^#[a-z_]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_fake_player_naming('#my_score', diagnoser);
    diagnoser.expectEmpty();
  });

  it('reports a warning when fake player name does not match the pattern', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['fake-player.naming'] = ['warn', '^#[a-z_]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_fake_player_naming('BadPlayer', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.fake-player.naming');
  });

  it('reports an error when severity is "error"', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['fake-player.naming'] = ['error', '^#[a-z_]+$'];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_fake_player_naming('BadPlayer', diagnoser);
    diagnoser.expectAmount(1);
    expect(diagnoser.items[0].code).toBe('lint.fake-player.naming');
  });

  it('does nothing when pattern option is missing', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['fake-player.naming'] = 'warn';
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_fake_player_naming('BadPlayer', diagnoser);
    diagnoser.expectEmpty();
  });

  it('does nothing when regex is invalid', () => {
    const project = MCProject.createEmpty();
    project.linting.rules['fake-player.naming'] = ['warn', '[invalid('];
    const diagnoser = new TestDiagnoser(undefined, project);

    lint_check_fake_player_naming('#any_name', diagnoser);
    diagnoser.expectEmpty();
  });
});
