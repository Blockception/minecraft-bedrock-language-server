"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedBuilder = exports.EventedBuilder = exports.BaseBuilder = void 0;
exports.createBuilder = createBuilder;
const vscode_languageserver_1 = require("vscode-languageserver");
function createBuilder(token, workDoneProgress) {
    return new WrappedBuilder(new BaseBuilder(token, workDoneProgress));
}
class BaseBuilder {
    _items;
    _token;
    _workDoneProgress;
    constructor(token, workDoneProgress, items) {
        this._token = token;
        this._workDoneProgress = workDoneProgress;
        this._items = items ?? [];
    }
    /** @inheritdoc */
    add(item) {
        if (item.documentation) {
            if (typeof item.documentation === 'string') {
                item.documentation = { kind: 'markdown', value: item.documentation };
            }
        }
        if (item.kind === undefined) {
            item.kind = vscode_languageserver_1.CompletionItemKind.Keyword;
        }
        this._items.push(item);
        return item;
    }
    /** @inheritdoc */
    isCancelled() {
        return this._token.isCancellationRequested;
    }
    /** @inheritdoc */
    getItems() {
        return this._items;
    }
}
exports.BaseBuilder = BaseBuilder;
class EventedBuilder {
    _builder;
    _before;
    _after;
    constructor(builder, before, after) {
        this._builder = builder;
        this._before = before;
        this._after = after;
    }
    /** @inheritdoc */
    add(item) {
        this._before(item);
        const out = this._builder.add(item);
        this._after(out);
        return out;
    }
    /** @inheritdoc */
    isCancelled() {
        return this._builder.isCancelled();
    }
    /** @inheritdoc */
    getItems() {
        return this._builder.getItems();
    }
}
exports.EventedBuilder = EventedBuilder;
class WrappedBuilder {
    builder;
    constructor(builder) {
        this.builder = builder;
    }
    /** @inheritdoc */
    add(item) {
        return this.builder.add(item);
    }
    /** @inheritdoc */
    isCancelled() {
        return this.builder.isCancelled();
    }
    /** @inheritdoc */
    getItems() {
        return this.builder.getItems();
    }
    generateItem(item, generatefn, kind = vscode_languageserver_1.CompletionItemKind.Keyword) {
        const citem = {
            label: item.id,
            documentation: item.documentation ?? generatefn(item),
            kind: kind,
        };
        return this.builder.add(citem);
    }
    /** @inheritdoc */
    generate(dataset, generatefn, kind = vscode_languageserver_1.CompletionItemKind.Keyword, query = undefined) {
        const out = [];
        if (dataset === undefined)
            return out;
        const filterFn = this.createFilter(query);
        dataset.forEach((item) => {
            if (this.builder.isCancelled())
                return;
            if (filterFn(item) === false)
                return;
            switch (typeof item) {
                case 'string':
                    out.push(this.builder.add({ label: item, documentation: item, kind: kind }));
                    break;
                default:
                    out.push(this.generateItem(item, generatefn, kind));
            }
        });
        return out;
    }
    createFilter(query) {
        if (query === undefined)
            return () => true;
        return (item) => {
            if (typeof item === 'string')
                return item.includes(query);
            return item.id.includes(query);
        };
    }
    /** @inheritdoc */
    withEvents(before, after) {
        return new WrappedBuilder(new EventedBuilder(this.builder, before ?? noop, after ?? noop));
    }
    /** @inheritdoc */
    withDefaults(base) {
        const values = Object.entries(base);
        return new WrappedBuilder(new EventedBuilder(this.builder, (item) => {
            values.forEach(([key, value]) => {
                if (item[key] === undefined)
                    item[key] = value;
            });
        }, noop));
    }
}
exports.WrappedBuilder = WrappedBuilder;
function noop() {
    return;
}
//# sourceMappingURL=builder.js.map