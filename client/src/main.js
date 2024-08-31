import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CkeditorPlugin)

app.mount('#app')