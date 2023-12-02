import { Notify } from "quasar";

export const loadingNotify = (message, callback = null, params = {}) => {
  const n = Notify.create({
    type: 'info',
    spinner: true,
    position: 'center',
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

export const infoNotify = (message, timeout = 1500, callback = null, params = {}) => {
  const n = Notify.create({
    type: 'info',
    spinner: false,
    position: 'center',
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

export const successNotify = (message, timeout = 1500, callback = null, params = {}) => {
  const n = Notify.create({
    type: 'positive',
    spinner: false,
    position: 'center',
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

export const errorNotify = (message, timeout = 1500, callback = null, params = {}) => {
  const n = Notify.create({
    type: 'negative',
    spinner: false,
    position: 'center',
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
