import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/info",
    name: "info",
    component: () => import(/* webpackChunkName: "info" */ "../views/info.vue")
  },
  {
    path: "/check",
    name: "check",
    component: () =>
      import(/* webpackChunkName: "check" */ "../views/check.vue")
  },
  {
    path: "/combo1",
    name: "combo1",
    component: () =>
      import(/* webpackChunkName: "combo1" */ "../views/combo1.vue")
  },
  {
    path: "/combo2",
    name: "combo2",
    component: () =>
      import(/* webpackChunkName: "combo2" */ "../views/combo2.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "../views/test.vue")
  },
  {
    path: "/page404",
    name: "page404",
    component: () =>
      import(/* webpackChunkName: "page404" */ "../views/page404.vue")
  }
  // {
  //   path: "/download",
  //   name: "download",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/download.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
