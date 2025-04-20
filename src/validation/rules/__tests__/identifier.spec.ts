import { describe, it, expect, test } from "vitest";

import identifier from "../identifier";
import type { RuleExecutionOutcome } from "../../validator";

describe("identifier", () => {
  test.each([123, null, undefined])("should return invalid for a non-string value", (value) => {
    const outcome = identifier(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a string.");
  });

  test.each(["", "   "])("should return invalid for an empty string", (value) => {
    const outcome = identifier(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} cannot be empty.");
  });

  it.concurrent("should return invalid for a string that starts with a digit", () => {
    const outcome = identifier("123_invalid") as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} cannot start with a digit.");
  });

  it.concurrent("should return invalid for a string that contains invalid characters", () => {
    const outcome = identifier("invalid@") as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} may only contain letters, digits and underscores.");
  });

  test.each(["_valid", "valid_123", "valid", "valid123"])("should return valid for a valid identifier", (value) => {
    const outcome = identifier(value) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
