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
        <q-btn label="注册" type="submit" color="primary" />
        <q-btn
          label="重置表单"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import {
  loadingNotify,
  successNotify,
  errorNotify,
} from "../../tools/notify.js";
import { registerAjax } from "../../apis/authorization.js";

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
    fnRegister() {
      const loading = loadingNotify("注册中……");

      registerAjax({
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      })
        .then((res) => {
          loading();
          let { raw, json } = res;
          successNotify(
            "注册成功",
            500,
            (router) => {
              router.push("/authorization/login");
            },
            this.$router
          );
        })
        .catch((e) => {
          loading();
          errorNotify(e.response.data.msg, 1000);
        });
    },
    fnReset() {
      this.username = "";
      this.password = "";
      this.accept = false;
    },
  },
});
</script>
