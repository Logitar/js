import { describe, it, expect, test } from "vitest";

import rule from "../pattern";
import type { RuleExecutionOutcome } from "../../validator";

const pattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;

describe("pattern", () => {
  test.each([123, null, undefined])("should return invalid when the value is not a string", (value) => {
    const outcome = rule(value, pattern) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be a string.");
  });

  test.each([123, null, undefined, [], {}])("should return warning when the arguments are not a string, nor a RegExp", (pattern) => {
    const outcome = rule("H2X3Y2", pattern) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("warning");
    expect(outcome.message).toBe("The arguments should be a string or a RegExp.");
  });

  test.each(["h2x3y2", "H2X -3Y2", "H2U 3Y2"])("should return invalid when the value is a string not matching the pattern", (value) => {
    const outcome = rule(value, pattern) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must match the pattern {{pattern}}.");
  });

  test.each(["H2X3Y2", "H2X 3Y2", "H2X-3Y2"])("should return value when the valid is a string matching the pattern", (value) => {
    const outcome = rule(value, pattern) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
