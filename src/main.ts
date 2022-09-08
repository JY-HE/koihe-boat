import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ZigbeeUI from '../packages/index';

const app = createApp(App);

app.use(ZigbeeUI).mount('#app');
