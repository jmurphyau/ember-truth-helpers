export function equalHelper(params) {
  let first = params[0];
  for (let i = 1; i < params.length; i++) {
    if (params[i] !== first) {
      return false;
    }
  }

  return true;
}
