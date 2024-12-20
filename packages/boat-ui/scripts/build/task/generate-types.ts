import { execa } from 'execa';
import { src, dest } from 'gulp';
import { ROOT, OUTPUT_ESM, OUTPUT_CJS } from '../utils/paths';

/**
 * @description 生成类型声明文件
 */
export const generateTypes = async () => {
    await execa('vue-tsc', ['-p', 'tsconfig.declaration.json'], {
        cwd: ROOT,
    });

    return src(`${OUTPUT_ESM}/**/*.d.ts`).pipe(dest(`${OUTPUT_CJS}`));
};
