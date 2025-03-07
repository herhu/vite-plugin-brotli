import type { UserCompressionOptions, ViteCompressionPluginConfig } from './interface';
import type { PluginContext } from 'rollup';
declare function compression<T extends UserCompressionOptions>(opts?: ViteCompressionPluginConfig<T>): {
    name: string;
    apply: string;
    enforce: string;
    configResolved(config: any): Promise<void>;
    generateBundle: (this: PluginContext, _: any, bundles: any) => Promise<void>;
};
export { compression };
export default compression;
//# sourceMappingURL=index.d.ts.map