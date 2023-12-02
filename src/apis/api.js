import axios from "axios";
import NotifyUtil from "../tools/notify";

const api = axios.create({
  baseURL: "http://localhost:18080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `JWT ${token}`;

  return config;
});

api.interceptors.response.use(
  (resp) => {
    let content = resp.data.content;
    return {
      raw: content,
      json: JSON.stringify(content),
    };
  },
  (e) => {
    if (e.response.status === 401) {
      localStorage.removeItem("token");
      NotifyUtil.error('未登录', 1000);
    } else {
      return Promise.reject(e);
    }
  }
);

export default api;
