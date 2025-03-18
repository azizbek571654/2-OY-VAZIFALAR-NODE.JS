import fs from "node:fs";

const fileName = process.argv[2]; 

if (!fileName) {
    console.log("aka fayil nomini kiriting");
    process.exit(1); 
}

fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
        console.log(`"${fileName}" bunaqa nomdagi fayil yoq`);
        return;
    }
    console.log(`Fayilga yozildi:\n${data}`);
});
