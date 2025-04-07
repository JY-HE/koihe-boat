import { createApp } from 'vue';
import App from './App.vue';
import '@koihe/boat-ui/dist/icons/iconfont.js';
import BoatUI from '@koihe/boat-ui';

const app = createApp(App);
app.use(BoatUI);
app.mount('#app');
