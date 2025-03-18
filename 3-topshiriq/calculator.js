const args = process.argv.slice(2);

const num1 = parseFloat(args[0]); 
const operator = args[1]; 
const num2 = parseFloat(args[2]); 

if (isNaN(num1) || isNaN(num2)) {
    console.log("❌ Xato: Ikkala qiymat ham son bo‘lishi kerak!");
    process.exit(1); 
}

let result;
switch (operator) {
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "*":
        result = num1 * num2;
        break;
    case "/":
        result = num1 / num2;
        break;
    default:
        console.log("❌ Xato: Faqat +, -, *, / amallaridan foydalaning!");
        process.exit(1);
}

console.log(`Natija: ${num1} ${operator} ${num2} = ${result}`);
