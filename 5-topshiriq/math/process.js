export function getProcessInfo() {
    return {
        pid: process.pid,
        platform: process.platform,
        nodeVersion: process.version,
    };
}
