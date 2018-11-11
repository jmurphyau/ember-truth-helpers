import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export default helper(function([obj]) {
  return isPresent(obj)
})
