import { describe, it, expect } from "vitest";

import identifier from "../identifier";

describe("identifier", () => {
  it.concurrent("should return true for a valid identifier", () => {
    expect(identifier("_valid")).toBe(true);
    expect(identifier("valid_123")).toBe(true);
    expect(identifier("valid")).toBe(true);
    expect(identifier("valid123")).toBe(true);
  });

  it.concurrent("should return false for a non-string value", () => {
    expect(identifier(123)).toBe(false);
    expect(identifier(null)).toBe(false);
    expect(identifier(undefined)).toBe(false);
  });

  it.concurrent("should return false for an empty string", () => {
    expect(identifier("")).toBe(false);
    expect(identifier("   ")).toBe(false);
  });

  it.concurrent("should return false for a string that starts with a digit", () => {
    expect(identifier("123_invalid")).toBe(false);
  });

  it.concurrent("should return false for a string that contains invalid characters", () => {
    expect(identifier("invalid@")).toBe(false);
  });
});
