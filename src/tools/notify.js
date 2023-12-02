import { Notify } from "quasar";

class NotifyUtil {
  /**
   * 通知工具类
   */
  constructor() {
    this.type = "info";
    this.spinner = false;
    this.message = "";
    this.position = "center";
    this.progress = false;
    this.timeout = 0;
    this.callback = null;
    this.params = {};
  }

  /**
   * 显示通知
   * @returns {object} - 返回通知组件
   */
  notify() {
    const n = Notify.create({
      type: this.type,
      spinner: this.spinner,
      message: this.message,
      position: this.position,
      progress: this.progress,
      timeout: this.timeout,
    });
    if (this.callback) {
      if (this.timeout) {
        setTimeout(() => {
          this.callback(this.params);
          n();
        }, this.timeout + 1000);
      } else {
        this.callback(this.params);
        n();
      }
    }
    return n;
  }

  /**
   * 设置通知类型
   * @param {string} type - 通知类型
   * @returns {object} - 返回通知工具类实例
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * 获取通知类型
   * @returns {string} - 返回通知类型
   */
  getType() {
    return this.type;
  }

  /**
   * 设置是否显示加载动效
   * @param {boolean} spinner - 是否显示加载动效
   * @returns {object} - 返回通知工具类实例
   */
  setSpinner(spinner) {
    this.spinner = spinner;
    return this;
  }

  /**
   * 是否显示加载动效
   * @returns {boolean} - 返回是否显示加载动效
   */
  getSpinner() {
    return this.spinner;
  }

  /**
   * 设置通知消息内容
   * @param {string} message - 通知消息内容
   * @returns {object} - 返回通知工具类实例
   */
  setMessage(message) {
    this.message = message;
    return this;
  }

  /**
   * 获取通知消息内容
   * @returns {string} - 返回通知消息内容
   */
  getMessage() {
    return this.message;
  }

  /**
   * 设置通知显示位置
   * @param {string} position - 通知显示位置
   * @returns {object} - 返回通知工具类实例
   */
  setPosition(position) {
    this.position = position;
    return this;
  }

  /**
   * 获取通知显示位置
   * @returns {string} - 返回通知显示位置
   */
  getPosition() {
    return this.position;
  }

  /**
   * 设置是否显示进度
   * @param {boolean} progress - 是否显示进度
   * @returns {object} - 返回通知工具类实例
   */
  setProgress(progress) {
    this.progress = progress;
    return this;
  }

  /**
   * 是否显示进度
   * @returns {boolean} - 返回是否显示进度
   */
  getProgress() {
    return this.progress;
  }

  /**
   * 设置超时时间
   * @param {number} timeout - 超时时间
   * @returns {object} - 返回通知工具类实例
   */
  setTimeOut(timeout) {
    this.timeout = timeout;
    return this;
  }

  /**
   * 获取超时时间
   * @returns {number} - 返回超时时间
   */
  getTimeOut() {
    return this.timeout;
  }

  /**
   * 设置回调函数
   * @param {function} callback - 回调函数
   * @returns {object} - 返回通知工具类实例
   */
  setCallback(callback) {
    this.callback = callback;
    return this;
  }

  /**
   * 获取回调函数
   * @returns {function} - 返回回调函数
   */
  getCallback() {
    return this.callback;
  }

  /**
   * 设置参数对象
   * @param {object} params - 参数对象
   * @returns {object} - 返回通知工具类实例
   */
  setParams(params) {
    this.params = params;
    return this;
  }

  /**
   * 获取参数对象
   * @returns {object} - 返回参数对象
   */
  getParams() {
    return this.params;
  }

  /**
   * 清除通知组件
   */
  clear() {
    this.type = "info";
    this.spinner = false;
    this.message = "";
    this.position = "center";
    this.progress = false;
    this.timeout = 0;
    this.callback = null;
    this.params = {};
  }

  /**
   * 显示加载通知
   * @param {string} message - 加载通知消息内容
   * @param {function} callback - 超时后执行的回调函数
   * @param {object} params - 回调函数的参数对象
   * @returns {object} - 返回通知组件
   */
  loading(message, callback = null, params = {}) {
    this.setMessage(message);
    this.setSpinner(true);
    this.setCallback(callback);
    this.setParams(params);

    return this.notify();
  }

  /**
   * 显示信息通知
   * @param {string} message - 信息通知消息内容
   * @param {number} timeout - 超时时间
   * @param {function} callback - 超时后执行的回调函数
   * @param {object} params - 回调函数的参数对象
   * @returns {object} - 返回通知组件
   */
  info(message, timeout = 2000, callback = null, params = {}) {
    this.setMessage(message);
    this.setSpinner(false);
    this.setProgress(true);
    this.setTimeOut(timeout);
    this.setCallback(callback);
    this.setParams(params);

    return this.notify();
  }

  /**
   * 显示错误通知
   * @param {string} message - 错误通知消息内容
   * @param {number} timeout - 超时时间
   * @param {function} callback - 超时后执行的回调函数
   * @param {object} params - 回调函数的参数对象
   * @returns {object} - 返回通知组件
   */
  error(message, timeout = 3000, callback = null, params = {}) {
    this.setType("negative");
    this.setSpinner(false);
    this.setMessage(message);
    this.setProgress(true);
    this.setTimeOut(timeout);
    this.setCallback(callback);
    this.setParams(params);

    return this.notify();
  }

  /**
   * 显示成功通知
   * @param {string} message - 成功通知消息内容
   * @param {number} timeout - 超时时间
   * @param {function} callback - 超时后执行的回调函数
   * @param {object} params - 回调函数的参数对象
   * @returns {object} - 返回通知组件
   */
  success(message, timeout = 1000, callback = null, params = {}) {
    this.setType("positive");
    this.setSpinner(false);
    this.setMessage(message);
    this.setProgress(true);
    this.setTimeOut(timeout);
    this.setCallback(callback);
    this.setParams(params);

    return this.notify();
  }
}

export default NotifyUtil;

// export const actionNoitfy = (message, timeout = 1500) => {
//   return Notify.create({
//     // 通知消息的内容
//     message: message,
//     // 通知的超时时间，默认为1500毫秒
//     timeout: timeout,

//     attrs: {
//       // 通知对话框的属性
//       role: "alertdialog",
//     },

//     actions: [
//       {
//         icon: "close",
//         // 单个操作（按钮）的图标
//         icon: "close",
//         // 对于单个操作（按钮）的描述
//         "aria-label": "Dismiss",
//       },
//     ],
//   });
// };
