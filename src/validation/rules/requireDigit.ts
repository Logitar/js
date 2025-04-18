import type { ValidationRule } from "../validator";
import { isDigit } from "../../helpers/stringUtils";

const requireDigit: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && [...value].some(isDigit);
};

export default requireDigit;
