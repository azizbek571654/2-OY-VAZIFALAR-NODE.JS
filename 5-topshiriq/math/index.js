import { getFreeMemory } from "./memory.js";
import { getProcessInfo } from "./process.js";
import { getUptime } from "./uptime.js";

export function getSystemInfo() {
    return {
        "Free Memory": getFreeMemory(),
        "Process Info": getProcessInfo(),
        "System Uptime": getUptime(),
    };
}
