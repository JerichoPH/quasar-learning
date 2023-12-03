import axios from "axios";
import { errorNotify } from "../tools/notify";

// 创建一个 axios 实例
const api = axios.create({
  baseURL: "http://localhost:18080/api", // 设置基础 URL
  headers: {
    "Content-Type": "application/json", // 设置请求头中的 Content-Type
    Accept: "application/json", // 设置请求头中的 Accept
  },
});

// 在请求发送之前进行拦截
api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token"); // 从 localStorage 中获取 token
  if (token) config.headers.Authorization = `JWT ${token}`; // 如果有 token，则将其添加到请求头中

  return config;
});

// 在响应拦截之后进行处理
api.interceptors.response.use(
  (resp) => {
    let content = resp.data.content; // 获取响应中的 content
    return {
      raw: content, // 返回原始 content
      json: JSON.stringify(content), // 返回 content 的 JSON 字符串形式
    };
  },
  (e) => {
    if (e.response.status === 401) {
      // 如果响应的状态码为 401（未授权）
      localStorage.removeItem("token"); // 从 localStorage 中删除 token
      errorNotify("未登录", 1000); // 显示通知，提示用户未登录
    } else {
      return Promise.reject(e); // 否则则拒绝 Promise
    }
  }
);

export default api; // 导出 axios 实例
