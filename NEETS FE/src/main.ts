import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";
import "primevue/resources/themes/saga-blue/theme.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import { createPinia } from "pinia";
/* bootstrap import */
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "primevue/resources/primevue.min.css"; //core css

/* Swiper import */
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

/* Theme variables */
import "./theme/variables.css";
import "./theme/text.css";
import "./theme/nav.css";
const pinia = createPinia();
import { globals } from "./stores/globals";
const deepGlobals = reactive(globals);
const app = createApp(App).use(IonicVue).use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.config.globalProperties.$globals = deepGlobals;
app.use(pinia);
router.isReady().then(() => {
  app.mount("#app");
});

window.baseUrl = `http://localhost:8001/api/`;
window.version = ``;
