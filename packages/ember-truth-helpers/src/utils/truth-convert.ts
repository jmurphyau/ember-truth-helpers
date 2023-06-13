import { isArray } from '@ember/array';
import type EmberArray from '@ember/array';

interface TruthyObject {
  isTruthy: boolean;
}

export type MaybeTruth = TruthyObject | EmberArray<unknown> | unknown;

export default function truthConvert(result: MaybeTruth): boolean {
  const truthy = result && (result as TruthyObject).isTruthy;
  if (typeof truthy === 'boolean') {
    return truthy;
  }

  if (isArray(result)) {
    return result.length !== 0;
  } else {
    return !!result;
  }
}
