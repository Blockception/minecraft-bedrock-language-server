"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftCommandData = void 0;
exports.get = get;
const command_data_url = 'https://raw.githubusercontent.com/Mojang/bedrock-samples/refs/heads/main/metadata/command_modules/mojang-commands.json';
async function get() {
    return fetch(command_data_url)
        .then((response) => response.json())
        .then((data) => {
        if (!MinecraftCommandData.is(data)) {
            console.log('Invalid command data format', data);
            throw new Error('Invalid command data format');
        }
        return data;
    });
}
var MinecraftCommandData;
(function (MinecraftCommandData) {
    function is(data) {
        return (typeof data.name === 'string' &&
            typeof data.module_type === 'string' &&
            Array.isArray(data.command_enums) &&
            Array.isArray(data.commands));
    }
    MinecraftCommandData.is = is;
})(MinecraftCommandData || (exports.MinecraftCommandData = MinecraftCommandData = {}));
//# sourceMappingURL=minecraft-data.js.map