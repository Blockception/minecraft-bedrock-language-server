import { OffsetWord } from 'bc-vscode-words';
import { Location } from 'vscode-languageserver';
import { Context } from '../../context/context';
import { ReferenceContext } from '../context';
export declare function provideReferences(context: Context<ReferenceContext>, value: OffsetWord): Promise<Location[] | undefined>;
//# sourceMappingURL=commands.d.ts.map