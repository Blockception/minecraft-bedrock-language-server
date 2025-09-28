import { Types } from "bc-minecraft-bedrock-types";
import { ExpressionNode } from "./nodes";
/** Main function to parse Molang code into a syntax tree */
export declare function parseMolang(line: Types.OffsetWord): ExpressionNode[];
