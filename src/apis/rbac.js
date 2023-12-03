import api from "./api";

/**
 * 角色列表
 * @param {{ * }} params
 * @returns
 */
export const rbacRoleListAjax = (params = {}) => {
  return api.get("/rbac/role", { params });
}
