"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideJsonCompletion = provideJsonCompletion;
const builder_1 = require("../../builder");
const sounds_1 = require("./sounds");
function provideJsonCompletion(context) {
    return jsonSoundDefinitionsCompletion.onCompletion(context);
}
const jsonSoundDefinitionsCompletion = new builder_1.JsonPathCompletion({
    match: /\/sounds\/(\d+)/,
    onCompletion: sounds_1.provideSoundFileCompletion,
});
//# sourceMappingURL=sound-definitions.js.map