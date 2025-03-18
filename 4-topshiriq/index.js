import os, { hostname, userInfo } from "node:os"
// const os = require("node:os");

console.log(`Hostname: ${hostname()} \nUsername: ${userInfo().username}`);
