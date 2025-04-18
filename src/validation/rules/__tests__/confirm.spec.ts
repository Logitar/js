import { describe, it, expect } from "vitest";

import confirm from "../confirm";

describe("confirm", () => {
  it.concurrent("should return true when value is equal to target", () => {
    expect(confirm(-1, -1)).toBe(true);
    expect(confirm(false, false)).toBe(true);
    expect(confirm("", "")).toBe(true);
    expect(confirm("   ", "   ")).toBe(true);
    expect(confirm("hello", "hello")).toBe(true);
    expect(confirm([], [])).toBe(true);
    expect(confirm({ key: "value" }, { key: "value" })).toBe(true);
    expect(confirm(null, null)).toBe(true);
    expect(confirm(undefined, undefined)).toBe(true);
  });

  it.concurrent("should return false when value is not equal to target", () => {
    expect(confirm("hello", "world")).toBe(false);
    expect(confirm("", "   ")).toBe(false);
    expect(confirm(false, true)).toBe(false);
    expect(confirm(-1, 1)).toBe(false);
    expect(confirm(null, undefined)).toBe(false);
    expect(confirm(["1"], [1])).toBe(false);
    expect(confirm({ key: "1" }, { key: 1 })).toBe(false);
  });
});
