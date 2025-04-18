import { describe, it, expect } from "vitest";

import Validator from "../validator";
import required from "../rules/required";

describe("Validator", () => {
  it.concurrent("should add a validation rule", () => {
    const validator = new Validator();
    validator.addRule("required", required);
    expect(validator.hasRule("required")).toBe(true);
  });

  it.concurrent("should remove a validation rule", () => {
    const validator = new Validator();
    validator.addRule("required", required);
    validator.removeRule("required");
    expect(validator.hasRule("required")).toBe(false);
  });

  it.concurrent("should throw an error if a rule is missing", () => {
    const validator = new Validator();
    expect(() => validator.validate({}, { required: true })).toThrow();
  });

  it.concurrent("should validate a value with a rule", () => {
    const validator = new Validator();
    validator.addRule("required", required);
    const result = validator.validate("Hello, world!", { required: true });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it.concurrent("should skip validation rules when arguments are falsy", () => {
    const validator = new Validator();
    validator.addRule("required", required);
    const result = validator.validate(null, { required: false });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it.concurrent("should mark an invalid value as invalid", () => {
    const validator = new Validator();
    validator.addRule("required", required);
    const result = validator.validate("   ", { required: true });
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(["required"]);
  });
});
