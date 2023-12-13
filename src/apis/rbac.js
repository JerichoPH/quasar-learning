import { api } from "src/boot/axios";

let urlPrefix = '/rbac';

/**
 * 角色列表
 * @param {{ * }} params 参数
 * @returns
 */
export let ajaxRbacRoleList = params => {
  return api.get(`${urlPrefix}/role`, { params });
}

/**
 * 角色详情
 * @param {string} uuid 唯一编号
 * @returns
 */
export let ajaxRbacRoleDetail = uuid => {
  return api.get(`${urlPrefix}/role/${uuid}`);
}

/**
 * 新建角色
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacRoleStore = params => {
  return api.post(`${urlPrefix}/role`, params);
}

/**
 * 编辑角色
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacRoleUpdate = (uuid, params) => {
  return api.put(`${urlPrefix}/role/${uuid}`, params);
}

/**
 * 删除角色
 * @param {string} uuid 唯一编号
 * @returns
 */
export let ajaxRbacRoleDestroy = uuid => {
  return api.delete(`${urlPrefix}/role/${uuid}`);
}

/**
 * 权限列表
 * @param {{*}} params 权限列表
 * @returns
 */
export let ajaxRbacPermissionList = params => {
  return api.get(`${urlPrefix}/permission`, { params });
}

/**
 * 权限详情
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacPermissionDetail = (uuid, params) => {
  return api.get(`${urlPrefix}/permission/${uuid}`, { params });
}

/**
 * 新建权限
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacPermissionStore = params => {
  return api.post(`${urlPrefix}/permission`, params);
}

/**
 * 更新权限
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 */
export let ajaxRbacPermissionUpdate = (uuid, params) => {
  return api.put(`${urlPrefix}/permission/${uuid}`, params);
}

/**
 * 删除权限
 * @param {string} uuid 唯一编号
 * @returns
 */
export let ajaxRbacPermissionDestory = uuid => {
  return api.delete(`${urlPrefix}/permission/${uuid}`);
}

/**
 * 菜单列表
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacMenuList = params => {
  return api.get(`${urlPrefix}/menu`, { params });
}

/**
 * 菜单详情
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacMenuDetail = (uuid, params) => {
  return api.get(`${urlPrefix}/menu/${uuid}`, { params });
}

/**
 * 新建菜单
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacMenuStore = params => {
  return api.post(`${urlPrefix}/menu`, params);
}

/**
 * 编辑菜单
 * @param {string} uuid 唯一编号
 * @param {{*}} params 参数
 * @returns
 */
export let ajaxRbacMenuUpdate = (uuid, params) => {
  return api.put(`${urlPrefix}/menu/${uuid}`, params);
}

/**
 * 删除菜单
 * @param {string} uuid 唯一编号
 * @returns
 */
export let ajaxRbacMenuDestroy = uuid => {
  return api.delete(`${urlPrefix}/menu/${uuid}`);
}
