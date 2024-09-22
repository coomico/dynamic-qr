import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { AuthStorage } from '@/utils/storage';

const DEFAULT_TITLE = 'Dynamic QR Code';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'notfound',
      meta: {
        title: 'Oops, no pages found! |'
      },
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/',
      component: () => import('../views/home/Home.vue'),
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: "Let's create a"
          },
          component: () => import('../views/home/HomeView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          meta: {
            title: 'Login to your account |'
          },
          component: () => import('../views/home/LoginView.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          meta: {
            title: 'Create an account |'
          },
          component: () => import('../views/home/SignupView.vue')
        }
      ]
    },
    {
      path: '/account',
      component: () => import('../views/account/Account.vue'),
      meta: {
        title: 'Account |',
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('../views/account/ProfileView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/account/SettingsView.vue')
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('../views/account/LogoutView.vue')
        }
      ]
    },
    {
      path: '/links',
      component: () => import('../views/links/Links.vue'),
      meta: {
        title: 'Links |',
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'collection',
          component: () => import('../views/links/CollectionView.vue')
        },
        {
          path: 'new',
          name: 'new',
          component: () => import('../views/links/NewView.vue')
        },
        {
          path: 'edit/:id?',
          name: 'edit',
          component: () => import('../views/links/EditView.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from) => {
  document.title = `${to.meta.title} ${DEFAULT_TITLE}`;

  if (to.meta.requiresAuth && !useAuthStore().isLoggedIn && !AuthStorage.auth) {
    return {
      name: 'login'
    }
  }

  if (!to.meta.requiresAuth && (useAuthStore().isLoggedIn || AuthStorage.auth)) {
    return {
      name: from.name ?? 'collection'
    }
  }
});

export default router;