import { describe, it, expect } from "vitest";

import uniqueCharacters from "../uniqueCharacters";

describe("uniqueCharacters", () => {
  it.concurrent("should return true when the string has enough unique characters", () => {
    expect(uniqueCharacters("test", 3)).toBe(true);
    expect(uniqueCharacters("   ", 1)).toBe(true);
    expect(uniqueCharacters("Test123!", 8)).toBe(true);
  });

  it.concurrent("should return false when the string does not have enough unique characters", () => {
    expect(uniqueCharacters("test", 4)).toBe(false);
    expect(uniqueCharacters("", 1)).toBe(false);
    expect(uniqueCharacters("   ", 2)).toBe(false);
    expect(uniqueCharacters("AAaa!!11", 8)).toBe(false);
  });

  it.concurrent("should return false when the value is not a string", () => {
    expect(uniqueCharacters(123, 1)).toBe(false);
    expect(uniqueCharacters(null, 1)).toBe(false);
    expect(uniqueCharacters(undefined, 1)).toBe(false);
  });

  it.concurrent("should return false when the count is not a number", () => {
    expect(uniqueCharacters("test", "1")).toBe(false);
    expect(uniqueCharacters("test", null)).toBe(false);
    expect(uniqueCharacters("test", undefined)).toBe(false);
  });
});
