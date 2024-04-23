import { describe, expect, it } from "vitest";

import { parseBoolean, parseNumber } from "../parsingUtils";

describe("parsingUtils.parseBoolean", () => {
  it.concurrent("should return the same value when it is a boolean", () => {
    expect(parseBoolean(false)).toBe(false);
    expect(parseBoolean(true)).toBe(true);
  });

  it.concurrent("should return a boolean when parsing a valid string", () => {
    expect(parseBoolean("false")).toBe(false);
    expect(parseBoolean("  FALSE  ")).toBe(false);
    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("  TRUE  ")).toBe(true);
  });

  it.concurrent("should return undefined when parsing an invalid string", () => {
    expect(parseBoolean("")).toBeUndefined();
    expect(parseBoolean("   ")).toBeUndefined();
    expect(parseBoolean("Hello World!")).toBeUndefined();
  });

  it.concurrent("should return undefined when parsing anything else", () => {
    expect(parseBoolean(undefined)).toBeUndefined();
    expect(parseBoolean(null as any)).toBeUndefined();
    expect(parseBoolean(123 as any)).toBeUndefined();
  });
});

describe("parsingUtils.parseNumber", () => {
  it.concurrent("should not parse a non-numberish string", () => {
    expect(parseNumber("test")).toBeUndefined();
    expect(parseNumber("Hello World!")).toBeUndefined();
  });

  it.concurrent("should not parse any other type", () => {
    expect(parseNumber(false as any)).toBeUndefined();
    expect(parseNumber(true as any)).toBeUndefined();
    expect(parseNumber(new Date() as any)).toBeUndefined();
    expect(parseNumber(undefined as any)).toBeUndefined();
    expect(parseNumber(null as any)).toBeUndefined();
    expect(parseNumber({ number: 123 } as any)).toBeUndefined();
  });

  it.concurrent("should parse a number", () => {
    expect(parseNumber(-1)).toBe(-1);
    expect(parseNumber(0)).toBe(0);
    expect(parseNumber(420)).toBe(420);
  });

  it.concurrent("should parse a numberish string", () => {
    expect(parseNumber("-10")).toBe(-10);
    expect(parseNumber(" -2 ")).toBe(-2);
    expect(parseNumber("")).toBe(0);
    expect(parseNumber("   ")).toBe(0);
    expect(parseNumber("0")).toBe(0);
    expect(parseNumber("247")).toBe(247);
    expect(parseNumber("  9  ")).toBe(9);
  });
});
