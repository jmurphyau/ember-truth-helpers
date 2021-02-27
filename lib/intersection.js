/* eslint-env node */
/**
 * Finds the intersection between 2 arrays.
 *
 * var a = [1, 2, 3];
 * var b = [3, 4, 5];
 * intersection(a, b) === [3];
 * intersection(b, a) === [3];
 *
 * @public
 * @param  {Array} a
 * @param  {Array} b
 * @return {Array}
 */
module.exports = function intersection(a, b) {
  var arrays = [a, b];

  return arrays.pop().filter(function(candidate) {
    for (var i = 0; i < arrays.length; i++) {
      var found = false;
      var array = arrays[i];
      for (var j = 0; j < array.length; j++) {
        if (array[j] === candidate) {
          found = true;
          break;
        }
      }

      if (found === false) {
        return false;
      }
    }

    return true;
  });
};
