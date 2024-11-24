import { createApp } from 'vue'
import App from './App.vue'
import router from './util/router'
import "./public/common.css"

createApp(App).use(router).mount('#app')
