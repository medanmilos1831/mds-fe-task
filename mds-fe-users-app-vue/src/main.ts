import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { apiClient } from "./plugins/apiClient";
import { modalObserver } from "./plugins/modalObserver";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(apiClient);
app.use(modalObserver);
app.mount("#app");
