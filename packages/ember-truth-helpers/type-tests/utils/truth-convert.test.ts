import truthConvert from '../../src/utils/truth-convert';
import type { TruthConvert } from '../../src/utils/truth-convert';
import { expectTypeOf } from 'expect-type';

expectTypeOf<TruthConvert<null>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<undefined>>().toEqualTypeOf<false>();

expectTypeOf<TruthConvert<true>>().toEqualTypeOf<true>();
expectTypeOf<TruthConvert<false>>().toEqualTypeOf<false>();

expectTypeOf<TruthConvert<0>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<-0>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<0n>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<1>>().toEqualTypeOf<true>();

expectTypeOf<TruthConvert<''>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<'A String'>>().toEqualTypeOf<true>();

expectTypeOf<TruthConvert<{ foo: 1; isTruthy: true }>>().toEqualTypeOf<true>();
expectTypeOf<
  TruthConvert<{ foo: 1; isTruthy: false }>
>().toEqualTypeOf<false>();
// isTruthy isn't a boolean but we still have a real object so it's truthy
expectTypeOf<TruthConvert<{ foo: 1; isTruthy: 1 }>>().toEqualTypeOf<true>();

expectTypeOf<TruthConvert<never[]>>().toEqualTypeOf<false>();
expectTypeOf<TruthConvert<string[]>>().toEqualTypeOf<boolean>();

expectTypeOf<
  TruthConvert<never[] & { isTruthy: true }>
>().toEqualTypeOf<true>();

expectTypeOf(truthConvert(null)).toEqualTypeOf<false>();
expectTypeOf(truthConvert(undefined)).toEqualTypeOf<false>();

expectTypeOf(truthConvert(true)).toEqualTypeOf<true>();
expectTypeOf(truthConvert(false)).toEqualTypeOf<false>();

expectTypeOf(truthConvert(0)).toEqualTypeOf<false>();
expectTypeOf(truthConvert(-0)).toEqualTypeOf<false>();
expectTypeOf(truthConvert(0n)).toEqualTypeOf<false>();
// We can't enumerate every number
expectTypeOf(truthConvert(1)).toEqualTypeOf<true>();

expectTypeOf(truthConvert('' as const)).toEqualTypeOf<false>();
// We can't enumerate every string
expectTypeOf(truthConvert('A String')).toEqualTypeOf<true>();

expectTypeOf(truthConvert({ foo: 1, isTruthy: true })).toEqualTypeOf<true>();
expectTypeOf(truthConvert({ foo: 1, isTruthy: false })).toEqualTypeOf<false>();
// isTruthy isn't a boolean but we still have a real object so it's truthy
expectTypeOf(truthConvert({ foo: 1, isTruthy: 1 })).toEqualTypeOf<true>();

const neverArray: never[] = [];
expectTypeOf(truthConvert(neverArray)).toEqualTypeOf<false>();
// We don't know that it's empty
const emptyStringArray: string[] = [];
expectTypeOf(truthConvert(emptyStringArray)).toEqualTypeOf<boolean>();

const neverArrayWithTruthy = [] as never[] & { isTruthy: true };
neverArrayWithTruthy.isTruthy = true;
expectTypeOf(truthConvert(neverArrayWithTruthy)).toEqualTypeOf<true>();
