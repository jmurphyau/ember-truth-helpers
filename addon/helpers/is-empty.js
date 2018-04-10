import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default helper(function([obj]) {
  return isEmpty(obj)
})
