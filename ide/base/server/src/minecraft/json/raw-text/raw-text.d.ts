export interface TextComponent {
    text: string;
}
export declare namespace TextComponent {
    function is(value: any): value is TextComponent;
}
export interface TranslateComponent {
    translate: string;
    with: string[] | RawText | undefined;
}
export declare namespace TranslateComponent {
    function is(value: any): value is TranslateComponent;
}
export interface SelectorComponent {
    selector: string;
}
export declare namespace SelectorComponent {
    function is(value: any): value is SelectorComponent;
}
export interface ScoreComponent {
    score: {
        name: string;
        objective: string;
    };
}
export declare namespace ScoreComponent {
    function is(value: any): value is ScoreComponent;
}
export type RawTextComponent = TextComponent | TranslateComponent | SelectorComponent | ScoreComponent;
export interface RawText {
    rawtext: RawTextComponent[];
}
export declare namespace RawText {
    function is(value: any): value is RawText;
}
//# sourceMappingURL=raw-text.d.ts.map