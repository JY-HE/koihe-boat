import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
    plugins: [vue(), vueJsx()],
    optimizeDeps: {
        disabled: true, // 禁用依赖优化
    },
    test: {
        clearMocks: true, // 每次测试后清除模拟
        environment: 'happy-dom', // 使用 `happy-dom` 作为测试环境
    },
});
