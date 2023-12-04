import api from "./api";

// 定义 API 的基本 URL
const baseUrl = "/auth";

// 登录的 AJAX 请求函数
export const ajaxLogin = (params) => {
  return api.post(`${baseUrl}/login`, params);
};

// 注册的 AJAX 请求函数
export const ajaxRegister = (params) => {
  return api.post(`${baseUrl}/register`, params);
};
