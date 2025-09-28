"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactJson = void 0;
const grammar_1 = require("./grammar");
/**
 * Namespace that governs minecraft "compact json"
 */
var CompactJson;
(function (CompactJson) {
    /** The type of a node */
    let Type;
    (function (Type) {
        /** A string */
        Type[Type["String"] = 0] = "String";
        /** An object */
        Type[Type["Object"] = 1] = "Object";
        /** An array */
        Type[Type["Array"] = 2] = "Array";
    })(Type = CompactJson.Type || (CompactJson.Type = {}));
    /**
     * Returns true if the node is a key node
     * @param value The value to check
     * @returns True if the node is a key node
     */
    function hasKey(value) {
        return typeof value.key === "string";
    }
    CompactJson.hasKey = hasKey;
    /**
     * Returns true if the node is a string node
     * @param value The value to check
     * @returns True if the node is a string node
     */
    function isString(value) {
        return value.type === Type.String;
    }
    CompactJson.isString = isString;
    /**
     * Returns true if the node is an object node
     * @param value The value to check
     * @returns True if the node is an object node
     */
    function isObject(value) {
        return value.type === Type.Object;
    }
    CompactJson.isObject = isObject;
    /**
     * Returns true if the node is an object array
     * @param value The value to check
     * @returns True if the node is an object array
     */
    function isArray(value) {
        return value.type === Type.Array;
    }
    CompactJson.isArray = isArray;
    /**
     * Returns true if the node is an array of object node
     * @param value The value to check
     * @returns True if the node is an array of object node
     */
    function isArrayOrObject(value) {
        return isArray(value) || isObject(value);
    }
    CompactJson.isArrayOrObject = isArrayOrObject;
    /**
     *
     * @param node
     * @returns
     */
    function stringify(node) {
        const value = stringifyValue(node);
        if (hasKey(node)) {
            return `${node.key}=${value}`;
        }
        return value;
    }
    CompactJson.stringify = stringify;
    /**
     *
     * @param node
     * @returns
     */
    function stringifyValue(node) {
        switch (node.type) {
            case Type.String:
                return node.value;
            case Type.Object:
                return `{${node.value.map(stringify).join(",")}}`;
            case Type.Array:
                return `[${node.value.map(stringify).join(",")}]`;
        }
    }
    CompactJson.stringifyValue = stringifyValue;
    /**
     *
     * @returns
     */
    function empty() {
        return {
            key: "",
            type: Type.String,
            offset: 0,
            negative: false,
            value: "",
        };
    }
    CompactJson.empty = empty;
    /**
     * Transform the items of a node into a @see {@link OffsetWord}
     * @param node The node to transform
     * @returns The offset word
     */
    function toOffsetWord(node) {
        return {
            offset: node.offset,
            text: stringify(node),
        };
    }
    CompactJson.toOffsetWord = toOffsetWord;
    /**
     * Transform only the value of the items of a node into a @see {@link OffsetWord}
     * Transform the items of a node
     * @param node The node to transform
     * @returns The offset word
     */
    function valueToOffsetWord(node) {
        let offset = node.offset;
        if (hasKey(node)) {
            offset += node.key.length + 1;
        }
        if (node.negative) {
            offset++;
        }
        return {
            offset: offset,
            text: stringifyValue(node),
        };
    }
    CompactJson.valueToOffsetWord = valueToOffsetWord;
    /**
     * Transforms a node into a keyed node
     * @param node The node to transform
     * @param key The key to use
     * @returns The transformed node
     */
    function toKeyed(node, key) {
        const result = node;
        result.key = key;
        return result;
    }
    CompactJson.toKeyed = toKeyed;
    /**
     * Parses a string into a node
     * @param text The text to parse
     * @param offset The offset of the text starts at
     * @returns The parsed node
     */
    function parse(text, offset = 0) {
        let negative = false;
        let node;
        [text, offset] = (0, grammar_1.trimWithOffset)(text, offset);
        if (text.startsWith("!")) {
            negative = true;
            text = text.slice(1);
        }
        if (text.startsWith("[")) {
            node = {
                type: Type.Array,
                offset: offset + 1,
                negative: negative,
                value: [],
            };
            text = (0, grammar_1.trimBraces)(text);
            offset += 1;
            parseItems(text, offset, node);
        }
        else if (text.startsWith("{")) {
            node = {
                type: Type.Object,
                offset: offset + 1,
                negative: negative,
                value: [],
            };
            text = (0, grammar_1.trimBraces)(text);
            offset += 1;
            parseItems(text, offset, node);
        }
        else {
            node = {
                type: Type.String,
                offset: offset,
                negative: negative,
                value: text,
            };
        }
        return node;
    }
    CompactJson.parse = parse;
})(CompactJson || (exports.CompactJson = CompactJson = {}));
/**
 * Parses a list of items into nodes
 * @param text The text to parse
 * @param offset The offset of the text starts at
 * @param receiver The node to add the items to
 */
function parseItems(text, offset, receiver) {
    let index = (0, grammar_1.findCommaOrEnd)(text);
    [text, offset] = (0, grammar_1.trimWithOffset)(text, offset);
    while (index > 0) {
        const attr = text.slice(0, index);
        if (attr.startsWith("{") || attr.endsWith("[")) {
            const node = CompactJson.parse(attr, offset);
            receiver.value.push(node);
        }
        else {
            const equalIndex = attr.indexOf("=");
            if (equalIndex > 0) {
                const key = attr.slice(0, equalIndex).trim();
                const value = attr.slice(equalIndex + 1);
                const node = CompactJson.parse(value, offset + equalIndex + 1);
                node.key = key;
                node.offset = offset;
                receiver.value.push(node);
            }
            else {
                const value = attr;
                const node = CompactJson.parse(value, offset);
                receiver.value.push(node);
            }
        }
        text = text.slice(index + 1);
        offset += index + 1;
        index = (0, grammar_1.findCommaOrEnd)(text);
    }
}
//# sourceMappingURL=compact.js.map