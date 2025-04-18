import { describe, it, expect } from "vitest";

import required from "../required";

describe("required", () => {
  it.concurrent("should return true for a non-empty string", () => {
    expect(required("Hello, world!")).toBe(true);
  });

  it.concurrent("should return false for an empty string", () => {
    expect(required("")).toBe(false);
  });

  it.concurrent("should return false for whitespace-only strings", () => {
    expect(required("    ")).toBe(false);
  });

  it.concurrent("should return false for a null value", () => {
    expect(required(null)).toBe(false);
  });

  it.concurrent("should return false for an undefined value", () => {
    expect(required(undefined)).toBe(false);
  });

  it.concurrent("should return true for numeric values", () => {
    expect(required(0)).toBe(true);
    expect(required(-1)).toBe(true);
  });

  it.concurrent("should return true for true", () => {
    expect(required(true)).toBe(true);
  });

  it.concurrent("should return false for false", () => {
    expect(required(false)).toBe(false);
  });

  it.concurrent("should return true for object values", () => {
    expect(required({})).toBe(true);
    expect(required({ key: "value" })).toBe(true);
  });

  it.concurrent("should return false for invalid numbers", () => {
    expect(required(NaN)).toBe(false);
  });

  it.concurrent("should return false for empty arrays", () => {
    expect(required([])).toBe(false);
  });

  it.concurrent("should return true for non-empty arrays", () => {
    expect(required([1, 2, 3])).toBe(true);
  });
});
