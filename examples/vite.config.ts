import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { BoatUIResolver } from '@koihe/boat-ui/lib/resolver';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [BoatUIResolver()], // 配置自动导入解析器,不需要再全局注册引入
            dts: 'src/components.d.ts',
        }),
    ],
    root: resolve(__dirname, './'), // 设置根目录为 examples
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
