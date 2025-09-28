import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { ExpressionNode, parseMolang } from "./syntax";

export class MolangSyntaxCache {
  private _data: Map<string, ExpressionNode[]>;

  constructor() {
    this._data = new Map();
  }

  build(code: OffsetWord): ExpressionNode[] | undefined {
    const exp = this._data.get(code.text);
    if (exp === undefined) {
      const r = parseMolang(code);
      this._data.set(code.text, r);
      return r;
    }

    return exp;
  }

  clear() {
    this._data.clear();
  }

  entries() {
    return this._data.entries();
  }

  syntaxes() {
    return this._data.keys();
  }

  expressions() {
    return this._data.values();
  }
}
