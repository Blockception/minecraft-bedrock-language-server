"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawText = exports.ScoreComponent = exports.SelectorComponent = exports.TranslateComponent = exports.TextComponent = void 0;
var TextComponent;
(function (TextComponent) {
    function is(value) {
        if (value && value.text) {
            return true;
        }
        return false;
    }
    TextComponent.is = is;
})(TextComponent || (exports.TextComponent = TextComponent = {}));
var TranslateComponent;
(function (TranslateComponent) {
    function is(value) {
        if (value && value.translate) {
            return true;
        }
        return false;
    }
    TranslateComponent.is = is;
})(TranslateComponent || (exports.TranslateComponent = TranslateComponent = {}));
var SelectorComponent;
(function (SelectorComponent) {
    function is(value) {
        if (value && value.selector) {
            return true;
        }
        return false;
    }
    SelectorComponent.is = is;
})(SelectorComponent || (exports.SelectorComponent = SelectorComponent = {}));
var ScoreComponent;
(function (ScoreComponent) {
    function is(value) {
        if (value && value.score && value.score.name && value.score.objective) {
            return true;
        }
        return false;
    }
    ScoreComponent.is = is;
})(ScoreComponent || (exports.ScoreComponent = ScoreComponent = {}));
var RawText;
(function (RawText) {
    function is(value) {
        if (value && value.rawtext) {
            return true;
        }
        return false;
    }
    RawText.is = is;
})(RawText || (exports.RawText = RawText = {}));
//# sourceMappingURL=raw-text.js.map