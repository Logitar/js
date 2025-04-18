import { describe, it, expect } from "vitest";

import requireDigit from "../requireDigit";

describe("requireDigit", () => {
  it.concurrent("should return true for a string with a digit", () => {
    expect(requireDigit("AAaa!!11")).toBe(true);
  });

  it.concurrent("should return false for a string without a digit", () => {
    expect(requireDigit("AAaa!!!!")).toBe(false);
  });
});
