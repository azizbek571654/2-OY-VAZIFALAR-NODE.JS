export function convertToASCII(str) {
    return str.split('').map(char => char.charCodeAt(0));
}
