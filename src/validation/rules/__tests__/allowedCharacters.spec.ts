import { describe, it, expect } from "vitest";

import rule from "../allowedCharacters";
const allowedCharacters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

describe("allowedCharacters", () => {
  it.concurrent("should return true for a string with only allowed characters", () => {
    expect(rule("hello", allowedCharacters)).toBe(true);
  });

  it.concurrent("should return true for empty string", () => {
    expect(rule("", allowedCharacters)).toBe(true);
  });

  it.concurrent("should return false for a string with disallowed characters", () => {
    expect(rule("hello!", allowedCharacters)).toBe(false);
    expect(rule("   ", allowedCharacters)).toBe(false);
  });

  it.concurrent("should return false for non-string values", () => {
    expect(rule(123, allowedCharacters)).toBe(false);
    expect(rule(null, allowedCharacters)).toBe(false);
    expect(rule(undefined, allowedCharacters)).toBe(false);
    expect(rule([], allowedCharacters)).toBe(false);
    expect(rule({ key: "value" }, allowedCharacters)).toBe(false);
    expect(rule(true, allowedCharacters)).toBe(false);
  });

  it.concurrent("should return false when args are not a string", () => {
    expect(rule("hello", 123)).toBe(false);
    expect(rule("hello", true)).toBe(false);
    expect(rule("hello", null)).toBe(false);
    expect(rule("hello", undefined)).toBe(false);
    expect(rule("hello", [])).toBe(false);
    expect(rule("hello", { key: "value" })).toBe(false);
  });
});
