import { describe, it, expect } from "vitest";

import slug from "../slug";

describe("slug", () => {
  it.concurrent("should return true when the value is a valid slug", () => {
    expect(slug("valid-slug")).toBe(true);
  });

  it.concurrent("should return false when the value is not a string", () => {
    expect(slug(123)).toBe(false);
    expect(slug(null)).toBe(false);
    expect(slug(undefined)).toBe(false);
  });

  it.concurrent("should return false when the value is an empty string", () => {
    expect(slug("")).toBe(false);
    expect(slug("   ")).toBe(false);
  });

  it.concurrent("should return false when the value contains empty words", () => {
    expect(slug("invalid--slug")).toBe(false);
  });

  it.concurrent("should return false when the value contains non-alphanumeric characters", () => {
    expect(slug("invalid-slug!")).toBe(false);
  });
});
