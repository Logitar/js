import type { ValidationRule } from "..";
import { isLetterOrDigit } from "../../helpers/stringUtils";

const slug: ValidationRule = (value: unknown): boolean =>
  typeof value === "string" && value.split("-").every((word) => word.length > 0 && [...word].every(isLetterOrDigit));

export default slug;
