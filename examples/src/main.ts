import { createApp } from 'vue';
import App from './App.vue';
import BoatUI from '@koihe/boat-ui';
import '@koihe/boat-ui/dist/index.css';
import '@koihe/boat-ui/dist/iconfont.js';

const app = createApp(App);
app.use(BoatUI);
app.mount('#app');
