export function equalHelper(params) {
    let len = params.length;
    let ret = true;
    if (len && len > 0) {
        for (var i = 0; i < len-1; i++) {
            ret = (ret && (params[i] === params[i+1]));
        }
    } else {
        ret = false;
    }

    return ret;
}
