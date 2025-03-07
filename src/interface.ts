import type { FilterPattern } from '@rollup/pluginutils';
import type { BrotliOptions, InputType } from 'zlib';

export type Algorithm = 'brotliCompress';

export interface UserCompressionOptions {
  [key: string]: any;
}

export type AlgorithmFunction<T extends UserCompressionOptions> = (buf: InputType, options: T) => Promise<Buffer>;

interface BaseCompressionPluginOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  threshold?: number;
  deleteOriginalAssets?: boolean;
  skipIfLargerOrEqual?: boolean;
}

export interface ViteCompressionPluginConfig<T extends UserCompressionOptions> extends BaseCompressionPluginOptions {
  compressionOptions?: BrotliOptions;
}
