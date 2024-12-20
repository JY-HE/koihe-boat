import { dest, src } from 'gulp';
import path from 'path';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import glob from 'fast-glob';
import { COMPILER_ROOT, OUTPUT, OUTPUT_ESM, OUTPUT_CJS } from '../utils/paths';
import { generatePaths } from '../utils/rollup';

/**
 * @description 复制 scss([src/*.scss] to [es/*.scss, lib/*.scss])。
 * @description 目的: 提供原始 scss 文件
 */
const buildScssCopy = async () => {
    await new Promise(resolve => {
        src(`${COMPILER_ROOT}/**/*.scss`)
            .pipe(dest(OUTPUT_ESM))
            .pipe(dest(OUTPUT_CJS))
            .on('end', resolve); // 监听流完成
    });
};

/**
 * @description 编译 scss([src/**\/style/*.scss] to [es/**\/style/*.css, lib/**\/style/*.css])
 * @description 目的: 提供 css 文件, 可单独引入
 */
const buildScssModules = async () => {
    const sass = gulpSass(dartSass);
    await new Promise(resolve => {
        src(`${COMPILER_ROOT}/**/style/*.scss`)
            .pipe(sass.sync()) // 编译
            .pipe(autoprefixer({ cascade: false })) // 兼容
            .pipe(cleanCSS()) // 压缩
            .pipe(dest(OUTPUT_ESM))
            .pipe(dest(OUTPUT_CJS))
            .on('end', resolve);
    });
};

/**
 * @description 编译 scss([src/*.scss] to [dist/*.css])
 * @description 目的: 提供全量的 css 文件，为了提供给不需要按需引入和浏览器端直接引入使用
 */
const buildScssFull = async () => {
    const sass = gulpSass(dartSass);
    await new Promise(resolve => {
        src(`${COMPILER_ROOT}/*.scss`)
            .pipe(sass.sync())
            .pipe(autoprefixer({ cascade: false }))
            .pipe(cleanCSS())
            .pipe(dest(OUTPUT))
            .on('end', resolve);
    });
};

/**
 * @description 编译 style([src/**\/style/*.ts] to [es/**\/style/*.js, lib/**\/style/*.js])
 */
const buildStyleModules = async () => {
    const input = [
        // style
        ...(await glob('**/style/*.ts', {
            cwd: COMPILER_ROOT,
            absolute: true,
            onlyFiles: true,
        })),
        // resolver
        path.resolve(COMPILER_ROOT, 'resolver.ts'),
    ];

    const bundle = await rollup({
        input,
        plugins: [
            esbuild({
                sourceMap: true,
            }),
        ],
        external: [/./],
        treeshake: false,
    });

    await Promise.all([
        bundle.write({
            format: 'esm',
            dir: OUTPUT_ESM,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            entryFileNames: `[name].mjs`,
        }),
        bundle.write({
            format: 'cjs',
            dir: OUTPUT_CJS,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            entryFileNames: `[name].js`,
            paths: generatePaths(),
        }),
    ]);
};

/**
 * @description 编译 scss 主任务
 */
export const buildStyle = async () => {
    await Promise.all([buildScssCopy(), buildScssModules(), buildScssFull(), buildStyleModules()]);
};
