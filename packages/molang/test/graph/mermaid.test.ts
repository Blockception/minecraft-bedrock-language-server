
import { parseMolang } from '../../src/molang/syntax/parse';
import { valid_syntaxes } from '../data/dataset-valid';
import { generateMermaidDiagram } from '../../src/graph/mermaid';
import { OffsetWord } from "@blockception/packages-shared";

describe('molang - mermaid - graphs', () => {
  describe('should be able to generate stage diagrams', () => {
    test.each(valid_syntaxes)('%#. %s', (s) => {
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
