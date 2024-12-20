import path from 'path';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDefineOptions from 'unplugin-vue-define-options/rollup';
import esbuild from 'rollup-plugin-esbuild';
import { COMPILER_ROOT, OUTPUT_ESM, OUTPUT_CJS } from '../utils/paths';
import { target, generateExternal, generatePaths } from '../utils/rollup';

/**
 * @description 任务处理模块组件打包任务，分别输出 esm 和 cjs 格式
 */
export const buildModules = async () => {
    // 入口
    const input = [path.resolve(COMPILER_ROOT, 'index.ts')];

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
                sourceMap: true,
            }),
        ],
        treeshake: false,
        external: generateExternal({ full: true }), // 外部模块，所有依赖都设置为外部模块
    });

    // 输出文件
    await Promise.all([
        bundle.write({
            format: 'esm', // 模块格式
            dir: OUTPUT_ESM, // 输出目录
            exports: undefined, // 导出模式
            preserveModules: true, // 与原始模块创建相同的文件
            preserveModulesRoot: 'src',
            sourcemap: true, // 生成 sourcemap
            entryFileNames: `[name].mjs`, // 生成文件名
        }),
        bundle.write({
            format: 'cjs',
            dir: OUTPUT_CJS,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            entryFileNames: `[name].js`,
            paths: generatePaths(), // 处理外部模块的路径
        }),
    ]);
};
