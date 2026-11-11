function hasIsEqual(
  value: unknown,
): value is { isEqual(other: unknown): boolean } {
  return (
    Boolean(value) &&
    typeof (value as { isEqual?: unknown }).isEqual === 'function'
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
