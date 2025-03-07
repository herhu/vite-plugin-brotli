import type { BrotliOptions, InputType } from 'zlib';
import type { AlgorithmFunction, UserCompressionOptions } from './interface';
export declare function compress<T extends UserCompressionOptions | undefined>(buf: InputType, algorithm: AlgorithmFunction<T>, options: T): Promise<Buffer<ArrayBufferLike>>;
export declare const defaultCompressionOptions: {
    brotliCompress: BrotliOptions;
};
//# sourceMappingURL=compress.d.ts.map