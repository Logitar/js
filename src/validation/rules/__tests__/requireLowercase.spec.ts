import { describe, it, expect } from "vitest";

import requireLowercase from "../requireLowercase";

describe("requireLowercase", () => {
  it.concurrent("should return true for a string with a lowercase letter", () => {
    expect(requireLowercase("AAaa!!11")).toBe(true);
  });

  it.concurrent("should return false for a string without a lowercase letter", () => {
    expect(requireLowercase("AAAA!!11")).toBe(false);
  });
});
