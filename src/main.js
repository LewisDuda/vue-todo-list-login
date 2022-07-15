import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import vue3GoogleLogin from 'vue3-google-login'

const vue3GoogleLoginOptions = {
    clientId: import.meta.env.VITE_CLIENT_ID
}

createApp(App).use(router).use(store).use(vue3GoogleLogin, vue3GoogleLoginOptions).mount('#app')
