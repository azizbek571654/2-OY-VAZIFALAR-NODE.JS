import fs from "node:fs";

try {
    fs.writeFileSync("message.txt", "Hello World!");

    console.log("Fayl muvaffaqiyatli yozildi!");
} catch (error) {
    console.error("Xatolik yuz berdi:", error);
}
