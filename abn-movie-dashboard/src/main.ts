import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import router from './router';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './assets/tailwind.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.mount('#app');