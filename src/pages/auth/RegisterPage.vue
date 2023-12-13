<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"/> -->
    <q-form
      @submit="fnRegister"
      @reset="fnReset"
      class="q-gutter-md"
      style="width: 600px"
    >
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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loadingNotify, successNotify, errorNotify } from "src/utils/notify.js";
import { ajaxRegister } from "src/apis/auth.js";

let router = useRouter();
let username = ref("admin");
let nickname = ref("管理员");
let password = ref("123123");
let passwordConfirmation = ref("123123");
let accept = ref(true);

/**
 * 注册
 */
let fnRegister = () => {
  const loading = loadingNotify("注册中……");

  ajaxRegister({
    username: username.value,
    nickname: nickname.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  })
    .then((res) => {
      loading();
      successNotify(
        res.msg,
        500,
        (router) => {
          router.push("/auth/login");
        },
        router
      );
    })
    .catch((e) => {
      loading();
      errorNotify(e.msg, 5000);
    });
};

/**
 * 重置表单
 */
let fnReset = () => {
  username.value = "";
  nickname.value = "";
  password.value = "";
  passwordConfirmation.value = "";
  accept.value = false;
};
/**
 * 跳转页面
 * @param {string} path
 */
let fnHrefTo = (path) => {
  if (path) this.$router.push(path);
};
</script>
../../utils/notify.js
