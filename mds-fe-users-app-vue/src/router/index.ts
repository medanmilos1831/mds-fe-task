import { createRouter, createWebHistory } from "vue-router";
import UsersPage from "@/pages/UsersPage/UsersPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: UsersPage,
    },
  ],
});

export default router;
