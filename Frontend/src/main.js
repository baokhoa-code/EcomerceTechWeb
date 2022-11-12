import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.vue';
import router from './router';
import store from './store'

const main = createApp(App).use(store).use(router).mount('#app');
 
export default main;