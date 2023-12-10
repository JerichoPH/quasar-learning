import api from 'src/apis/api';

let urlPrefix = '/account';

export let ajaxAccountList = parmas => {
  return api.get(urlPrefix, { parmas });
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
