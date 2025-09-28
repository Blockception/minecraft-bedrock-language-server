"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCDefinition = exports.Definition = void 0;
const fs = require("fs");
/**The namespace that provides functions for Definitions*/
var Definition;
(function (Definition) {
    /**Add the given value to the definition container, checks if value start with '!' to determine if its exclude or not
     * @param container The container to add to
     * @param value The value to add, if its start with '!' its added to the exclude list*/
    function add(container, value) {
        if (value.startsWith("!")) {
            container.excluded.push(value.substring(1, value.length));
        }
        else {
            container.defined.push(value);
        }
    }
    Definition.add = add;
    /**Converts the given container into a text rep for files
     * @param container The container to convert
     * @param key The key each item will be receiving
     * @returns A text rep of the object for files*/
    function toString(container, key) {
        let result = "";
        result += `## ${key}\n`;
        for (let I = 0; I < container.defined.length; I++) {
            result += `${key}=${container.defined[I]}\n`;
        }
        for (let I = 0; I < container.excluded.length; I++) {
            result += `${key}=!${container.excluded[I]}\n`;
        }
        result += "\n";
        return result;
    }
    Definition.toString = toString;
    /**Creates an empty version of the interface Definition
     * @returns A empty version of Definition*/
    function createEmpty() {
        return {
            excluded: [],
            defined: [],
        };
    }
    Definition.createEmpty = createEmpty;
    /** Checks if the given object implements the definition interface
     * @param value The object to inspect
     * @returns Whether or not the object implements Definition*/
    function is(value) {
        if (value) {
            if (value.defined && Array.isArray(value.defined)) {
                if (value.excluded && Array.isArray(value.excluded)) {
                    return true;
                }
            }
        }
        return false;
    }
    Definition.is = is;
})(Definition || (exports.Definition = Definition = {}));
/**The namespace that provides functions for the MCDefinition interface*/
var MCDefinition;
(function (MCDefinition) {
    /**The default filename of MCdefinitions*/
    MCDefinition.filename = ".mcdefinitions";
    /**Converts the given contents as if its file contents and returns a MCDefinition object
     * @param content The contents of the given files*/
    function parse(content) {
        const parts = content.split(/(\r\n|\n)/);
        const Out = MCDefinition.createEmpty();
        parts.forEach((property) => {
            //Remove comment
            const cindex = property.indexOf("#");
            if (cindex >= 0) {
                property = property.substring(0, cindex);
            }
            const index = property.indexOf("=");
            if (index >= 0) {
                const name = property.substring(0, index).toLowerCase();
                const value = property.substring(index + 1, property.length);
                const container = getOrAdd(Out, name);
                Definition.add(container, value);
            }
        });
        return Out;
    }
    MCDefinition.parse = parse;
    /**
     *
     * @param data
     * @param category*/
    function getOrAdd(data, category) {
        let item = data[category];
        if (item === undefined || item === null) {
            item = Definition.createEmpty();
            data[category] = item;
        }
        return item;
    }
    MCDefinition.getOrAdd = getOrAdd;
    /**Converts the given MCDefinition object into a file content rep of the object
     * @param data The MCDefinition to convert
     * @returns A text rep of the object*/
    function toString(data) {
        let Out = "";
        for (const key in data) {
            const item = data[key];
            if (Definition.is(item)) {
                Out += Definition.toString(item, key);
            }
        }
        return Out;
    }
    MCDefinition.toString = toString;
    /**Creates an empty version of MCDefinition
     * @returns An empty definition of MCDefinition*/
    function createEmpty() {
        return {};
    }
    MCDefinition.createEmpty = createEmpty;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param key The key of the value
     * @param value The value of the porerty
     * @param exclude Whetever or not the exclude the value*/
    function appendSync(filepath, key, value, exclude = false) {
        if (exclude) {
            value = "!" + value;
        }
        fs.appendFileSync(filepath, `${key}=${value}\n`);
    }
    MCDefinition.appendSync = appendSync;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty
     * @returns A promise for when the file is appended*/
    async function append(filepath, property, value) {
        return fs.promises.appendFile(filepath, `${property}=${value}\n`);
    }
    MCDefinition.append = append;
    /** Loads the content of the given file into a MCDefinition
     * @param filepath The path to the file to load
     * @returns A filled MCDefinition*/
    function loadSync(filepath) {
        if (fs.existsSync(filepath)) {
            const buffer = fs.readFileSync(filepath);
            return parse(buffer.toString());
        }
        return createEmpty();
    }
    MCDefinition.loadSync = loadSync;
    /** Loads the content of the given file into a MCDefinition
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCDefinition*/
    async function load(filepath) {
        const P = fs.promises.readFile(filepath);
        return P.then((buffer) => parse(buffer.toString()));
    }
    MCDefinition.load = load;
    /** Saves the given MCDefinition into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data, filepath) {
        const content = toString(data);
        fs.writeFileSync(filepath, content);
    }
    MCDefinition.saveSync = saveSync;
    /** Saves the given MCDefinition into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    async function save(data, filepath) {
        const content = toString(data);
        return fs.promises.writeFile(filepath, content);
    }
    MCDefinition.save = save;
})(MCDefinition || (exports.MCDefinition = MCDefinition = {}));
