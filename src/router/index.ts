import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/lager",
      name: "Lager",
      component: () => import("@/views/LagerView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  document.title = `Matsmart | ${to.name as string}`;
});

export default router;
