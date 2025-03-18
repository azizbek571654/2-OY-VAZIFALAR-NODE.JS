export function filterArray(arr, condition) {
    return arr.filter(x => eval(condition.replace(/x/g, x)));
}
