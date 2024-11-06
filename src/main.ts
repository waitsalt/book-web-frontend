import { createApp } from 'vue';
import App from './App.vue';
import Router from './lib/Router';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(Router).use(pinia).mount('#app');
