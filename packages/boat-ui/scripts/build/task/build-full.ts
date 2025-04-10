import path from 'path';
import { rollup } from 'rollup';
import { dest, src } from 'gulp';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDefineOptions from 'unplugin-vue-define-options/rollup';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { COMPILER_ROOT, OUTPUT } from '../utils/paths';
import { target, generateExternal } from '../utils/rollup';
import { PKG_CAMELCASE_NAME } from '../utils/constants';

/**
 * @description 复制 iconfont.js 文件
 */
const buildIconfontCopy = async () => {
    await new Promise(resolve => {
        src(`${COMPILER_ROOT}/assets/icons/iconfont.js`)
            .pipe(dest(`${OUTPUT}`))
            .on('end', resolve);
    });
};

/**
 * @description 全量打包
 */
const build = async (minify: boolean = false) => {
    const input = [
        // root
        path.resolve(COMPILER_ROOT, 'index.ts'),
    ];
    // 编译解析
    const bundle = await rollup({
        input,
        plugins: [
            vueDefineOptions(),
            vue(),
            vueJsx(),
            nodeResolve(),
            esbuild({
                target,
                sourceMap: minify,
                treeShaking: true,
            }),
            minify // 生成的是否是压缩版本
                ? minifyPlugin({
                      target,
                      sourceMap: minify,
                  })
                : null,
        ],
        treeshake: true,
        external: generateExternal({ full: false }), // 外部模块，只提取前置依赖为外部模块
    });

    await Promise.all([
        bundle.write({
            format: 'esm',
            file: path.resolve(OUTPUT, `index${minify ? '.min' : ''}.mjs`),
            exports: undefined,
            sourcemap: minify,
        }),
        bundle.write({
            format: 'umd',
            file: path.resolve(OUTPUT, `index${minify ? '.min' : ''}.js`),
            exports: 'named',
            sourcemap: minify,
            name: PKG_CAMELCASE_NAME, // 组件全局名称
            globals: {
                // 外部模块的全局名称
                vue: 'Vue',
            },
        }),
        buildIconfontCopy(),
    ]);
};

/**
 * @description 编译 /utils/resolver/index.ts 文件到 dist 目录
 */
const buildResolver = async () => {
    const input = path.resolve(`${COMPILER_ROOT}/utils/resolver`, 'index.ts');

    const bundle = await rollup({
        input,
        plugins: [
            esbuild({
                target: 'esnext',
                sourceMap: true,
            }),
        ],
        external: [/./], // 保持外部依赖为外部
        treeshake: false,
    });

    await Promise.all([
        bundle.write({
            format: 'esm',
            file: path.resolve(OUTPUT, 'resolver.mjs'),
            sourcemap: true,
        }),
        bundle.write({
            format: 'cjs',
            file: path.resolve(OUTPUT, 'resolver.js'),
            sourcemap: true,
        }),
    ]);
};

// 合并为一个主任务
export const buildFull = async () => {
    await Promise.all([build(false), build(true), buildResolver()]);
};
