import { TextDocument } from 'bc-minecraft-bedrock-project';
import path from 'path';
import { diagnose_ui_document } from '../../../../src/diagnostics/resource-pack/ui/entry';
import { TestDiagnoser } from '../../../diagnoser';

function createDoc(content: unknown): TextDocument {
  return {
    uri: path.join('resource_pack', 'ui', 'test_ui.json'),
    getText: () => JSON.stringify(content, undefined, 2),
  };
}

describe('ResourcePack', () => {
  describe('UI', () => {
    it('emits no diagnostics for a well-formed element', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          base_panel: {
            type: 'panel',
            $panel_width: 100,
            bindings: [{ binding_name: '#player_name' }],
          },
          child_panel: {
            type: 'panel',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('emits resourcepack.ui.inheritance.missing for an unresolved cross-namespace parent', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          'broken_ref@missing_ns.missing_element': { type: 'panel' },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.inheritance.missing')).toBe(true);
    });

    it('resolves a bare @ reference against the current namespace', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          base_panel: { type: 'panel' },
          'child_panel@base_panel': { type: 'panel' },
        }),
      );
      // In the real pipeline, `base_panel` would already be indexed (as `test_ui.base_panel`)
      // before diagnosing runs; simulate that here since this test diagnoses in isolation.
      diagnoser.context.getProjectData().projectData.resourcePacks.packs[0].uiElements.set({
        id: 'test_ui.base_panel',
        location: { position: 0, uri: '' },
        documentation: '',
        variables: new Set(),
        bindings: new Set(),
      });

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not flag a $variable parent as an unresolved inheritance reference', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          'dynamic_panel@$parent_type': { type: 'panel' },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('emits resourcepack.ui.type.invalid for an unrecognized control type', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          bad_type_panel: { type: 'pannel' },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.type.invalid')).toBe(true);
    });

    it('emits resourcepack.ui.type.legacy for a type that no longer works', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          old_tab: { type: 'tab' },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.type.legacy')).toBe(true);
    });

    it('does not flag a declared $variable type as invalid', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          dynamic_type_panel: { $control_type: 'panel', type: '$control_type' },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('validates type and inheritance for nested controls', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          root_panel: {
            type: 'panel',
            controls: [
              {
                'nested_broken@missing_ns.missing_element': { type: 'pannel' },
              },
            ],
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(2);
      expect(diagnoser.hasCode('resourcepack.ui.inheritance.missing')).toBe(true);
      expect(diagnoser.hasCode('resourcepack.ui.type.invalid')).toBe(true);
    });

    it('emits resourcepack.ui.binding.type.invalid for an unrecognized binding_type', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          bad_binding_panel: {
            type: 'panel',
            bindings: [{ binding_type: 'collecton' }],
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.binding.type.invalid')).toBe(true);
    });

    it('emits resourcepack.ui.binding.condition.invalid for an unrecognized binding_condition', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          bad_binding_panel: {
            type: 'panel',
            bindings: [{ binding_condition: 'sometimes' }],
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.binding.condition.invalid')).toBe(true);
    });

    it('emits resourcepack.ui.binding.collection_name.missing when a collection binding has no binding_collection_name', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          bad_binding_panel: {
            type: 'panel',
            bindings: [{ binding_type: 'collection' }],
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.binding.collection_name.missing')).toBe(true);
    });

    it('does not flag a collection binding that has a binding_collection_name', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          good_binding_panel: {
            type: 'panel',
            bindings: [{ binding_type: 'collection', binding_collection_name: 'hotbar_items' }],
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('emits resourcepack.ui.variable.undefined for a $variable with no matching declaration', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          undefined_variable_panel: {
            type: 'panel',
            visible: '$totally_undeclared_var',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.variable.undefined')).toBe(true);
    });

    it('does not flag a $variable declared as a top-level property on the same element', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          panel_with_var: {
            type: 'panel',
            $my_var: true,
            visible: '$my_var',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not flag a $variable declared with a |default suffix', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          panel_with_default: {
            type: 'panel',
            '$icon_texture|default_steve_icon': 'textures/items/diamond',
            texture: '$icon_texture',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not flag a $variable declared conditionally in the variables array', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          panel_with_conditional_var: {
            type: 'panel',
            variables: [{ requires: '$some_condition', $toggle_name: 'common_toggle' }],
            text: '$toggle_name',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not flag a $variable declared elsewhere in the project (e.g. an inherited parent)', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          'child@common.button': {
            type: 'button',
            text: '$button_text',
          },
        }),
      );
      diagnoser.context.getProjectData().projectData.resourcePacks.packs[0].uiElements.set({
        id: 'common.button',
        location: { position: 0, uri: '' },
        documentation: '',
        variables: new Set(['$button_text']),
        bindings: new Set(),
      });

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not flag a $variable usage whose @ chain cannot be resolved, to avoid a cascading false positive', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          'x@missing_ns.el': {
            type: 'panel',
            text: '$from_parent',
          },
        }),
      );

      diagnose_ui_document(diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.ui.inheritance.missing')).toBe(true);
      expect(diagnoser.hasCode('resourcepack.ui.variable.undefined')).toBe(false);
    });

    it('does not flag a $variable usage when the direct parent resolves but a deeper ancestor does not', () => {
      const diagnoser = TestDiagnoser.createDocument(
        undefined,
        createDoc({
          namespace: 'test_ui',
          'child@my.base': {
            type: 'panel',
            text: '$v',
          },
        }),
      );
      diagnoser.context.getProjectData().projectData.resourcePacks.packs[0].uiElements.set({
        id: 'my.base',
        location: { position: 0, uri: '' },
        documentation: '',
        variables: new Set(),
        bindings: new Set(),
        extends: 'missing.el',
      });

      diagnose_ui_document(diagnoser);

      diagnoser.expectEmpty();
    });
  });
});
