import { Notify } from "quasar";

export const getDefaultActions = (handler) => {
  return [
    {
      label: "取消",
      color: "white",
    },
    {
      label: "删除",
      color: "negative",
      handler,
    },
  ];
};

export const loadingNotify = (message, callback = null, params = {}) => {
  const n = Notify.create({
    type: "info",
    spinner: true,
    position: "top",
    progress: false,
    message,
    timeout: 0,
  });
  if (callback) {
    if (timeout) {
      setTimeout(() => {
        callback(params);
        n();
      }, timeout + 1000);
    } else {
      callback(params);
      n();
    }
  }
  return n;
};

export const infoNotify = (
  message,
  timeout = 1500,
  callback = null,
  params = {}
) => {
  const n = Notify.create({
    type: "info",
    spinner: false,
    position: "top",
    progress: true,
    message,
    timeout,
  });
  if (callback) {
    if (timeout) {
      setTimeout(() => {
        callback(params);
        n();
      }, timeout + 1000);
    } else {
      callback(params);
      n();
    }
  }
  return n;
};

export const successNotify = (
  message,
  timeout = 1500,
  callback = null,
  params = {}
) => {
  const n = Notify.create({
    type: "positive",
    spinner: false,
    position: "top",
    progress: true,
    message,
    timeout,
  });
  if (callback) {
    if (timeout) {
      setTimeout(() => {
        callback(params);
        n();
      }, timeout + 1000);
    } else {
      callback(params);
      n();
    }
  }
  return n;
};

export const errorNotify = (
  message,
  timeout = 1500,
  callback = null,
  params = {}
) => {
  const n = Notify.create({
    type: "negative",
    spinner: false,
    position: "top",
    progress: true,
    message,
    timeout,
  });
  if (callback) {
    if (timeout) {
      setTimeout(() => {
        callback(params);
        n();
      }, timeout + 1000);
    } else {
      callback(params);
      n();
    }
  }
  return n;
};

/**
 * 交互通知
 * @param {string} message 消息内容
 * @param {[{*}]} actions 行为
 */
export const actionNotify = (
  actions = [],
  message = '删除不可恢复，是否继续？',
) => {
  const n = Notify.create({
    position: "center",
    color: "orange",
    message,
    actions,
  });

  return n;
};
