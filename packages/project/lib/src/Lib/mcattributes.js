"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCAttributes = void 0;
const fs = require("fs");
/**The namespace that provides code for MCAttributes interfaces*/
var MCAttributes;
(function (MCAttributes) {
    /**The default filename of a MCAttributes filename*/
    MCAttributes.filename = ".mcattributes";
    /**Creates an empty version of MCAttributes
     * @returns An empty MCAttributes object*/
    function createEmpty() {
        return {};
    }
    MCAttributes.createEmpty = createEmpty;
    /**Parses the given content as if its file content, whereby each line is an attribute
     * @param content The content that one would get as in a file
     * @returns A parsed version based on the contents, or an empty object*/
    function parse(content) {
        const parts = content.split(/(\r\n|\n)/);
        const result = {};
        parts.forEach((property) => {
            const cindex = property.indexOf("#");
            if (cindex >= 0) {
                property = property.substring(0, cindex).trim();
            }
            const index = property.indexOf("=");
            if (index >= 0) {
                const name = property.substring(0, index);
                const value = property.substring(index + 1, property.length);
                //Write value
                if (name !== "")
                    result[name] = value;
            }
        });
        return result;
    }
    MCAttributes.parse = parse;
    /**Converts the given MCAttributes to file content
     * @param data The MCAttributes data to convert
     * @returns A string represerntation of the contents of a MCAttributes*/
    function toString(data) {
        let Out = "";
        for (const Key in data) {
            const value = data[Key];
            if (value && typeof value === "string")
                Out += `${Key}=${value}\n`;
        }
        return Out;
    }
    MCAttributes.toString = toString;
    /** Merges the two given objects into a new mcattributes. Whereby B overrides anything A has specified
     * @param items The first data set
     * @returns A new object with the combined attributes*/
    function merge(...items) {
        const Out = createEmpty();
        for (const item of items) {
            for (const Key in item) {
                const value = item[Key];
                Out[Key] = value;
            }
        }
        return Out;
    }
    MCAttributes.merge = merge;
    /**Retrieves the given key from the attributes safely, if non exist an entry is made with the given default value
     * @param attributes The attributes to retrieve the value from
     * @param key The key that stores the specified value
     * @param defaultValue The default value to set*/
    function getOrAdd(attributes, key, defaultValue = "") {
        let value = attributes[key];
        if (value === undefined || value === null) {
            value = defaultValue;
            attributes[key] = value;
        }
        return value;
    }
    MCAttributes.getOrAdd = getOrAdd;
    /** Loads the content of the given file into a MCAttributes
     * @param filepath The path to the file to load
     * @returns A filled MCAttributes*/
    function loadSync(filepath) {
        if (fs.existsSync(filepath)) {
            const buffer = fs.readFileSync(filepath);
            return parse(buffer.toString());
        }
        return {};
    }
    MCAttributes.loadSync = loadSync;
    /** Loads the content of the given file into a MCAttributes
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCAttributes*/
    async function load(filepath) {
        const P = fs.promises.readFile(filepath);
        return P.then((buffer) => parse(buffer.toString()));
    }
    MCAttributes.load = load;
    /** Saves the given MCAttributes into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data, filepath) {
        const content = toString(data);
        fs.writeFileSync(filepath, content);
    }
    MCAttributes.saveSync = saveSync;
    /** Saves the given MCAttributes into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    async function save(data, filepath) {
        const content = toString(data);
        return fs.promises.writeFile(filepath, content);
    }
    MCAttributes.save = save;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty*/
    function appendSync(filepath, property, value) {
        fs.appendFileSync(filepath, `${property}=${value}\n`);
    }
    MCAttributes.appendSync = appendSync;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty
     * @returns A promise for when the file is appended*/
    async function append(filepath, property, value) {
        return fs.promises.appendFile(filepath, `${property}=${value}\n`);
    }
    MCAttributes.append = append;
})(MCAttributes || (exports.MCAttributes = MCAttributes = {}));
