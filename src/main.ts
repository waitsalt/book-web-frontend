import { createApp } from 'vue'
import App from './App.vue'
import router from './util/router'
import "./public/common.css"
import pinia from './store'

createApp(App).use(pinia).use(router).mount('#app')
