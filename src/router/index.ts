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
      path: "/logout",
      name: "Logout",
      component: () => import("@/views/LogoutView.vue"),
    },
    {
      path: "/lager",
      name: "Lager",
      component: () => import("@/views/LagerView.vue"),
    },
    {
      path: "/artiklar",
      name: "Artiklar",
      component: () => import("@/views/ArtiklarView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  document.title = `Matsmart | ${to.name as string}`;
});

export default router;
