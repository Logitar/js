import { describe, it, expect } from "vitest";

import rule from "../pattern";
const pattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;

describe("pattern", () => {
  it("should return true when the value is a string matching the pattern", () => {
    expect(rule("H2X3Y2", pattern)).toBe(true);
    expect(rule("H2X 3Y2", pattern)).toBe(true);
    expect(rule("H2X-3Y2", pattern)).toBe(true);
  });

  it("should return false when the value is a string not matching the pattern", () => {
    expect(rule("h2x3y2", pattern)).toBe(false);
    expect(rule("H2X -3Y2", pattern)).toBe(false);
    expect(rule("H2U 3Y2", pattern)).toBe(false);
  });

  it("should return false when the value is not a string", () => {
    expect(rule(123, pattern)).toBe(false);
    expect(rule(null, pattern)).toBe(false);
    expect(rule(undefined, pattern)).toBe(false);
  });

  it("should return false when the pattern is not valid", () => {
    expect(rule("H2X 3Y2", 123)).toBe(false);
    expect(rule("H2X 3Y2", null)).toBe(false);
    expect(rule("H2X 3Y2", undefined)).toBe(false);
    expect(rule("H2X 3Y2", [])).toBe(false);
    expect(rule("H2X 3Y2", {})).toBe(false);
  });
});
