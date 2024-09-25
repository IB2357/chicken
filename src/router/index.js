// src/router/index.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

import { HSStaticMethods } from "preline/preline";  

// Attach HSStaticMethods to the global window object
window.HSStaticMethods = HSStaticMethods;


const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/about", component: () => import("../views/AboutView.vue") },
  { path: "/sign-in", component: () => import("../views/SignIn.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user)=>{
        removeListener();
        resolve(user);
      },
      reject
    )
  })
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      // alert('you dont have access');
      next('/sign-in')
    }
  } else {
    next();
  }
});


router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
});

export default router;