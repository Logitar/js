import { describe, it, expect } from "vitest";

import requireUppercase from "../requireUppercase";

describe("requireUppercase", () => {
  it.concurrent("should return true for a string with a uppercase letter", () => {
    expect(requireUppercase("AAaa!!11")).toBe(true);
  });

  it.concurrent("should return false for a string without a uppercase letter", () => {
    expect(requireUppercase("aaaa!!11")).toBe(false);
  });
});
