export type Falsy = {
    isTruthy: false;
} | undefined | null | false | 0 | -0 | 0n | '' | never[];
export type TruthConvert<T> = T extends {
    isTruthy: true;
} ? true : T extends {
    isTruthy: false;
} ? false : T extends {
    isTruthy: boolean;
} ? boolean : T extends undefined | null ? false : T extends boolean ? T : T extends number ? T extends 0 | -0 ? false : number extends T ? boolean : true : T extends bigint ? T extends 0n ? false : bigint extends T ? boolean : true : T extends string ? T extends '' ? false : string extends T ? boolean : true : T extends never[] ? false : T extends ArrayLike<unknown> ? boolean : T extends object ? true : boolean;
export type MaybeTruthy = {
    isTruthy: boolean;
} | undefined | null | boolean | number | bigint | string | unknown[] | object;
export default function truthConvert<T extends true | {
    isTruthy: true;
}>(result: T): true;
export default function truthConvert<T extends {
    isTruthy: false;
}>(result: T): false;
export default function truthConvert<T extends undefined | null | false>(result: T): false;
export default function truthConvert<T extends number>(result: T): T extends 0 | -0 ? false : true;
export default function truthConvert<T extends bigint>(result: T): T extends 0n ? false : true;
export default function truthConvert<T extends string>(result: T): T extends '' ? false : true;
export default function truthConvert<T>(result: T): TruthConvert<T>;
//# sourceMappingURL=truth-convert.d.ts.map