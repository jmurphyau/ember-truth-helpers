export default function isArray(value: unknown): value is ArrayLike<unknown> {
  if (Array.isArray(value)) {
    return true;
  }

  if (
    typeof value !== 'object' ||
    value === null ||
    'setInterval' in value ||
    value instanceof String
  ) {
    return false;
  }

  const { length } = value as { length?: unknown };

  return (
    typeof length === 'number' &&
    !Number.isNaN(length) &&
    Object.prototype.toString.call(value) !== '[object FileList]'
  );
}
