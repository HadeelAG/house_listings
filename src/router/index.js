import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const HouseDetail = () => import("../views/HouseDetail.vue");
const HouseForm = () => import("../views/HouseForm.vue");
const AboutView = () => import("../views/AboutView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/houses/create",
      name: "house-create",
      component: HouseForm,
    },
    {
      path: "/houses/:id",
      name: "house-detail",
      component: HouseDetail,
    },
    {
      path: "/houses/:id/edit",
      name: "house-edit",
      component: HouseForm,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
