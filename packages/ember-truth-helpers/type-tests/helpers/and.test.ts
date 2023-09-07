import AndHelper from '../../src/helpers/and';
import { MaybeTruthy } from '../../src/utils/truth-convert';

import { expectTypeOf } from 'expect-type';

function computeAnd<T extends MaybeTruthy[]>(...params: T) {
  const and = new AndHelper<T>();
  return and.compute(params);
}

expectTypeOf(computeAnd()).toEqualTypeOf<undefined>();

expectTypeOf(computeAnd(undefined)).toEqualTypeOf<undefined>();
expectTypeOf(computeAnd(null)).toEqualTypeOf<null>();
expectTypeOf(computeAnd(1, false, null)).toEqualTypeOf<false>();
const stringEnum: 'foo' | 'bar' = 'foo';
expectTypeOf(
  computeAnd(undefined, null, stringEnum)
).toEqualTypeOf<undefined>();
expectTypeOf(computeAnd(stringEnum, stringEnum)).toEqualTypeOf(stringEnum);
expectTypeOf(computeAnd(1, true, [])).toEqualTypeOf<never[]>();
expectTypeOf(computeAnd({ isTruthy: true })).toEqualTypeOf<{
  isTruthy: true;
}>();
expectTypeOf(computeAnd({ isTruthy: true }, 1)).toEqualTypeOf<1>();
expectTypeOf(computeAnd({ isTruthy: false }, 1)).toEqualTypeOf<{
  isTruthy: false;
}>();

const foo: { isTruthy: true } = { isTruthy: true };
expectTypeOf(computeAnd(foo, 1)).toEqualTypeOf<1>();

expectTypeOf(computeAnd({}, [])).toEqualTypeOf<never[]>();
