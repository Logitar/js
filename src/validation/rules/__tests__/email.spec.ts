import { describe, it, expect } from "vitest";

import email from "../email";

describe("email", () => {
  it("should return true when the value is a valid email", () => {
    expect(email("test@example.com")).toBe(true);
    expect(email("hello+world@example.com")).toBe(true);
  });

  it("should return false when the value is not a valid email", () => {
    expect(email("invalid-email")).toBe(false);
    expect(email("aa@@bb..cc")).toBe(false);
  });

  it("should return false when the value is not a string", () => {
    expect(email(123)).toBe(false);
    expect(email(null)).toBe(false);
    expect(email(undefined)).toBe(false);
  });
});
