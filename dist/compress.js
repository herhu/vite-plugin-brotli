import zlib from 'zlib';
export async function compress(buf, algorithm, options) {
    try {
        return await algorithm(buf, options);
    }
    catch (error) {
        return Promise.reject(error);
    }
}
export const defaultCompressionOptions = {
    brotliCompress: {
        params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
        }
    }
};
