import api from "./api";

// 定义 API 的基本 URL
const baseUrl = "/authorization";

// 登录的 AJAX 请求函数
export const loginAjax = (params) => {
  return api.post(`${baseUrl}/login`, params);
};

// 注册的 AJAX 请求函数
export const registerAjax = (params) => {
  return api.post(`${baseUrl}/register`, params);
}
