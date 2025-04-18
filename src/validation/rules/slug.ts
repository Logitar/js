import type { ValidationRule } from "../validator";
import { isLetterOrDigit, isNullOrWhiteSpace } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && value.split("-").every((word) => !isNullOrWhiteSpace(word) && [...word].every(isLetterOrDigit));
};

export default slug;
