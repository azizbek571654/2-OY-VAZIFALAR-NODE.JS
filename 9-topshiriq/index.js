import fs from "node:fs";


fs.appendFile("message.txt", "This is appended content.\n", (err) => {
    if (err) {
        console.error("Xatolik yuz berdi:", err);
    } else {
        console.log(`xabar fayilga yozildi`);
    }
});

