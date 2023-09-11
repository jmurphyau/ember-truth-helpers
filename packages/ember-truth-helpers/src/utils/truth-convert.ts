import { isArray } from '@ember/array';

export type Falsy =
  | { isTruthy: false }
  | undefined
  | null
  | false
  | 0
  | -0
  | 0n
  | ''
  | never[];

type ConvertTruthyObject<T> = T extends { isTruthy: infer U } ? U : T;

// We check here in the order of the following function to maintain parity
// Note that this will not handle EmberArray correctly.
// We don't use Falsy since we want to be able to more definitively determine
// truthy results.
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
  if (
    typeof result === 'object' &&
    result &&
    'isTruthy' in result &&
    typeof result.isTruthy === 'boolean'
  ) {
    return result.isTruthy;
  }

  if (isArray(result)) {
    return result.length !== 0;
  } else {
    return !!result;
  }
}
