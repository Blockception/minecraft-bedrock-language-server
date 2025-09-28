import { FormatVersion, Version } from "./format-version";

describe("FormatVersion", () => {
  describe("parse", () => {
    it("parses full version string (major.minor.patch)", () => {
      expect(FormatVersion.parse("1.2.3")).toEqual([1, 2, 3]);
    });

    it("parses version string without patch (major.minor)", () => {
      expect(FormatVersion.parse("1.2")).toEqual([1, 2, 0]);
    });

    it("parses version string with only major", () => {
      expect(FormatVersion.parse("5")).toEqual([5, 0, 0]);
    });

    it("parses empty string as [0,0,0]", () => {
      expect(FormatVersion.parse("")).toEqual([0, 0, 0]);
    });

    it("handles non-numeric values gracefully", () => {
      expect(FormatVersion.parse("a.b.c")).toEqual([NaN, NaN, NaN]);
    });
  });

  describe("unwrap", () => {
    it("unwraps a string version", () => {
      expect(FormatVersion.unwrap("1.2.3")).toEqual([1, 2, 3]);
    });

    it("unwraps a Version tuple", () => {
      const version: Version = [1, 2, 3];
      expect(FormatVersion.unwrap(version)).toBe(version);
    });
  });

  describe("isEqual", () => {
    it("returns true for equal versions", () => {
      expect(FormatVersion.isEqual("1.2.3", [1, 2, 3])).toBe(true);
    });

    it("returns false for different versions", () => {
      expect(FormatVersion.isEqual("1.2.3", [1, 2, 4])).toBe(false);
    });
  });

  describe("isLessThan", () => {
    it("returns true when a < b", () => {
      expect(FormatVersion.isLessThan("1.2.3", [1, 3, 0])).toBe(true);
    });

    it("returns false when a > b", () => {
      expect(FormatVersion.isLessThan("2.0.0", [1, 9, 9])).toBe(false);
    });

    it("returns false when a == b", () => {
      expect(FormatVersion.isLessThan("1.2.3", [1, 2, 3])).toBe(false);
    });
  });

  describe("isLessOrEqualThan", () => {
    it("returns true when a < b", () => {
      expect(FormatVersion.isLessOrEqualThan("1.2.3", [1, 3, 0])).toBe(true);
    });

    it("returns true when a == b", () => {
      expect(FormatVersion.isLessOrEqualThan("1.2.3", [1, 2, 3])).toBe(true);
    });

    it("returns false when a > b", () => {
      expect(FormatVersion.isLessOrEqualThan("2.0.0", [1, 9, 9])).toBe(false);
    });
  });

  describe("isGreaterThan", () => {
    it("returns true when a > b", () => {
      expect(FormatVersion.isGreaterThan("2.0.0", [1, 9, 9])).toBe(true);
    });

    it("returns false when a < b", () => {
      expect(FormatVersion.isGreaterThan("1.2.3", [1, 3, 0])).toBe(false);
    });

    it("returns false when a == b", () => {
      expect(FormatVersion.isGreaterThan("1.2.3", [1, 2, 3])).toBe(false);
    });
  });

  describe("isGreaterOrEqualThan", () => {
    it("returns true when a > b", () => {
      expect(FormatVersion.isGreaterOrEqualThan("2.0.0", [1, 9, 9])).toBe(true);
    });

    it("returns true when a == b", () => {
      expect(FormatVersion.isGreaterOrEqualThan("1.2.3", [1, 2, 3])).toBe(true);
    });

    it("returns false when a < b", () => {
      expect(FormatVersion.isGreaterOrEqualThan("1.2.3", [1, 3, 0])).toBe(false);
    });
  });
});
