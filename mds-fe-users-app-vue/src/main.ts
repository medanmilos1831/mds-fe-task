import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { apiClient } from "./plugins/apiClient";
import { modalObserver } from "./plugins/modalObserver";
import { queryParamsClient } from "./plugins/queryParamsClient";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(apiClient);
app.use(modalObserver);
app.use(queryParamsClient);
app.mount("#app");
