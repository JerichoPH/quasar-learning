import ErrorNotFontVue from "pages/ErrorNotFound.vue";
import MainLayoutVue from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import AuthorizationLayoutVue from "layouts/AuthorizationLayout.vue";
import LoginPage from "pages/authorization/LoginPage.vue";
import RegisterPage from "pages/authorization/RegisterPage.vue";

const routes = [
  {
    path: "/",
    component: () => MainLayoutVue,
    children: [{ path: "", component: IndexPage }],
  },
  {
    path: "/authorization",
    component: () => AuthorizationLayoutVue,
    children: [
      { path: "login", component: LoginPage },
      { path: "register", component: RegisterPage },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => ErrorNotFontVue,
  },
];

export default routes;
