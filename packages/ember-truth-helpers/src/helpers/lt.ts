import { helper } from '@ember/component/helper';

export interface LtSignature {
  Args: {
    Positional: [number, number];
    Named: {
      forceNumber: boolean;
    };
  };
  Return: boolean;
}

export default helper<LtSignature>(([left, right], options) => {
  if (options.forceNumber) {
    if (typeof left !== 'number') {
      left = Number(left);
    }
    if (typeof right !== 'number') {
      right = Number(right);
    }
  }
  return left < right;
});
