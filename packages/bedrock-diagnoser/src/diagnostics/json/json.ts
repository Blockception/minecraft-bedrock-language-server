import { jsonc } from 'jsonc';
import { DiagnosticsBuilder, DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../types';
import { handle_json_error } from './errors';

export namespace Json {
  /**Loads the object and casts it to the specified thandle_json_errorype, if it fails then undefined is loaded and the error message is send to the diagnoser
   * @param doc The text document to load from
   * @param diagnoser The diagnoser to load from
   * @returns Either the object cast to the specific type, or undefined if failed*/
  export function LoadReport<T>(diagnoser: DocumentDiagnosticsBuilder): T | undefined {
    try {
      //get text
      const text = diagnoser.document.getText();

      //get object
      const temp = parse(text);

      // Format version
      // diagnoseFormatVersionIf(temp, diagnoser);

      return temp as T;

      //cast object
    } catch (err: any) {
      handle_json_error(err, diagnoser);
    }

    return undefined;
  }

  export function parse(text: string): any {
    return jsonc.parse(text, { stripComments: true });
  }

  /**
   *
   * @param value
   * @param diagnoser
   * @param type
   * @param code
   * @param checkFn
   * @returns
   */
  export function TypeCheck<T>(
    value: any,
    diagnoser: DiagnosticsBuilder,
    type: string,
    code: string,
    checkFn: (value: any) => value is T,
  ): value is T {
    if (checkFn(value)) {
      return true;
    }

    diagnoser.add(0, 'Json cannot be casted to: ' + type, DiagnosticSeverity.error, code);
    return false;
  }
}
