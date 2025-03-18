import process from 'process';
import { objectToArray, arrayToObject, stringToBoolean } from './converters/index.js';

const [operation, value] = process.argv.slice(2);

try {
    let parsedValue;

    // Agar "value" JSON bo'lsa, uni parse qilamiz
    if (value.startsWith('{') || value.startsWith('[')) {
        parsedValue = JSON.parse(value);
    } else {
        parsedValue = value; // String yoki oddiy qiymat
    }

    let result;

    switch (operation) {
        case "Object":
            result = objectToArray(parsedValue);
            break;
        case "Array":
            result = arrayToObject(parsedValue);
            break;
        case "String":
        case "Boolean":
            result = stringToBoolean(parsedValue);
            break;
        default:
            throw new Error("Noto‘g‘ri buyruq! Faqat Object, Array, String, Boolean ni ishlating.");
    }

    console.log("Natija:", result);
} catch (error) {
    console.error("Xatolik:", error.message);
}
