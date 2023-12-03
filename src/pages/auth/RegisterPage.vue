<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"/> -->
    <q-form @submit="fnRegister" @reset="fnReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="账号 *"
        hint=""
        lazy-rules
        :rules="[(val) => (val && val.length >= 2) || '不能小于2位']"
      />

      <q-input
        filled
        v-model="nickname"
        label="昵称 *"
        hint=""
        lazy-rules
        :rules="[(val) => (val && val.length >= 2) || '不能小于2位']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="密码 *"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '不能小于6位']"
      />

      <q-input
        filled
        type="password"
        v-model="passwordConfirmation"
        label="确认密码 *"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '不能小于6位']"
      />

      <q-toggle v-model="accept" label="接受条款" />

      <div>
        <q-btn label="注册" type="submit" color="secondary" />
        <q-btn
          label="重置表单"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn
          label="登录"
          color="primary"
          flat
          class="q-ml-sm"
          @click="fnHrefTo('/auth/login')"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  loadingNotify,
  successNotify,
  errorNotify,
} from "../../tools/notify.js";
import { registerAjax } from "../../apis/auth.js";

export default defineComponent({
  name: "RegisterPage",

  data() {
    return {
      username: "zhangsan",
      nickname: "张三",
      password: "123123",
      passwordConfirmation: "123123",
      accept: true,
    };
  },
  methods: {
    /**
     * 注册
     */
    fnRegister() {
      const loading = loadingNotify("注册中……");

      registerAjax({
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      })
        .then(() => {
          loading();
          successNotify(
            "注册成功",
            500,
            (router) => {
              router.push("/auth/login");
            },
            this.$router
          );
        })
        .catch((e) => {
          loading();
          errorNotify(e.response.data.msg || e.response.data, 5000);
        });
    },
    /**
     * 重置表单
     */
    fnReset() {
      this.username = "";
      this.nickname = "";
      this.password = "";
      this.passwordConfirmation = "";
      this.accept = false;
    },
    /**
     * 跳转页面
     * @param {string} path
     */
    fnHrefTo(path) {
      if (path) this.$router.push(path);
    },
  },
});
</script>
