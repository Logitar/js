import type { ValidationRule } from "../validator";

// https://github.com/colinhacks/zod/blob/40e72f9eaf576985f876d1afc2dbc22f73abc1ba/src/types.ts#L595
const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

const email: ValidationRule = (value: unknown): boolean => {
  return typeof value === "string" && regex.test(value);
};

export default email;
