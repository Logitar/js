import type { ValidationRule } from "../validator";
import { isDigit, isLetterOrDigit, isNullOrWhiteSpace } from "../../helpers/stringUtils";

const identifier: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && !isNullOrWhiteSpace(value) && !isDigit(value[0]) && [...value].every((c) => isLetterOrDigit(c) || c === "_");
};

export default identifier;
