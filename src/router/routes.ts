import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('src/pages/AuthenticationPage.vue'),
        children: [
          {
            path: '/login',
            component: () =>
              import('src/components/authComponents/LoginAuth.vue'),
          },
          {
            path: '/register',
            component: () =>
              import('src/components/authComponents/RegisterAuth.vue'),
          },
          // {
          //   path: '/forgot-password',
          //   component: () =>
          //     import('src/components/authComponents/ForgotPassword.vue'),
          // },
        ],
      },

      {
        path: '/forgot-password',
        component: () =>
          import('src/components/authComponents/ForgotPassword.vue'),
      },
      {
        path: '/profile-completion',
        component: () =>
          import('src/components/authComponents/ProfileCompletion.vue'),
      },

      { path: '/home', component: () => import('src/pages/HomePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
