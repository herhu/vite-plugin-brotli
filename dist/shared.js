import fsp from 'fs/promises';
import path from 'path';
export function len(source) {
    return source.length;
}
export function replaceFileName(staticPath, rule) {
    const template = typeof rule === 'function' ? rule(staticPath) : rule;
    const { dir, base } = path.parse(staticPath);
    return template.replace(/\[path\]/, dir ? dir + '/' : '').replace(/\[base\]/, base);
}
export function slash(path) {
    return path.replace(/\\/g, '/');
}
export async function readAll(entry) {
    const paths = await Promise.all((await fsp.readdir(entry)).map((dir) => path.join(entry, dir)));
    let pos = 0;
    const result = [];
    while (pos !== len(paths)) {
        const dir = paths[pos];
        const stat = await fsp.stat(dir);
        if (stat.isDirectory()) {
            paths.push(...(await fsp.readdir(dir)).map((sub) => path.join(dir, sub)));
        }
        if (stat.isFile()) {
            result.push(dir);
        }
        pos++;
    }
    return result;
}
const encoder = new TextEncoder();
export function stringToBytes(b) {
    return typeof b === 'string' ? encoder.encode(b) : b;
}
