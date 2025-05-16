import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
const pinia = createPinia();
const app = createApp(App);
app.use(pinia)
app.use(router); // Use the router
app.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');
