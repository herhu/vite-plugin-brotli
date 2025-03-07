import util from 'util';
import zlib from 'zlib';
import type { BrotliOptions, InputType } from 'zlib';
import type { AlgorithmFunction, UserCompressionOptions } from './interface';

export async function compress<T extends UserCompressionOptions | undefined>(
  buf: InputType,
  algorithm: AlgorithmFunction<T>,
  options: T
) {
  try {
    return await algorithm(buf, options);
  } catch (error) {
    return Promise.reject(error as Error);
  }
}

export const defaultCompressionOptions: { brotliCompress: BrotliOptions } = {
  brotliCompress: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
    }
  }
};
