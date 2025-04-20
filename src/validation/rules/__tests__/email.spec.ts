import { describe, it, expect } from "vitest";

import email from "../email";
import type { RuleExecutionOutcome } from "../../validator";

describe("email", () => {
  it.concurrent("should return invalid when the value is not a string", () => {
    const outcome = email(123) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a string.");
  });

  it.concurrent("should return invalid when the value is not a valid email address", () => {
    const outcome = email("invalid-email") as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} is not a valid email address.");
  });

  it.concurrent("should return valid when the value is a valid email address", () => {
    const outcome = email("test@example.com") as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
  });
});
