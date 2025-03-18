import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, "docs");
const filePath = path.join(docsDir, "readme.md"); 
console.log("readme.md fayli joylashuvi:", filePath);

if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir); 
    console.log('"docs" katalogi yaratildi.');
}

fs.writeFileSync(filePath, "bormi og'riq");
console.log('"readme.md" fayli yaratildi.');
