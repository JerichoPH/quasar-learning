<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="q-mb-md">
          <div class="col"><span style="font-size: 20px">搜索</span></div>
          <div class="col text-right">
            <q-btn-group>
              <q-btn
                color="primary"
                label="搜索"
                icon="search"
                @click="fnSearch"
              />
              <q-btn color="primary" label="重置" flat @click="fnResetSearch" />
              <q-btn
                color="secondary"
                label="新建用户"
                icon="add"
                @click="fnOpenAlertCreateAccount"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-form>
              <div class="row q-pb-sm q-col-gutter-sm">
                <div class="col">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="name_search"
                    label="名称"
                    :rules="[]"
                    class="q-mb-md"
                  />
                </div>
                <div class="col">
                  <q-select
                    outlined
                    use-input
                    clearable
                    v-model="rbacRoleUuid_search"
                    :options="rbacRoles"
                    @filter="fnSelRbacRoleFilter"
                    label="所属角色"
                    emit-value
                    map-options
                  />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref, onMounted, provide } from "vue";
import collect from "collect.js";
import {
  ajaxAccountList,
  ajaxAccountDetail,
  ajaxAccountStore,
  ajaxAccountUpdate,
  ajaxAccountDestroy,
} from "src/apis/account";
import {
  loadingNotify,
  successNotify,
  errorNotify,
  actionNotify,
  getDestroyActions,
} from "src/utils/notify";
import { fasInfinity } from "@quasar/extras/fontawesome-v6";

onMounted(() => {
  console.log("ok");
  fnInit();
});

let fnInit = () => {
  fnSearch();
};

let fnSearch = () => {};
</script>
