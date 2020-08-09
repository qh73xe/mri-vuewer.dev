import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MetaManager from "../views/MetaManager.vue";
import Setting from "../views/Setting.vue";
import Demo from "../views/Demo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    icon: "mdi-home",
    component: Home
  },
  {
    path: "/mata",
    name: "Meta",
    icon: "mdi-database-search",
    component: MetaManager
  },
  {
    path: "/demo",
    name: "Demo",
    icon: "mdi-code-brackets",
    component: Demo
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "mdi-cog",
    component: Setting
  },
  {
    path: "/about",
    icon: "mdi-information",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
