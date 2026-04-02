import { offsetIntoJsonString } from "../../../../../src/diagnostics/behavior-pack/mcfunction/offset";

describe("BehaviorPack", () => {
  describe("Mcfunction", () => {
    describe("offsetIntoJsonString", () => {
      // ── with slash prefix (default) ──────────────────────────────────────

      it("returns the document offset of the first command character (slash prefix)", () => {
        // Document (conceptual): '{ "on_entry": ["/say hello"] }'
        //                                         ^ jsonStringDocStart = 16
        // Layout: 16=`"`, 17=`/`, 18=`s`, 19=`a`, 20=`y`, 21=` `, 22=`h`, ...
        expect(offsetIntoJsonString(0, 16)).toBe(18); // `s` in `say`
      });

      it("returns the document offset of an interior token (slash prefix)", () => {
        // "hello" starts 4 characters into the command text "say hello"
        expect(offsetIntoJsonString(4, 16)).toBe(22); // `h` in `hello`
      });

      it("returns the document offset for offset 0 at document position 0 (slash prefix)", () => {
        // If the JSON string starts at the very beginning of the document.
        // `"` at 0, `/` at 1, first command char at 2.
        expect(offsetIntoJsonString(0, 0)).toBe(2);
      });

      it("handles a large base offset (slash prefix)", () => {
        expect(offsetIntoJsonString(10, 500)).toBe(512); // 500 + 1 + 1 + 10
      });

      it("cmdOffset 0 with slash prefix produces start + 2", () => {
        expect(offsetIntoJsonString(0, 42)).toBe(44);
      });

      // ── without slash prefix ─────────────────────────────────────────────

      it("returns the document offset of the first command character (no slash prefix)", () => {
        // Document (conceptual): '{ "command": "say hello" }'
        //                                       ^ jsonStringDocStart = 14
        // Layout: 14=`"`, 15=`s`, 16=`a`, 17=`y`, 18=` `, 19=`h`, ...
        expect(offsetIntoJsonString(0, 14, false)).toBe(15); // `s` in `say`
      });

      it("returns the document offset of an interior token (no slash prefix)", () => {
        expect(offsetIntoJsonString(4, 14, false)).toBe(19); // `h` in `hello`
      });

      it("handles a large base offset (no slash prefix)", () => {
        expect(offsetIntoJsonString(10, 500, false)).toBe(511); // 500 + 1 + 10
      });

      it("cmdOffset 0 with no slash prefix produces start + 1", () => {
        expect(offsetIntoJsonString(0, 42, false)).toBe(43);
      });
    });
  });
});
