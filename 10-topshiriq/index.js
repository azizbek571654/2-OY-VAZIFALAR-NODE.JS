import fs from "node:fs";

fs.readdir("10-topshiriq", (err, files) => {
    if (err) {
        console.error("Xatolik yuz berdi:", err);
    } else {
        console.log("10-topshiriq papkasi ichidagi fayllar:", files);
    }
});
