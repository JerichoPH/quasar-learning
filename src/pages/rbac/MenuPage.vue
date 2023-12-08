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
                label="新建菜单"
                icon="add"
                @click="fnOpenAlertCreateRbacMenu"
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
                  <SelRbacMenu_search
                    label-name="所属父级"
                    v-if="selRbacMenu_search_enable"
                  />
                </div>
                <div class="col-3">
                  <SelRbacRole_search label-name="所属角色" />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row margin-top-1">
          <div class="col">
            <q-table
              flat
              bordered
              title="菜单列表"
              :rows="rows"
              :columns="columns"
              row-key="name"
              color="amber"
              :pagination="{ rowsPerPage: 200 }"
              :rows-per-page-options="[50, 100, 200, 0]"
              rows-per-page-label="分页"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                  <q-td key="uri" :props="props">{{ props.row.uri }}</q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.description }}
                  </q-td>
                  <q-td key="parentName" :props="props">{{
                    props.row.parentName
                  }}</q-td>
                  <q-td key="operation" :props="props">
                    <q-btn-group>
                      <q-btn
                        @click="fnOpenAlertEditRbacMenu(props.row.operation)"
                        color="warning"
                        icon="edit"
                      >
                        编辑
                      </q-btn>
                      <q-btn
                        @click="fnDeleteRbacMenu(props.row.operation)"
                        color="negative"
                        icon="delete"
                      >
                        删除
                      </q-btn>
                    </q-btn-group>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- 对话框 -->
  <!-- 新建菜单对话框 -->
  <q-dialog v-model="alertCreateRbacMenu">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">新建菜单</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertCreateRbacMenu"
                label="名称"
                :rules="[]"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="uri_alertCreateRbacMenu"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertCreateRbacMenu"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <SelRbacMenu_alertCreate
                label-name="所属父级"
                class="margin-top-1"
              />
              <SelRbacRole_alertCreate
                label-name="所属角色"
                multiple="true"
                class="margin-top-1"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          type="button"
          label="确定"
          icon="check"
          color="secondary"
          @click="fnStoreRbacMenu"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 编辑菜单对话框 -->
  <q-dialog v-model="alertEditRbacMenu">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">编辑菜单</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertEditRbacMenu"
                label="名称"
                :rules="[]"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="uri_alertEditRbacMenu"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertEditRbacMenu"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <SelRbacMenu_alertEdit
                label-name="所属父级"
                :ajax-params="{
                  __neq__: { uuid: currentUuid },
                  not_has_subs: currentUuid,
                }"
                class="margin-top-1"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          type="button"
          label="确定"
          icon="check"
          color="secondary"
          @click="fnUpdateRbacMenu"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, provide } from "vue";
import { collect } from "collect.js";
import SelRbacMenu_search from "src/components/SelRbacMenu_search.vue";
import SelRbacMenu_alertCreate from "src/components/SelRbacMenu_alertCreate.vue";
import SelRbacMenu_alertEdit from "src/components/SelRbacMenu_alertEdit.vue";
import SelRbacRole_search from "src/components/SelRbacRole_search.vue";
import SelRbacRole_alertCreate from "src/components/SelRbacRole_alertCreate.vue";
import SelRbacRole_alertEdit from "src/components/SelRbacRole_alertEdit.vue";
import {
  successNotify,
  errorNotify,
  loadingNotify,
  actionNotify,
  getDestroyActions,
} from "src/tools/notify";
import {
  ajaxRbacMenuDestroy,
  ajaxRbacMenuDetail,
  ajaxRbacMenuList,
  ajaxRbacMenuStore,
  ajaxRbacMenuUpdate,
} from "src/apis/rbac";

// 表格数据
const columns = [
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
    label: "描述",
    align: "left",
    sortable: true,
  },
  {
    name: "parentName",
    field: "parentName",
    label: "所属父级",
    align: "left",
    sortable: true,
  },
  {
    name: "rbacRoles",
    field: "rbacRoles",
    label: "所属角色",
    align: "left",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    label: "",
    align: "left",
    sortable: true,
  },
];
const rows = ref([]);

// 表格数据
const name_search = ref("");
const uri_search = ref("");
const description_search = ref("");
const parentUuid_search = ref("");
const selRbacMenu_search_enable = ref(true);
const rbacRoleUuid_search = ref("");

// 新建菜单对话框
const alertCreateRbacMenu = ref(false);
const name_alertCreateRbacMenu = ref("");
const uri_alertCreateRbacMenu = ref("");
const description_alertCreateRbacMenu = ref("");
const parentUuid_alertCreateRbacMenu = ref("");
const rbacRoleUuids_alertCreateRbacMenu = ref(null);

// 编辑菜单对话框
const alertEditRbacMenu = ref(false);
const rbacMenus_alertEditRbacMenu = ref([]);
const currentUuid = ref("");
const name_alertEditRbacMenu = ref("");
const uri_alertEditRbacMenu = ref("");
const description_alertEditRbacMenu = ref("");
const parentUuid_alertEditRbacMenu = ref("");
const rbacRoleUuids_alertEditRbacMenu = ref(null);

provide("parentUuid_search", parentUuid_search);
provide("parentUuid_alertCreate", parentUuid_alertCreateRbacMenu);
provide("parentUuid_alertEdit", parentUuid_alertEditRbacMenu);
provide("rbacRoleUuid_search", rbacRoleUuid_search);
provide("rbacRoleUuids_alertCreate", rbacRoleUuids_alertCreateRbacMenu);
provide("rbacRoleUuids_alertEdit", rbacRoleUuids_alertEditRbacMenu);

