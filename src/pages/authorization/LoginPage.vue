<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" /> -->
    <q-form @submit="fnLogin" @reset="fnReset" class="q-gutter-md">
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
        type="password"
        v-model="password"
        label="密码 *"
        lazy-rules
        :rules="[(val) => (val && val.length >= 6) || '不能小于6位']"
      />

      <q-toggle v-model="accept" label="接受条款" />

      <div>
        <q-btn label="登录" type="submit" color="primary" />
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
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import {
  loadingNotify,
  successNotify,
  errorNotify,
} from "../../tools/notify.js";
import { loginAjax } from "../../apis/authorization.js";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      accept: false,
    };
  },
  methods: {
    fnLogin() {
      const loading = loadingNotify("登录中……");

      loginAjax({
        username: this.username,
        password: this.password,
      })
        .then((res) => {
          let { raw, json } = res;
          if (raw.token) {
            loading();
            localStorage.setItem("authorization.token", raw.token);
            localStorage.setItem("authorization.user", json);
            successNotify(
              "登录成功",
              500,
              (router) => {
                router.push("/");
              },
              this.$router
            );
          }
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
