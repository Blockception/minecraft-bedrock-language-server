import { TestTextDocument } from '../../../types';
import { process } from './process';

describe('Render Controller - Process', () => {
  describe('Array Definitions', () => {
    it('should extract array definitions from arrays section', () => {
      const content = `{
        "format_version": "1.8.0",
        "render_controllers": {
          "controller.render.two_variant": {
            "geometry": "Geometry.default",
            "materials": [
              {
                "*": "Material.default"
              }
            ],
            "arrays": {
              "textures": {
                "Array.skins": [
                  "Texture.aa",
                  "Texture.bb"
                ]
              }
            },
            "textures": [
              "Array.skins[query.variant]"
            ]
          }
        }
      }`;

      const doc = TestTextDocument.create('test.json', content);
      const result = process(doc);

      expect(result).toBeDefined();
      expect(result?.length).toBe(1);

      const controller = result![0];
      expect(controller.id).toBe('controller.render.two_variant');
      
      // Check that Array.skins is in the assigned set
      const assignedArray = Array.from(controller.molang.assigned);
      const arraySkins = assignedArray.find((node) => {
        return node.scope === 'array' && node.names[0] === 'skins';
      });
      
      expect(arraySkins).toBeDefined();
      expect(arraySkins?.scope).toBe('array');
      expect(arraySkins?.names).toEqual(['skins']);

      // Check that Array.skins is also in the using set (from the textures field)
      const usingArray = Array.from(controller.molang.using);
      const arraySkinsUsing = usingArray.find((node) => {
        return node.scope === 'array' && node.names[0] === 'skins';
      });

      expect(arraySkinsUsing).toBeDefined();
    });

    it('should handle real-world bee example with Array.skins', () => {
      const content = `{
        "format_version": "1.8.0",
        "render_controllers": {
          "controller.render.bee": {
            "geometry": "Geometry.default",
            "materials": [
              {
                "*": "Material.default"
              }
            ],
            "arrays": {
              "textures": {
                "Array.skins": [
                  "Texture.default",
                  "Texture.nectar",
                  "Texture.angry",
                  "Texture.angry_nectar"
                ]
              }
            },
            "textures": [
              "Array.skins[query.property('minecraft:has_nectar') + query.is_angry * 2]"
            ]
          }
        }
      }`;

      const doc = TestTextDocument.create('bee.render_controllers.json', content);
      const result = process(doc);

      expect(result).toBeDefined();
      const controller = result![0];
      
      // Array.skins should be in assigned (defined in arrays section)
      const assignedArray = Array.from(controller.molang.assigned);
      const arraySkinsDef = assignedArray.find((node) => {
        return node.scope === 'array' && node.names[0] === 'skins';
      });
      
      expect(arraySkinsDef).toBeDefined();
      expect(arraySkinsDef?.scope).toBe('array');
      expect(arraySkinsDef?.names).toEqual(['skins']);
      
      // Array.skins should also be in using (used in textures field)
      const usingArray = Array.from(controller.molang.using);
      const arraySkinsUsage = usingArray.find((node) => {
        return node.scope === 'array' && node.names[0] === 'skins';
      });
      
      expect(arraySkinsUsage).toBeDefined();
      
      // This demonstrates that the array is both defined and used,
      // which should prevent "undefined" warnings
    });

    it('should handle multiple array definitions in different categories', () => {
      const content = `{
        "format_version": "1.8.0",
        "render_controllers": {
          "controller.render.complex": {
            "geometry": "Geometry.default",
            "arrays": {
              "textures": {
                "Array.skins": ["Texture.aa", "Texture.bb"],
                "Array.variants": ["Texture.cc", "Texture.dd"]
              },
              "materials": {
                "Array.mat_list": ["Material.aa", "Material.bb"]
              },
              "geometries": {
                "Array.geo_list": ["Geometry.aa", "Geometry.bb"]
              }
            },
            "textures": ["Array.skins[0]"],
            "materials": [{"*": "Array.mat_list[0]"}]
          }
        }
      }`;

      const doc = TestTextDocument.create('test.json', content);
      const result = process(doc);

      expect(result).toBeDefined();
      const controller = result![0];
      
      const assignedArray = Array.from(controller.molang.assigned);
      
      // Check all array definitions are present
      const arrayNames = ['skins', 'variants', 'mat_list', 'geo_list'];
      
      arrayNames.forEach(name => {
        const found = assignedArray.find((node) => {
          return node.scope === 'array' && node.names[0] === name;
        });
        expect(found).toBeDefined();
      });
    });

    it('should handle render controllers without arrays section', () => {
      const content = `{
        "format_version": "1.8.0",
        "render_controllers": {
          "controller.render.simple": {
            "geometry": "Geometry.default",
            "materials": [{"*": "Material.default"}],
            "textures": ["Texture.default"]
          }
        }
      }`;

      const doc = TestTextDocument.create('test.json', content);
      const result = process(doc);

      expect(result).toBeDefined();
      expect(result?.length).toBe(1);
      
      const controller = result![0];
      
      // Should not fail and should not have any array assignments
      const assignedArray = Array.from(controller.molang.assigned);
      const arrayVars = assignedArray.filter((node) => node.scope === 'array');
      
      expect(arrayVars.length).toBe(0);
    });
  });
});
