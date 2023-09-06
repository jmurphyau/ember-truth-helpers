import { isArray } from '@ember/array';

type ConvertTruthyObject<T> = T extends { isTruthy: infer U } ? U : T;

// We check here in the order of the following function to maintain parity
// Note that this will not handle EmberArray correctly.
type _TruthConvert<T> = T extends { isTruthy: true }
  ? true
  : T extends { isTruthy: false }
  ? false
  : T extends { isTruthy: boolean }
  ? boolean
  : T extends undefined | null
  ? false
  : T extends boolean
  ? T
  : T extends number
  ? T extends 0 | -0
    ? false
    : true
  : T extends bigint
  ? T extends 0n
    ? false
    : true
  : T extends string
  ? T extends ''
    ? false
    : true
  : T extends never[]
  ? false
  : T extends ArrayLike<unknown>
  ? boolean
  : T extends object
  ? true
  : boolean;
export type TruthConvert<T> = _TruthConvert<ConvertTruthyObject<T>>;

export type MaybeTruthy =
  | { isTruthy: boolean }
  | undefined
  | null
  | boolean
  | number
  | bigint
  | string
  | unknown[]
  | object;

// We also have to do individual overloads for each specific type so that we
// don't lose specificity.
export default function truthConvert<T extends true | { isTruthy: true }>(
  result: T
): true;
export default function truthConvert<T extends { isTruthy: false }>(
  result: T
): false;
export default function truthConvert<T extends undefined | null | false>(
  result: T
): false;
export default function truthConvert<T extends number>(
  result: T
): T extends 0 | -0 ? false : true;
export default function truthConvert<T extends bigint>(
  result: T
): T extends 0n ? false : true;
export default function truthConvert<T extends string>(
  result: T
): T extends '' ? false : true;
export default function truthConvert<T>(result: T): TruthConvert<T>;
export default function truthConvert(result: unknown): boolean {
  const truthy =
    result &&
    typeof result === 'object' &&
    'isTruthy' in result &&
    result.isTruthy;

  if (typeof truthy === 'boolean') {
    return truthy;
  }

  if (isArray(result)) {
    return result.length !== 0;
  } else {
    return !!result;
  }
}
