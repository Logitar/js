import { describe, it, expect } from "vitest";

import requireNonAlphanumeric from "../requireNonAlphanumeric";

describe("requireDigit", () => {
  it.concurrent("should return true for a string with a non-alphanumeric character", () => {
    expect(requireNonAlphanumeric("AAaa!!11")).toBe(true);
  });

  it.concurrent("should return false for a string without a non-alphanumeric character", () => {
    expect(requireNonAlphanumeric("AAaa1111")).toBe(false);
  });
});
