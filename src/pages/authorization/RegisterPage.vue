<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"/> -->
    <q-form @submit="fnLogin" @reset="fnReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="账号 *"
        hint=""
        lazy-rules
        :rules="[(val) => (val && val.length > 2) || '不能小于2位']"
      />

      <q-input
        filled
        v-model="nickname"
        label="昵称 *"
        hint=""
        lazy-rules
        :rules="[(val) => (val && val.length > 2) || '不能小于2位']"
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
import NotifyUtil from "../../tools/notify.js";
import { loginAjax } from "../../apis/authorization.js";

export default defineComponent({
  name: "RegisterPage",
});
</script>
