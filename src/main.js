import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "preline/preline";

import { db, auth } from './firebase';

export { db, auth };

// Initialize Vue app
const app = createApp(App)

app.use(router)

app.mount('#app')
