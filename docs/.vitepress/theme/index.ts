import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BoatUI from '@koihe/boat-ui';
import '@koihe/boat-ui/dist/index.css';
import './custom.css';

export default {
    ...DefaultTheme,
    async enhanceApp({ app }) {
        if (!import.meta.env.SSR) {
            await import('@koihe/boat-ui/dist/iconfont.js');
        }
        app.use(BoatUI);
    },
} satisfies Theme;
