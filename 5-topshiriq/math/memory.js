import os from "os";

export function getFreeMemory() {
    return `${Math.round(os.freemem() / (1024 * 1024))} MB`;
}
