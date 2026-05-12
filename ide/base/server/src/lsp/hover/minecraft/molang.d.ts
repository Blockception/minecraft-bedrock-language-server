import { Hover, Range } from 'vscode-languageserver';
import { TextRange } from '../../../minecraft/json';
import { Context } from '../../context/context';
import { HoverContext } from '../context';
export declare function provideHover(context: Context<HoverContext>): Hover | undefined;
export declare function provideHoverAt(context: Pick<Context<HoverContext>, 'document'>, currentText: string, textRange: TextRange, cursor: number): Hover | undefined;
export declare function provideHoverSpecific(main: string, sub?: string | undefined, range?: Range | undefined): Hover | undefined;
//# sourceMappingURL=molang.d.ts.map