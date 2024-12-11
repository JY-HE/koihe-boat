import vue from '@vitejs/plugin-vue';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import path from 'path';

export default {
    input: 'src/index.ts', // 入口文件
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm', // ES模块格式
            sourcemap: true, // 生成 source map
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs', // CommonJS格式
            sourcemap: true,
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd', // UMD格式
            name: 'MyUILibrary', // UMD格式需要定义全局变量名
            sourcemap: true,
        },
    ],
    plugins: [
        vue(), // Vue 插件，处理 Vue 单文件组件
        typescript({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'), // 使用 TypeScript 配置
        }),
        scss({
            output: 'dist/index.css', // 将 SCSS 转为 CSS
        }),
    ],
    external: ['vue'], // 避免将 Vue 打包进库，Vue 应作为外部依赖
};
