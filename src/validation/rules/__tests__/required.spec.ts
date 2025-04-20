import { describe, it, expect, test } from "vitest";

import required from "../required";
import type { RuleExecutionOutcome } from "../../validator";

describe("required", () => {
  test.each(["", "   "])("should return invalid when the value is an empty string", (value) => {
    const outcome = required(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} cannot be empty.");
  });

  test.each([0, 0.0, NaN])("should return invalid for an invalid number or 0.", (value) => {
    const outcome = required(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a number different from 0.");
  });

  it.concurrent("should return invalid for an empty array", () => {
    const outcome = required([]) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} cannot be empty.");
  });

  test.each([0n, false, null, undefined])("should return invalid for a falsy value", (value) => {
    const outcome = required(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} is required.");
  });

  test.each(["  hello   ", 1, -1.1, ["not_empty"], {}, new Date()])("should return valid for a valid value", (value) => {
    const outcome = required(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
