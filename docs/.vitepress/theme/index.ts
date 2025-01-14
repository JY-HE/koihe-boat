import DefaultTheme from 'vitepress/theme';
import BoatUI from '@koihe/boat-ui';
import '@koihe/boat-ui/dist/index.css';
import './custom.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from createApp()
        // router is VitePress' custom router (see `lib/app/router.js`)
        // siteData is a ref of current site-level metadata.
        app.use(BoatUI);
    },
};
