import { describe, it, expect, test } from "vitest";

import confirm from "../confirm";
import type { RuleExecutionOutcome } from "../../validator";

describe("confirm", () => {
  test.each([
    ["hello", "world"],
    ["", "   "],
    [false, true],
    [-1, 1],
    [null, undefined],
    [["1"], [1]],
    [{ key: "1" }, { key: 1 }],
  ])("should return invalid when the value does not equal the target", (value, target) => {
    const outcome = confirm(value, target) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("error");
    expect(outcome.message).toBe("{{field}} must be equal to {{confirm}}");
  });

  test.each([
    [-1, -1],
    [false, false],
    ["", ""],
    ["   ", "   "],
    ["hello", "hello"],
    [[], []],
    [{ key: "value" }, { key: "value" }],
    [null, null],
    [undefined, undefined],
  ])("should return valid when value equals the target", (value, target) => {
    const outcome = confirm(value, target) as RuleExecutionOutcome;
    expect(outcome.severity).toBe("information");
    expect(outcome.message).toBeUndefined();
  });
});
