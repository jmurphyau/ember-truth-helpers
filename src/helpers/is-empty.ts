export default function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  const { size, length } = Object(value) as {
    size?: unknown;
    length?: unknown;
  };

  if (typeof size === 'number') {
    return !size;
  }

  if (typeof length === 'number' && typeof value !== 'function') {
    return !length;
  }

  return false;
}
