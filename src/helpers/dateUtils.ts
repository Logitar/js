function padStart(value: string, minLength: number, paddingChar: string): string {
  if (value.length >= minLength) {
    return value;
  }
  return padStart(paddingChar + value, minLength, paddingChar);
}

/**
 * Converts the specified date to a `datetime-local` string.
 * @param date The date to convert.
 * @returns The date converted as a `datetime-local` string.
 */
export function toDateTimeLocal(date: Date): string {
  const d = [
    padStart(date.getFullYear().toString(), 4, "0"),
    padStart((date.getMonth() + 1).toString(), 2, "0"),
    padStart(date.getDate().toString(), 2, "0"),
  ].join("-");
  const t = [padStart(date.getHours().toString(), 2, "0"), padStart(date.getMinutes().toString(), 2, "0")].join(":");
  return [d, t].join("T");
}
