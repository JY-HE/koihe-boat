/**
 * @description 路径常量配置
 */
import { resolve } from 'path';

/**
 * @description root 路径
 */
export const ROOT = resolve(__dirname, '..', '..', '..');

/**
 * @description compiler 路径-src
 */
export const COMPILER_ROOT = resolve(ROOT, 'src');

/**
 * @description output 路径-dist
 */
export const OUTPUT = resolve(ROOT, 'dist');

/**
 * @description output esm 路径-es
 */
export const OUTPUT_ESM = resolve(ROOT, 'es');

/**
 * @description output cjs 路径-lib
 */
export const OUTPUT_CJS = resolve(ROOT, 'lib');

/**
 * @description package.json 路径
 */
export const COMPILER_PACKAGE = resolve(ROOT, 'package.json');
