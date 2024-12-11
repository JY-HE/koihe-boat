import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        target: 'modules', // 编译目标
        minify: true, // 开启压缩
        lib: {
            entry: resolve(__dirname, 'index.ts'), // 库入口文件
            name: 'boat-utils', // 库名称
        },
        rollupOptions: {
            output: [
                {
                    format: 'es', // ES模块格式
                    entryFileNames: '[name].js',
                    preserveModules: true, // 保持模块结构
                    dir: resolve(__dirname, './dist/es'),
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: resolve(__dirname, './dist/lib'),
                },
            ],
        },
    },
    plugins: [
        dts({
            outDir: [resolve(__dirname, 'dist/es'), resolve(__dirname, 'dist/lib')],
            tsconfigPath: resolve(__dirname, 'tsconfig.json'), // 指定tsconfig
            entryRoot: resolve(__dirname, '.'), // 类型文件根目录
        }),
    ],
});
