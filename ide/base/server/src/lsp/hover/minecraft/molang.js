"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideHover = provideHover;
exports.provideHoverAt = provideHoverAt;
exports.provideHoverSpecific = provideHoverSpecific;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../../../util");
function provideHover(context) {
    const { document, params } = context;
    const line = document.getLine(params.position.line);
    const offset = document.offsetAt({ character: 0, line: params.position.line });
    const cursor = document.offsetAt(params.position);
    const range = { start: cursor, end: cursor + line.length };
    return provideHoverAt(context, line, range, offset);
}
function provideHoverAt(context, currentText, textRange, cursor) {
    let startIndex = cursor - textRange.start;
    let dotIndex = -1;
    for (; startIndex >= 0; startIndex--) {
        const c = currentText.charCodeAt(startIndex);
        if (util_1.Character.IsLetterCode(c) || util_1.Character.IsNumberCode(c) || c === util_1.Character.Character_underscore)
            continue;
        if (c === util_1.Character.Character_dot) {
            dotIndex = startIndex;
            continue;
        }
        startIndex++;
        break;
    }
    if (startIndex < 0)
        startIndex = 0;
    let endIndex = cursor - textRange.start;
    for (; endIndex < currentText.length; endIndex++) {
        const c = currentText.charCodeAt(endIndex);
        if (util_1.Character.IsLetterCode(c) || util_1.Character.IsNumberCode(c) || c === util_1.Character.Character_underscore)
            continue;
        break;
    }
    const text = currentText.slice(startIndex, endIndex);
    const range = vscode_languageserver_1.Range.create(context.document.positionAt(startIndex), context.document.positionAt(endIndex));
    if (dotIndex > -1) {
        const main = currentText.slice(startIndex, dotIndex).toLowerCase();
        const sub = currentText.slice(dotIndex + 1, endIndex).toLowerCase();
        return provideHoverSpecific(main, sub, range);
    }
    return provideHoverSpecific(text, undefined, range);
}
function provideHoverSpecific(main, sub = undefined, range = undefined) {
    switch (main) {
        //TODO animations
        //TODO controller
        //TODO geometry
        //TODO texture
        //TODO material
        case 'c':
        case 'context':
            if (sub)
                return findGen(sub, range, bc_minecraft_molang_1.MolangData.Entities.Contexts);
            return { contents: 'Molang context', range: range };
        case 'm':
        case 'math':
            if (sub)
                return findGen(sub, range, bc_minecraft_molang_1.MolangData.General.Math);
            return { contents: 'Molang math', range: range };
        case 'q':
        case 'query':
            if (sub)
                return findGen(sub, range, bc_minecraft_molang_1.MolangData.General.Queries);
            return { contents: 'Molang query', range: range };
        case 'v':
        case 'variable':
            //TODO go through ProjectData
            if (sub)
                return findGen(sub, range, bc_minecraft_molang_1.MolangData.Entities.Variables);
            return { contents: 'Molang variable', range: range };
        case 't':
        case 'temp':
            //TODO go through ProjectData
            if (sub)
                return findGen(sub, range, bc_minecraft_molang_1.MolangData.Entities.Temps);
            return { contents: 'Molang temp', range: range };
    }
    return undefined;
}
function findGen(data, range = undefined, items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id === data && item.documentation) {
            let doc = `${item.id}  \n\n${item.documentation}`;
            if (item.parameters) {
                doc += `\n\n**Parameters**:\n\n${item.parameters.map((p) => `- ${p.id}\n`).join('')}`;
            }
            if (item.deprecated) {
                if (item.deprecated.startsWith('query') || item.deprecated.startsWith('math')) {
                    doc = '\n\n**Deprecated**: replace with: ' + item.deprecated;
                }
                else {
                    doc = '\n\n**Deprecated**: ' + item.deprecated;
                }
            }
            let syntax = item.id;
            if (item.parameters) {
                syntax += `(${item.parameters.map((i) => `<${i.id}>`).join(', ')})`;
            }
            return {
                contents: {
                    value: `${syntax}\n---\n${doc}`,
                    kind: 'markdown',
                },
                range: range,
            };
        }
    }
    return undefined;
}
//# sourceMappingURL=molang.js.map