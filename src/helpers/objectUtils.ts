/**
 * Assigns the specified value to the specified key in the specified object.
 * @param obj The object to be assigned to.
 * @param key The key to assign the value to.
 * @param value The value to assign.
 */
export function assign<T, TKey extends keyof T, TValue extends T[TKey]>(obj: T, key: TKey, value: TValue): void {
  obj[key] = value;
}

/**
 * Returns a value indicating whether or not the specified object is empty. An object is empty when it has no key.
 * @param obj The object to check.
 * @returns True if the object is empty (it has no key), or false otherwise.
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
