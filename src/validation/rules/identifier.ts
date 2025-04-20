import type { ValidationRule } from "..";
import { isDigit, isLetterOrDigit } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): boolean =>
  typeof value === "string" && value.length > 0 && !isDigit(value[0]) && [...value].every((c) => isLetterOrDigit(c) || c === "_");

export default identifier;
