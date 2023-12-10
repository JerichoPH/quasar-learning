import api from "./api";

// 定义 API 的基本 URL
let urlPrefix = "/auth";

// 登录的 AJAX 请求函数
export let ajaxLogin = params => {
  return api.post(`${urlPrefix}/login`, params);
};

// 注册的 AJAX 请求函数
export let ajaxRegister = params => {
  return api.post(`${urlPrefix}/register`, params);
};
