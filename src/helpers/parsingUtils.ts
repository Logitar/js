/**
 * Tries parsing a boolean from the specified value.
 * @param value Can be a boolean, a string or undefined. Strings are trimmed and lowercased before being compared to boolean equivalents.
 * @returns A boolean if the value was parsed successfully, or undefined otherwise.
 */
export function parseBoolean(value: boolean | string | undefined): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  } else if (typeof value === "string") {
    value = value.trim().toLowerCase();
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
    }
  }
}

/**
 * Tries parsing a number from the specified value.
 * @param value Can be a number, a string or undefined. Strings are trimmed before being converted to numbers.
 * @returns A number if the value was parsed successfully, or undefined otherwise.
 */
export function parseNumber(value: number | string | undefined): number | undefined {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    const number = Number(value.trim());
    if (!isNaN(number)) {
      return number;
    }
  }
  return undefined;
}