onMounted(() => {
  fnInit();
});

/**
 * 初始化页面
 */
const fnInit = () => {
  fnSearch();
};
/**
 * 搜索
 */
const fnSearch = () => {
  rows.value = [];
  ajaxRbacMenuList({
    "__preloads__[]": ["Parent"],
    name: name_search.value,
    uri: uri_search.value,
    description: description_search.value,
    parent_uuid: parentUuid_search.value,
    rbac_role_uuid: rbacRoleUuid_search.value,
  })
    .then((res) => {
      if (res.content.rbac_menus.length > 0) {
        collect(res.content.rbac_menus).each((rbacMenu) => {
          rows.value.push({
            name: rbacMenu.name,
            uri: rbacMenu.uri,
            description: rbacMenu.description,
            parentName: rbacMenu.parent ? rbacMenu.parent.name : "无",
            operation: { uuid: rbacMenu.uuid },
          });
        });
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    })
    .finally(() => {
      selRbacMenu_search_enable.value = false;
      selRbacMenu_search_enable.value = true;
    });
};
/**
 * 初始化搜索栏
 */
const fnResetSearch = () => {
  name_search.value = "";
  uri_search.value = "";
  description_search.value = "";
  parentUuid_search.value = "";
  rbacRoleUuid_search.value = "";
};
/**
 * 重置新建菜单对话框
 */
const fnResetAlertCreateRbace = () => {
  name_alertCreateRbacMenu.value = "";
  uri_alertCreateRbacMenu.value = "";
  description_alertCreateRbacMenu.value = "";
  parentUuid_alertCreateRbacMenu.value = "";
  rbacRoleUuids_alertCreateRbacMenu.value = [];
};
/**
 * 打开新建菜单对话框
 */
const fnOpenAlertCreateRbacMenu = () => {
  fnResetAlertCreateRbace();
  alertCreateRbacMenu.value = true;
};
/**
 * 新建菜单
 */
const fnStoreRbacMenu = () => {
  const loading = loadingNotify();

  ajaxRbacMenuStore({
    name: name_alertCreateRbacMenu.value,
    uri: uri_alertCreateRbacMenu.value,
    description: description_alertCreateRbacMenu.value,
    parent_uuid: parentUuid_alertCreateRbacMenu.value,
  })
    .then((res) => {
      successNotify(res.msg, 500);
      fnSearch();
    })
    .catch((err) => {
      errorNotify(err.msg);
    })
    .finally(() => {
      loading();
    });
};
/**
 * 重置编辑菜单对话框
 */
const fnResetAlertEditRbacMenu = () => {
  rbacMenus_alertEditRbacMenu.value = [];
  currentUuid.value = "";
  name_alertEditRbacMenu.value = "";
  uri_alertEditRbacMenu.value = "";
  description_alertEditRbacMenu.value = "";
  parentUuid_alertEditRbacMenu.value = "";
  rbacRoleUuids_alertEditRbacMenu.value = [];
};
/**
 * 打开编辑菜单对话框
 * @param {{uuid:string}} params 参数
 */
const fnOpenAlertEditRbacMenu = (params = {}) => {
  if (!params.hasOwnProperty("uuid")) return;
  if (!params.uuid) return;

  fnResetAlertEditRbacMenu();
  currentUuid.value = params.uuid;

  ajaxRbacMenuDetail(currentUuid.value, { "__preloads__[]": ["Parent"] })
    .then((res) => {
      name_alertEditRbacMenu.value = res.content.rbac_menu.name;
      uri_alertEditRbacMenu.value = res.content.rbac_menu.uri;
      description_alertEditRbacMenu.value = res.content.rbac_menu.description;
      parentUuid_alertEditRbacMenu.value = res.content.rbac_menu.parent
        ? res.content.rbac_menu.parent.uuid
        : "";
      rbacRoleUuids_alertEditRbacMenu.value = collect(
        res.content.rbac_menu.rbac_roles
      )
        .pluck("uuid")
        .all();
      alertEditRbacMenu.value = true;
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 编辑菜单
 */
const fnUpdateRbacMenu = () => {
  if (!currentUuid.value) return;
  const loading = loadingNotify();
  ajaxRbacMenuUpdate(currentUuid.value, {
    name: name_alertEditRbacMenu.value,
    uri: uri_alertEditRbacMenu.value,
    description: description_alertEditRbacMenu.value,
    parent_uuid: parentUuid_alertEditRbacMenu.value,
    rbac_role_uuids: rbacRoleUuids_alertEditRbacMenu.value,
  })
    .then((res) => {
      successNotify(res.msg);
      fnSearch();
    })
    .catch((e) => {
      errorNotify(e.msg);
    })
    .finally(() => {
      loading();
    });
};
/**
 * 删除菜单
 * @param {{uuid:string}} params 参数
 */
const fnDeleteRbacMenu = (params = {}) => {
  if (!params.uuid) return;

  actionNotify(
    getDestroyActions(() => {
      const loading = loadingNotify();
      ajaxRbacMenuDestroy(params.uuid)
        .then(() => {
          successNotify("删除成功");
          fnSearch();
        })
        .catch((e) => {
          errorNotify(e.msg);
        })
        .finally(() => {
          loading();
        });
    })
  );
};
</script>
