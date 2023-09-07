import OrHelper from '../../src/helpers/or';
import { MaybeTruthy } from '../../src/utils/truth-convert';

import { expectTypeOf } from 'expect-type';

function computeOr<T extends MaybeTruthy[]>(...params: T) {
  const or = new OrHelper<T>();
  return or.compute(params);
}

expectTypeOf(computeOr()).toEqualTypeOf<undefined>();

expectTypeOf(computeOr(undefined)).toEqualTypeOf<undefined>();
expectTypeOf(computeOr(null)).toEqualTypeOf<null>();
expectTypeOf(computeOr(1, false, null)).toEqualTypeOf<1>();
const stringEnum: 'foo' | 'bar' = 'foo';
expectTypeOf(computeOr(undefined, null, stringEnum)).toEqualTypeOf(stringEnum);
expectTypeOf(computeOr(1, true, [])).toEqualTypeOf<1>();
expectTypeOf(computeOr({ isTruthy: true })).toEqualTypeOf<{
  isTruthy: true;
}>();
expectTypeOf(computeOr({ isTruthy: true }, 1)).toEqualTypeOf<{
  isTruthy: true;
}>();
expectTypeOf(computeOr({ isTruthy: false }, 1)).toEqualTypeOf<1>();

const foo: { isTruthy: true } = { isTruthy: true };
expectTypeOf(computeOr(foo, 1)).toEqualTypeOf(foo);
