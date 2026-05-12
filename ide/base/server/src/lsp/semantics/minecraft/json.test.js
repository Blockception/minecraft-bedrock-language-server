"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const json_1 = require("./json");
const bc_minecraft_project_1 = require("bc-minecraft-project");
function createTestDoc(content) {
    const PACK_URI = 'file:///c:/projects/MyAddon/behavior_pack/entities/example.json';
    const vscDoc = vscode_languageserver_textdocument_1.TextDocument.create(PACK_URI, 'json', 0, content);
    return {
        uri: vscDoc.uri,
        getText: (range) => vscDoc.getText(range),
        positionAt: (offset) => vscDoc.positionAt(offset),
        offsetAt: (position) => vscDoc.offsetAt(position),
        configuration: () => bc_minecraft_project_1.MCProject.createEmpty(),
    };
}
describe('provideJsonSemanticTokens', () => {
    const validInputs = [
        `{ "animate": "q.is_alive" }`,
        `{ "value": "math.sin(q.life_time * 57.29)" }`,
        `{ "value": "v.foo + 1.0" }`,
        `{ "condition": "q.is_sneaking && !q.is_sleeping" }`,
        `{ "scale": "math.lerp(0.0, 1.0, q.life_time)" }`,
        `{ "value": "c.is_owner" }`,
        `{ "value": "t.foo * 2.0" }`,
        `{ "value": "array.my_array[q.anim_time]" }`,
        `{ "queue_command": { "command": [ "kill @notreal" ] } }`,
        `{ "queue_command": { "command": [ "/kill @notreal" ] } }`
    ];
    test.each(validInputs)('produces tokens for: %s', (content) => {
        const doc = createTestDoc(content);
        const result = (0, json_1.provideJsonSemanticTokens)(doc);
        expect(result.data.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=json.test.js.map