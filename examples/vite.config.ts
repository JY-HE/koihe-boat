import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    root: resolve(__dirname, './'), // 设置根目录为 examples
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'), // 配置组件库的别名
        },
    },
});
