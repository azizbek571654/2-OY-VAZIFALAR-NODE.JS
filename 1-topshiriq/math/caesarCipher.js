export class CaesarCipher {
    constructor(shift) {
        this.shift = shift % 26; // 26 dan katta bo‘lsa, aylantirib qo‘yish
    }

    encode(text) {
        return text.replace(/[A-Z]/gi, (char) => this.shiftChar(char, this.shift));
    }

    decode(text) {
        return text.replace(/[A-Z]/gi, (char) => this.shiftChar(char, -this.shift));
    }

    shiftChar(char, shift) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);
    }
}
