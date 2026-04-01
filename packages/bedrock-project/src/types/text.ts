export namespace Text {
  export function UnQuote(text: string): string {
    if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) return text.slice(1, text.length - 1);

    return text;
  }
}
