/**
 * Trims the specified string if it is not empty or white-space, or returns undefined.
 * @param s The value to clean-trim.
 * @returns The trimmed string if it was not empty nor white-space, or undefined otherwise.
 */
export function cleanTrim(s?: string): string | undefined {
  return isNullOrWhiteSpace(s) ? undefined : s?.trim();
}

/**
 * Combines the specified segments into an URL.
 * @param segments The segments to combine.
 * @returns The created URL.
 */
export function combineURL(...segments: string[]): string {
  const url = segments
    .map((v) => v?.trim().replace(/^\/+|\/+$/g, "") ?? "")
    .filter((v) => v.length)
    .join("/");
  return isAbsoluteURL(url) ? url : `/${url}`;
}

const absoluteUrlRegex = new RegExp("^(?:[a-z+]+:)?//", "i");
/**
 * Returns a value indicating whether or not the specified URL is absolute.
 * @param url The URL to check.
 * @returns True if the URL is absolute, or false otherwise.
 */
export function isAbsoluteURL(url: string): boolean {
  return absoluteUrlRegex.test(url);
}

/**
 * Returns a value indicating whether or not the specified character is a digit.
 * @param c The character to check.
 * @returns True if the character is a digit, or false otherwise.
 */
export function isDigit(c: string): boolean {
  return c.trim() !== "" && !isNaN(Number(c));
}

/**
 * Returns a value indicating whether or not the specified character is a letter.
 * @param c The character to check.
 * @returns True if the character is a letter, or false otherwise.
 */
export function isLetter(c: string): boolean {
  return c.toLowerCase() !== c.toUpperCase();
}

/**
 * Returns a value indicating whether or not the specified character is a letter or a digit.
 * @param c The character to check.
 * @returns True if the character is a letter or a digit, or false otherwise.
 */
export function isLetterOrDigit(c: string): boolean {
  return isDigit(c) || isLetter(c);
}

/**
 * Returns a value indicating whether or not the specified string is undefined or empty.
 * @param c The string to check.
 * @returns True if the string is undefined or empty, or false otherwise.
 */
export function isNullOrEmpty(s?: string): boolean {
  return typeof s !== "string" || s.length === 0;
}

/**
 * Returns a value indicating whether or not the specified string is undefined, empty or white-space.
 * @param c The string to check.
 * @returns True if the string is undefined, empty or white-space, or false otherwise.
 */
export function isNullOrWhiteSpace(s?: string): boolean {
  return isNullOrEmpty(s?.trim());
}

/**
 * Returns a shortened version of the specified string, capped to the specified maximum length.
 * @param s The string to shorten.
 * @param length The maximum length of the string.
 * @returns The original string if its length was below the maximum length, or a string of the specified length, with its last character being a `…`.
 */
export function shortify(s: string, length: number): string {
  return s.length > length ? s.substring(0, length - 1) + "…" : s;
}

/**
 * Formats the specified string into a slug. Slugs are composed of non-empty words separated by hyphens (`-`).
 * @param s The string to slugify.
 * @returns The formatted slug string.
 */
export function slugify(s?: string): string {
  if (!s) {
    return "";
  }
  const words = [];
  let word = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (isLetterOrDigit(c)) {
      word += c;
    } else if (word.length) {
      words.push(word);
      word = "";
    }
  }
  if (word.length) {
    words.push(word);
  }
  return unaccent(words.join("-").toLowerCase());
}

const reservedChars = new Set<string>(["]", "^", "\\"]);
/**
 * Trims the specified string of the specified characters, removing all occurrences of this character at the start and at the end of the string.
 * @param s The string to trim.
 * @param c The character to remove from the string's start and end.
 * @returns The trimmed string.
 */
export function trim(s: string, c: string): string {
  c = reservedChars.has(c) ? `\\${c}` : c;
  return s.replace(new RegExp(`^[${c}]+|[${c}]+$`, "g"), "");
}
/**
 * Trims the specified string of the specified characters, removing all occurrences of this character at the end of the string.
 * @param s The string to trim.
 * @param c The character to remove from the end of the string.
 * @returns The trimmed string.
 */
export function trimEnd(s: string, c: string): string {
  c = reservedChars.has(c) ? `\\${c}` : c;
  return s.replace(new RegExp(`[${c}]+$`, "g"), "");
}
/**
 * Trims the specified string of the specified characters, removing all occurrences of this character at the start of the string.
 * @param s The string to trim.
 * @param c The character to remove from the start of the string.
 * @returns The trimmed string.
 */
export function trimStart(s: string, c: string): string {
  c = reservedChars.has(c) ? `\\${c}` : c;
  return s.replace(new RegExp(`^[${c}]+`, "g"), "");
}

const accents = new Map<string, string>([
  ["à", "a"],
  ["â", "a"],
  ["ç", "c"],
  ["è", "e"],
  ["é", "e"],
  ["ê", "e"],
  ["ë", "e"],
  ["î", "i"],
  ["ï", "i"],
  ["ô", "o"],
  ["ù", "u"],
  ["û", "u"],
  ["ü", "u"],
]);
/**
 * Replaces accent characters in the specified string by their ASCII character representation. For example, `é` becomes `e`.
 * @param s The string to remove the accents.
 * @returns The string without accents.
 */
export function unaccent(s: string): string {
  return [...s].map((c) => (c.toUpperCase() === c ? (accents.get(c) ?? c).toUpperCase() : accents.get(c) ?? c)).join("");
}
