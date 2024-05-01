import { createRouter, createWebHistory } from 'vue-router';

const DEFAULT_TITLE = 'Dynamic QR Code'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: "Home",
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: {
        title: "Create",
      }
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('../views/ModifyView.vue'),
      meta: {
        title: "Modify",
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = `${DEFAULT_TITLE} | ${to.meta.title}`;
  next();
});

export default router
