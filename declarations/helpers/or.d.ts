import { Falsy, MaybeTruthy, TruthConvert } from '../utils/truth-convert.ts';
import Helper from '@ember/component/helper';
type FirstTruthy<T> = T extends [infer Item] ? Item : T extends [infer Head, ...infer Tail] ? TruthConvert<Head> extends true ? Head : TruthConvert<Head> extends false ? FirstTruthy<Tail> : Exclude<Head, Falsy> | FirstTruthy<Tail> : undefined;
interface OrSignature<T extends MaybeTruthy[]> {
    Args: {
        Positional: T;
    };
    Return: FirstTruthy<T>;
}
export default class OrHelper<T extends MaybeTruthy[]> extends Helper<OrSignature<T>> {
    compute(params: T): FirstTruthy<T>;
}
export {};
//# sourceMappingURL=or.d.ts.map