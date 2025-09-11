import { isArray as isEmberArray } from '@ember/array';

export default function isArray(...params: unknown[]) {
  return params.every(isEmberArray);
}
