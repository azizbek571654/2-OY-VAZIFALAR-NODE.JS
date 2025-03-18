const os = require("os");

const args = process.argv.slice(2); 

if (args[0] === "check-memory") {
    const freeMemoryMB = os.freemem() / (1024 * 1024); 
    console.log(`Free memory: ${Math.round(freeMemoryMB)} MB`);
} else {
    console.log("No command provided");
}
