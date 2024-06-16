import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores";
import VueClickAway from "vue3-click-away";
import piniaPersist from "pinia-plugin-persist";
import { defineRule, configure } from "vee-validate";
import { setupCalendar } from "v-calendar";
import api from "@/helpers/api.js";

import "./style.css";
import App from "./App.vue";
// import router from './router/index'
import { router } from "@/helpers";

// const app=createApp(App)
// app.use(router)
// app.use(store)
// app.use(router)
// app.component("AppHeader",AppHeader)
// app.config.globalProperties.$axios=axios
// app.mount('#app')

// createApp(App).mount('#app')

// defineRule('required', required);
// defineRule('email', email);
// defineRule('confirmed', confirmed);

startApp();

// async start function to enable waiting for refresh token call
async function startApp() {
  const app = createApp(App);
  const head = createApp();
  // app.provide('$api', api);

  // console.log("main.jsdeki api",api)
  app.use(head);
  app.provide("$api", api);
  app.provide("elcin", "maestro");
  const pinia = createPinia();
  pinia.use(piniaPersist);

  app.use(pinia);

  app.use(router);
  app.use(VueClickAway);
  app.use(setupCalendar, {});

  // app.config.globalProperties.$api = api;

  configure({
    validateOnInput: true,
    validateOnBlur: true,
  });
  // app.use(setupInterceptors);

  // attempt to auto refresh token before startup
  try {
    const authStore = useAuthStore();
    await authStore.refreshToken();
  } catch {
    console.log("error for refresh token main.js");
    // catch error to start app on success or failure
  }

  app.mount("#app");
}
