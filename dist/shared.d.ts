export declare function len<T extends ArrayLike<unknown>>(source: T): number;
export declare function replaceFileName(staticPath: string, rule: string | ((id: string) => string)): string;
export declare function slash(path: string): string;
export declare function readAll(entry: string): Promise<string[]>;
export declare function stringToBytes(b: string | Uint8Array): Uint8Array<ArrayBufferLike>;
//# sourceMappingURL=shared.d.ts.map