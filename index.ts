import { createFilter } from '@rollup/pluginutils';
import path from 'path';
import { compress } from './src/compress';
import type { UserCompressionOptions, ViteCompressionPluginConfig } from './src/interface';
import { len, replaceFileName, stringToBytes } from './src/shared';
import { createConcurrentQueue } from './src/task';
import type { PluginContext } from 'rollup';  // ⬅️ Import PluginContext from Rollup

const MAX_CONCURRENT = Math.max(1, (require('os').cpus() || { length: 1 }).length - 1);
const VITE_COMPRESSION_PLUGIN = 'vite-plugin-brotli';

function compression<T extends UserCompressionOptions>(
  opts: ViteCompressionPluginConfig<T> = {}
) {
  const {
    include = /\.(html|xml|css|json|js|mjs|svg|yaml|yml|toml)$/,
    exclude,
    threshold = 0,
    compressionOptions,
    deleteOriginalAssets = false,
    skipIfLargerOrEqual = true
  } = opts;

  const filter = createFilter(include, exclude);
  const outputs: string[] = [];
  const queue = createConcurrentQueue(MAX_CONCURRENT);

  const generateBundle = async function (this: PluginContext, _, bundles) {  // ⬅️ Add `this: PluginContext`
    for (const fileName in bundles) {
      if (!filter(fileName)) continue;
      const bundle = bundles[fileName];
      const source = stringToBytes(bundle.type === 'asset' ? bundle.source : bundle.code);
      const size = len(source);
      if (size < threshold) continue;

      queue.enqueue(async () => {
        const name = replaceFileName(fileName, '[path][base].br');
        const compressed = await compress(source, require('zlib').brotliCompress, compressionOptions);
        if (skipIfLargerOrEqual && len(compressed) >= size) return;
        if (deleteOriginalAssets || fileName === name) {
          Reflect.deleteProperty(bundles, fileName);
        }
        this.emitFile({ type: 'asset', fileName: name, source: compressed });  // ✅ No more TypeScript error
      });
    }
    await queue.wait().catch((err) => this.error(err));  // ✅ Fix error handling
  };

  return {
    name: VITE_COMPRESSION_PLUGIN,
    apply: 'build',
    enforce: 'post',
    async configResolved(config) {
      outputs.push(path.resolve(config.root, config.build.outDir));
    },
    generateBundle,
  };
}

export { compression };
export default compression;
