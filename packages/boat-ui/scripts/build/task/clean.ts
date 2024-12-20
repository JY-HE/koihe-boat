import fs from 'fs-extra';
import { OUTPUT, OUTPUT_ESM, OUTPUT_CJS } from '../utils/paths';

/**
 * @description 清空输出目录
 */
export const clean = async () => {
    await Promise.all([fs.remove(OUTPUT), fs.remove(OUTPUT_ESM), fs.remove(OUTPUT_CJS)]);
};
