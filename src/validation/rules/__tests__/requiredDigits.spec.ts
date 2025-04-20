import { describe, it, expect, test } from "vitest";

import requiredDigits from "../requiredDigits";
import type { RuleExecutionOutcome } from "../../validator";

describe("requiredDigits", () => {
  it.concurrent("should return invalid when the value is not a string", () => {
    const outcome = requiredDigits(123) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a string.");
  });

  test.each(["test", {}, undefined])("should return warning when arguments are not parsable as a number", (args) => {
    const outcome = requiredDigits("test", args) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("warning");
    expect(outcome.message).toBe("The arguments should be parsable as a number.");
  });

  test.each([
    ["", 1],
    ["", true],
    ["AAaa!!11", 3],
  ])("should return invalid when there are less than the required digits", (value, args) => {
    const outcome = requiredDigits(value, args) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must contain at least {{requiredDigits}} digit(s).");
  });

  test.each([
    ["123", true],
    ["123", 2],
    ["AAaa!!111", 3],
  ])("should return valid when there are at least the required digits", (value, args) => {
    const outcome = requiredDigits(value, args) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
