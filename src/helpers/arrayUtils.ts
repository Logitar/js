function compare<T>(a: T, b: T, weight: number): number {
  if (typeof a === "undefined" || a === null || typeof b === "undefined" || b === null) {
    if ((a ?? null) === null && (b ?? null) !== null) {
      return -weight;
    } else if ((a ?? null) !== null && (b ?? null) === null) {
      return weight;
    }
    return 0;
  }
  return a < b ? -weight : a > b ? weight : 0;
}

/**
 * Sorts the specified array.
 * @param items The array to sort.
 * @param key If provided, the key used to sort an array of objects.
 * @param isDescending A value indicating whether or not the sort is reversed (descending).
 * @returns A shallow copy of the sorted array.
 */
export function orderBy<T>(items: T[], key?: keyof T, isDescending?: boolean): T[] {
  const weight = isDescending ? -1 : 1;
  if (key) {
    return [...items].sort((a, b) => compare(a[key], b[key], weight));
  }
  return [...items].sort((a, b) => compare(a, b, weight));
}

/**
 * Reverse-sorts the specified array.
 * @param items The array to sort.
 * @param key If provided, the key used to sort an array of objects.
 * @returns A shallow copy of the sorted array.
 */
export function orderByDescending<T>(items: T[], key?: keyof T): T[] {
  return orderBy(items, key, true);
}
