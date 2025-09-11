import Helper from '@ember/component/helper';
import { MaybeTruthy, TruthConvert } from '../utils/truth-convert.ts';
type FirstFalsy<T> = T extends [infer Item] ? Item : T extends [infer Head, ...infer Tail] ? TruthConvert<Head> extends false ? Head : TruthConvert<Head> extends true ? FirstFalsy<Tail> : Head | FirstFalsy<Tail> : undefined;
interface AndSignature<T extends MaybeTruthy[]> {
    Args: {
        Positional: T;
    };
    Return: FirstFalsy<T>;
}
export default class AndHelper<const T extends MaybeTruthy[]> extends Helper<AndSignature<T>> {
    compute(params: T): FirstFalsy<T>;
}
export {};
//# sourceMappingURL=and.d.ts.map