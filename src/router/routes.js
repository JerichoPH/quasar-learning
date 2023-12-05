import ErrorNotFontVue from "pages/ErrorNotFound.vue";
import MainLayoutVue from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import AuthLayoutVue from "layouts/AuthLayout.vue";
import LoginPage from "pages/auth/LoginPage.vue";
import RegisterPage from "pages/auth/RegisterPage.vue";
import RbacRolePage from "pages/rbac/RolePage.vue";
import RbacPermissionPage from "pages/rbac/PermissionPage.vue";
import RbacMenuPage from "pages/rbac/MenuPage.vue";

const routes = [
  {
    path: "/",
    component: () => MainLayoutVue,
    children: [{ path: "", component: IndexPage }],
  },
  {
    path: "/auth",
    component: () => AuthLayoutVue,
    children: [
      { path: "login", component: LoginPage },
      { path: "register", component: RegisterPage },
    ],
  },
  {
    path: "/rbac",
    component: () => MainLayoutVue,
    children: [
      { path: "role", component: RbacRolePage },
      { path: "permission", component: RbacPermissionPage },
      { path: "menu", component: RbacMenuPage },
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
