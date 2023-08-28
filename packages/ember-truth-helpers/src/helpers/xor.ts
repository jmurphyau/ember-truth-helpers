import truthConvert from '../utils/truth-convert.ts';

export interface XorSignature {
  Args: {
    Positional: [unknown, unknown];
  };
  Return: boolean;
}

export default function xor(left: unknown, right: unknown) {
  return truthConvert(left) !== truthConvert(right);
}
