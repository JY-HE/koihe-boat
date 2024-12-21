import { createApp } from 'vue';
import App from './App.vue';
import '@koihe/boat-ui/dist/index.css';
import BoatUI from '@koihe/boat-ui';

const app = createApp(App);

app.use(BoatUI).mount('#app');
// app.mount('#app');
