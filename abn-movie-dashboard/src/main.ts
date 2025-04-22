import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router';
import '@/assets/reset.css';
import 'primeicons/primeicons.css';
import '@/assets/tailwind.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue,
  {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: {
          name: 'primevue',
          order: 'app-styles, tailwind, primevue'
        }
      }
    }
  });
app.mount('#app');