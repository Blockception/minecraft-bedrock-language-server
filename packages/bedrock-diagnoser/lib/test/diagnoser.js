"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDocumentDiagnoser = exports.TestDiagnoser = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const types_1 = require("../src/lib/types");
const testprojectdata_1 = require("./testprojectdata");
class TestDiagnoser {
    constructor(context = undefined, project = undefined) {
        this.doneMark = false;
        this.context = context !== null && context !== void 0 ? context : testprojectdata_1.TestProjectData.createContext();
        this.project = project !== null && project !== void 0 ? project : bc_minecraft_project_1.MCProject.createEmpty();
        this.items = [];
    }
    done() {
        this.doneMark = true;
    }
    /**
     *
     * @param position
     * @param message
     * @param severity
     * @param code
     */
    add(position, message, severity, code) {
        this.items.push({
            code: code,
            message: message,
            position: position,
            severity: severity,
        });
    }
    expectDone() {
        expect(this.doneMark).toBeDefined();
    }
    /**
     *
     */
    expectEmpty() {
        expect(this.items).toHaveLength(0);
    }
    expectAny() {
        expect(this.items).not.toHaveLength(0);
    }
    /**
     *
     * @param number
     */
    expectAmount(number) {
        expect(this.items).toHaveLength(number);
    }
    /**
     *
     * @param number
     */
    expectGreaterThan(number) {
        expect(this.items.length).toBeGreaterThan(number);
    }
    /**
     *
     * @param number
     */
    expectGreaterThanOrEqual(number) {
        expect(this.items.length).toBeGreaterThanOrEqual(number);
    }
    writeItemsMessage() {
        let out = "";
        this.items.forEach((item) => {
            out += `\t\t[${types_1.DiagnosticSeverity[item.severity]}: ${item.position}] ${item.message} (${item.code})\n`;
        });
        return out;
    }
    /**Gets the first matching message
     * @param message
     * @returns*/
    getMessage(message) {
        for (let I = 0; I < this.items.length; I++) {
            const elem = this.items[I];
            if (elem.message === message)
                return elem;
        }
        return undefined;
    }
    /**Gets the first matching position
     * @param message
     * @returns*/
    getPosition(position) {
        for (let I = 0; I < this.items.length; I++) {
            const elem = this.items[I];
            if (elem.position === position)
                return elem;
        }
        return undefined;
    }
    /**Gets the first matching severity
     * @param message
     * @returns*/
    getSeverity(severity) {
        for (let I = 0; I < this.items.length; I++) {
            const elem = this.items[I];
            if (elem.severity === severity)
                return elem;
        }
        return undefined;
    }
    /**Gets the first matching code
     * @param message
     * @returns*/
    getCode(code) {
        for (let I = 0; I < this.items.length; I++) {
            const elem = this.items[I];
            if (elem.code === code)
                return elem;
        }
        return undefined;
    }
    /**Checks if the message is inside the internal list
     * @param message
     * @returns
     */
    hasMessage(message) {
        return this.getMessage(message) !== undefined;
    }
    /**Checks if the position is inside the internal list
     * @param position
     * @returns
     */
    hasPosition(position) {
        return this.getPosition(position) !== undefined;
    }
    /**Checks if the severity is inside the internal list
     * @param message
     * @returns
     */
    hasSeverity(severity) {
        return this.getSeverity(severity) !== undefined;
    }
    /**Checks if the code is inside the internal list
     * @param message
     * @returns
     */
    hasCode(code) {
        return this.getCode(code) !== undefined;
    }
}
exports.TestDiagnoser = TestDiagnoser;
class TestDocumentDiagnoser extends TestDiagnoser {
    constructor(document, context = undefined, project = undefined) {
        super(context, project);
        this.document = document;
    }
}
exports.TestDocumentDiagnoser = TestDocumentDiagnoser;
(function (TestDiagnoser) {
    function create(files = undefined) {
        const context = testprojectdata_1.TestProjectData.createContext(files);
        return new TestDiagnoser(context, undefined);
    }
    TestDiagnoser.create = create;
    function createDocument(files, document) {
        const context = testprojectdata_1.TestProjectData.createContext(files);
        return new TestDocumentDiagnoser(document, context, undefined);
    }
    TestDiagnoser.createDocument = createDocument;
    function emptyContext(files = undefined) {
        return testprojectdata_1.TestProjectData.createContext(files);
    }
    TestDiagnoser.emptyContext = emptyContext;
})(TestDiagnoser || (exports.TestDiagnoser = TestDiagnoser = {}));
//# sourceMappingURL=diagnoser.js.map