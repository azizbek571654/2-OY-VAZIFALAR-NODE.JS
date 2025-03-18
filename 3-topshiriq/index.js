import { readFile } from "node:fs";
const fileName = "./my_nodejs_files/hello_world.txt";


readFile(fileName, "utf-8", (err, data) => {
    if (err) {
        console.error("Xatolik yuz berdi:", err);
    } else {
        console.log(data);
    }
});