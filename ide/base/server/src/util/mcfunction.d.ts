/**
 * Returns the index of the first `#` character that is not inside a
 * double-quoted string, or -1 if no such character exists.
 *
 * This correctly identifies inline comments (e.g. `kill @s # comment`)
 * while ignoring `#` inside string arguments (e.g. `summon cow "#asdf"`).
 */
export declare function findCommentStart(line: string): number;
//# sourceMappingURL=mcfunction.d.ts.map