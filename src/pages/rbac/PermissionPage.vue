<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row margin-top-1">
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
                label="新建权限"
                icon="add"
                @click="fnOpenAlertCreateRbacPermission"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row margin-top-1">
          <div class="col">
            <q-form>
              <div class="row q-pb-sm q-col-gutter-sm">
                <div class="col-3">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="name_search"
                    label="名称"
                    :rules="[]"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="uri_search"
                    label="路由"
                    :rules="[]"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="description_search"
                    label="描述"
                    :rules="[]"
                  />
                </div>
                <div class="col-3">
                  <SelRbacRole_search labelName="所属角色" />
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
import SelRbacRole_search from "src/components/SelRbacRole_search.vue";
import {
  loadingNotify,
  successNotify,
  errorNotify,
  actionNotify,
  getDestroyActions,
} from "src/tools/notify";
import {
  ajaxRbacPermissionList,
  ajaxRbacPermissionDetail,
  ajaxRbacPermissionStore,
  ajaxRbacPermissionUpdate,
  ajaxRbacPermissionDestory,
} from "src/apis/rbac";

let columns = [
  {
    name: "name",
    field: "name",
    label: "名称",
    align: "left",
    sortable: true,
  },
  {
    name: "uri",
    field: "uri",
    label: "路由",
    align: "left",
    sortable: true,
  },
  {
    name: "description",
    field: "description",
    label: "详情",
    align: "left",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    label: "操作",
    align: "right",
    sortable: false,
  },
];
let row = ref([]);
let name_search = ref("");
let uri_search = ref("");
let description_search = ref("");
let rbacRoleUuid_search = ref("");

provide("rbacRoleUuid_search", rbacRoleUuid_search);

onMounted(() => {});

let fnInit = () => {};

let fnSearch = () => {
  ajaxRbacPermissionList(
    collect({
      name: name_search.value,
      uri: uri_search.value,
      description: description_search.value,
      rbacRoleUuid: rbacRoleUuid_search.value,
    })
      .filter((val) => {
        return !val;
      })
      .all()
  ).then((res) => {
    if (res.code == 200) {
      row.value = res.data.data;
    } else {
      errorNotify(res.message);
    }
  });
};
</script>
