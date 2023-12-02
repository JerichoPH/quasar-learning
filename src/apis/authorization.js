import api from "./api";

const baseUrl = "/authorization";

export const loginAjax = (params) => {
  return api.post(`${baseUrl}/login`, params);
};
