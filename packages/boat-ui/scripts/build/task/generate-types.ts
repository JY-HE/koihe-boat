import { execa } from 'execa';
import rename from 'gulp-rename';
import { src, dest } from 'gulp';
import { ROOT, OUTPUT_ESM, OUTPUT_CJS, OUTPUT } from '../utils/paths';

/**
 * @description 生成类型声明文件
 */
const generateTypes = async () => {
    await execa('vue-tsc', ['-p', 'tsconfig.declaration.json'], {
        cwd: ROOT,
    });

    return src(`${OUTPUT_ESM}/**/*.d.ts`).pipe(dest(`${OUTPUT_CJS}`));
};

/**
 * @description 复制 utils/resolver/index.d.ts 到 dist 目录
 */
const resolverTypeFileCopy = async () => {
    await new Promise(resolve => {
        src(`${OUTPUT_ESM}/utils/resolver/index.d.ts`)
            .pipe(rename('resolver.d.ts'))
            .pipe(dest(`${OUTPUT}`))
            .on('end', resolve);
    });
};

/**
 * @description 复制 index.d.ts 到 dist 目录
 */
const indexTypeFileCopy = async () => {
    await new Promise(resolve => {
        src(`${OUTPUT_ESM}/index.d.ts`)
            .pipe(dest(`${OUTPUT}`))
            .on('end', resolve);
    });
};

export const generateTypesTask = async () => {
    await generateTypes();
    await resolverTypeFileCopy();
    await indexTypeFileCopy();
};
