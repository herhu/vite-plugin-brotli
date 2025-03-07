import fsp from 'fs/promises';
import path from 'path';

export function len<T extends ArrayLike<unknown>>(source: T) {
  return source.length;
}

export function replaceFileName(staticPath: string, rule: string | ((id: string) => string)) {
  const template = typeof rule === 'function' ? rule(staticPath) : rule;
  const { dir, base } = path.parse(staticPath);
  return template.replace(/\[path\]/, dir ? dir + '/' : '').replace(/\[base\]/, base);
}

export function slash(path: string) {
  return path.replace(/\\/g, '/');
}

export async function readAll(entry: string) {
  const paths = await Promise.all((await fsp.readdir(entry)).map((dir) => path.join(entry, dir)));
  let pos = 0;
  const result: string[] = [];
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

export function stringToBytes(b: string | Uint8Array) {
  return typeof b === 'string' ? encoder.encode(b) : b;
}
