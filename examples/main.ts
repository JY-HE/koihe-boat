import { createApp } from 'vue';
import App from './App.vue';
import '@koihe/boat-ui/styles/index.css';
// import BoatUI from '@koihe/boat-ui';

import { testFun } from '@koihe/boat-utils';

const app = createApp(App);
console.log('🚀 ~ main.ts:9 ~ app:', testFun(1, 23));

// app.use(BoatUI).mount('#app');
app.mount('#app');
