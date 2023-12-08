import api from "./api";

/**
 * 角色列表
 * @param {{ * }} params 参数
 * @returns
 */
export const ajaxRbacRoleList = (params = {}) => {
  return api.get("/rbac/role", { params });
}

/**
 * 角色详情
 * @param {string} uuid 唯一编号
 * @returns
 */
export const ajaxRbacRoleDetail = (uuid = '') => {
  return api.get(`/rbac/role/${uuid}`);
}

/**
 * 新建角色
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacRoleStore = (params = {}) => {
  return api.post("/rbac/role", params);
}

/**
 * 编辑角色
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacRoleUpdate = (uuid = '', params = {}) => {
  return api.put(`/rbac/role/${uuid}`, params);
}

/**
 * 删除角色
 * @param {string} uuid 唯一编号
 * @returns
 */
export const ajaxRbacRoleDestroy = (uuid = '') => {
  return api.delete(`/rbac/role/${uuid}`);
}

/**
 * 权限列表
 * @param {{*}} params 权限列表
 * @returns
 */
export const ajaxRbacPermissionList = (params = {}) => {
  return api.get("/rbac/permission", { params });
}

/**
 * 权限详情
 * @param {string} uuid 唯一编号
 * @returns
 */
export const ajaxRbacPermissionDetail = (uuid = '') => {
  return api.get(`/rbac/permission/${uuid}`);
}

/**
 * 新建权限
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacPermissionStore = (params = {}) => {
  return api.post("/rbac/permission", params);
}

/**
 * 更新权限
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 */
export const ajaxRbacPermissionUpdate = (uuid = '', params = {}) => {
  return api.put(`/rbac/permission/${uuid}`, params);
}

/**
 * 删除权限
 * @param {string} uuid 唯一编号
 * @returns
 */
export const ajaxRbacPermissionDestory = (uuid = '') => {
  return api.delete(`/rbac/permission/${uuid}`);
}

/**
 * 菜单列表
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacMenuList = (params = {}) => {
  return api.get("/rbac/menu", { params });
}

/**
 * 菜单详情
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacMenuDetail = (uuid = '', params = {}) => {
  return api.get(`/rbac/menu/${uuid}`, { params });
}

/**
 * 新建菜单
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacMenuStore = (params = {}) => {
  return api.post("/rbac/menu", params);
}

/**
 * 编辑菜单
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export const ajaxRbacMenuUpdate = (uuid = '', params = {}) => {
  return api.put(`/rbac/menu/${uuid}`, params);
}

/**
 * 删除菜单
 * @param {string} uuid 唯一编号
 * @returns
 */
export const ajaxRbacMenuDestroy = (uuid = '') => {
  return api.delete(`/rbac/menu/${uuid}`);
}
