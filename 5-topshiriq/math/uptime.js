import os from "os";

export function getUptime() {
    return `${Math.floor(os.uptime() / 60)} minutes`;
}
