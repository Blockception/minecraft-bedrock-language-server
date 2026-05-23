import { generateAIInstructionsContent } from './generate-ai-instructions-content';

describe('generateAIInstructionsContent', () => {
  it('includes required Bedrock file type guidance', () => {
    const content = generateAIInstructionsContent();

    expect(content).toContain('.mcfunction');
    expect(content).toContain('.molang');
    expect(content).toContain('.lang');
  });

  it('includes language ids and namespace guidance', () => {
    const content = generateAIInstructionsContent();

    expect(content).toContain('bc-mcfunction');
    expect(content).toContain('bc-minecraft-molang');
    expect(content).toContain('bc-minecraft-language');
    expect(content).toContain('namespace:name');
  });
});
