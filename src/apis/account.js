import { api } from "src/boot/axios";

let urlPrefix = '/account';

export let ajaxAccountList = params => {
  return api.get(urlPrefix, { params });
};

export let ajaxAccountDetail = (uuid, params) => {
  return api.get(`${urlPrefix}/${uuid}`, { params });
}

export let ajaxAccountStore = params => {
  return api.post(urlPrefix, params);
};

export let ajaxAccountUpdate = (uuid, params) => {
  return api.put(`${urlPrefix}/${uuid}`, params);
};

export let ajaxAccountDestroy = uuid => {
  return api.delete(`${urlPrefix}/${uuid}`);
};

export let ajaxAccountUpdatePassword = (uuid, params) => {
  return api.put(`${urlPrefix}/${uuid}/password`, params);
};
