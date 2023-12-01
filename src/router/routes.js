import ErrorNotFontVue from 'pages/ErrorNotFound.vue';
import MainLayoutVue from 'layouts/MainLayout.vue';
import IndexPage from 'pages/IndexPage.vue';
import LoginLayoutVue from 'src/layouts/LoginLayout.vue';
import LoginPage from 'pages/authorization/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: () => MainLayoutVue,
    children: [
      { path: '', component: () => IndexPage, },
    ]
  },
  {
    path: '/authrozation/login',
    component: () => LoginLayoutVue,
    children: [
      { path: '', component: () => LoginPage, }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => ErrorNotFontVue,
  }
]

export default routes
