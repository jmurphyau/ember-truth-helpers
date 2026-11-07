function hasIsEqual(
  value: unknown,
): value is { isEqual(other: unknown): boolean } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isEqual' in value &&
    typeof value.isEqual === 'function'
  );
}

export default function isEqual(a: unknown, b: unknown): boolean {
  if (hasIsEqual(a)) {
    return a.isEqual(b);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  return a === b;
}
