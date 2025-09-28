'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Console = void 0;
class Console {
  /**Sends a error to the console log of the server*/
  static errror(message, ...optionalParams) {
    console.error(message, ...optionalParams);
  }
  /**Sends a error to the console log of the server*/
  static info(message, ...optionalParams) {
    console.info(message, ...optionalParams);
  }
  /**Sends a error to the console log of the server*/
  static log(message, ...optionalParams) {
    console.log(message, ...optionalParams);
  }
  /**Sends a error to the console log of the server*/
  static warn(message, ...optionalParams) {
    console.warn(message, ...optionalParams);
  }
}
exports.Console = Console;
//# sourceMappingURL=console.js.map
