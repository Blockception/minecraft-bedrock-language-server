
import { parseMolang } from '../../src/molang/syntax/parse';
import { validSyntaxes } from '../data/dataset-valid';
import { generateMermaidDiagram } from '../../src/graph/mermaid';
import { OffsetWord } from "bc-minecraft-bedrock-shared";

describe('molang - mermaid - graphs', () => {
  describe('should be able to generate stage diagrams', () => {
    test.each(validSyntaxes)('%#. %s', (s) => {
      const n = parseMolang(OffsetWord.create(s, 0));

      n.forEach((item) => {
        expect(
          generateMermaidDiagram(item, {
            direction: 'TD',
            showPosition: true,
          }),
        ).toMatchSnapshot();
      });
    });
  });
});
