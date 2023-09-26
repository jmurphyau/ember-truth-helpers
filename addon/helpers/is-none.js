import { helper } from '@ember/component/helper';
import { isNone } from '@ember/utils';

export default helper(function([obj]) {
  return isNone(obj);
});
