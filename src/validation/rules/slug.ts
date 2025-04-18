import type { ValidationRule } from "../validator";
import { isLetterOrDigit } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && value.split("-").every((word) => word.length > 0 && [...word].every(isLetterOrDigit));
};

export default slug;
