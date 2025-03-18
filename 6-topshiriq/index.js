import EventEmitter from "node:events";
import readline from "node:readline";

// 1. Hodisalarni boshqarish uchun EventEmitter yaratamiz
const emitter = new EventEmitter();

// 2. Readline interfeysini yaratamiz (kiritilgan ma'lumotlarni olish uchun)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 3. Hodisani tinglovchi (listener) yaratamiz
emitter.on("dataReceived", (data) => {
    console.log(`Yangi ma'lumot: ${data}`);
});

// 4. Foydalanuvchi matn kiritganda, "dataReceived" hodisasi ishga tushadi
rl.on("line", (input) => {
    emitter.emit("dataReceived", input);
});
