// Like `get()`: an Ember proxy answers through `unknownProperty`, and a plain read throws in development.
function read(object: object, key: string): unknown {
  if (key in object) {
    return (object as Record<string, unknown>)[key];
  }

  const { unknownProperty } = object as { unknownProperty?: unknown };

  return typeof unknownProperty === 'function'
    ? unknownProperty.call(object, key)
    : undefined;
}

export default function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  const object = Object(value) as object;
  const size = read(object, 'size');

  if (typeof size === 'number') {
    return !size;
  }

  if (typeof value !== 'function') {
    const length = read(object, 'length');

    if (typeof length === 'number') {
      return !length;
    }
  }

  return false;
}
