import { describe, it, expect, test } from "vitest";

import rule from "../allowedCharacters";
import type { RuleExecutionOutcome } from "../../validator";

const allowedCharacters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

describe("allowedCharacters", () => {
  it.concurrent("should return invalid for a value that is not a string", () => {
    const outcome = rule(123, allowedCharacters) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a string.");
  });

  it.concurrent("should return warning when the args are not a string", () => {
    const outcome = rule("hello", 123) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("warning");
    expect(outcome.message).toBe("The arguments should be a string containing each allowed character only once.");
  });

  it.concurrent("should return invalid for a string with disallowed characters", () => {
    let outcome = rule("hello!", allowedCharacters) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} contains the following characters that are not allowed: !");

    outcome = rule("    ", allowedCharacters) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} contains the following characters that are not allowed:  ");
  });

  it.concurrent("should return valid for a string with only allowed characters", () => {
    const outcome = rule("hello", allowedCharacters) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });

  it.concurrent("should return valid for empty string", () => {
    const outcome = rule("", allowedCharacters) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
