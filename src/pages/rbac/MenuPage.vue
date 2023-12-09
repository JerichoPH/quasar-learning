<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row q-mb-md">
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
        <div class="row">
          <div class="col">
            <q-form>
              <div class="row q-col-gutter-sm">
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
        <div class="row q-mt-md">
          <div class="col">
            <q-table
              flat
              bordered
              title="菜单列表"
              :rows="rows"
              :columns="columns"
              row-key="index"
              color="amber"
              virtual-scroll
              :pagination="{ rowsPerPage: 200 }"
              :rows-per-page-options="[50, 100, 200, 0]"
              rows-per-page-label="分页"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="index" :props="props">
                    {{ props.row.index + 1 }}
                  </q-td>
                  <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                  <q-td key="uri" :props="props">{{ props.row.uri }}</q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.description }}
                  </q-td>
                  <q-td key="parentName" :props="props">
                    <q-chip
                      color="primary"
                      text-color="white"
                      v-if="props.row.parentName"
                    >
                      {{ props.row.parentName }}
                    </q-chip>
                  </q-td>
                  <q-td key="rbacRoles" :props="props">
                    <q-chip
                      color="primary"
                      text-color="white"
                      v-for="(rbacRole, idx) in props.row.rbacRoles"
                      :key="idx"
                    >
                      {{ rbacRole.name }}
                    </q-chip>
                  </q-td>
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
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="uri_alertCreateRbacMenu"
                label="路由"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertCreateRbacMenu"
                label="描述"
                :rules="[]"
                class="q-mb-md"
              />
              <SelRbacMenu_alertCreate labelName="所属父级" class="q-mb-md" />
              <ChkRbacRole_alertCreate labelName="所属角色" />
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
                class="q-mt-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertEditRbacMenu"
                label="描述"
                :rules="[]"
                class="q-mt-md"
              />
              <SelRbacMenu_alertEdit
                labelName="所属父级"
                :ajaxParams="{
                  __neq__: { uuid: currentUuid },
                  not_has_subs: currentUuid,
                }"
                class="q-mt-md"
              />
              <ChkRbacRole_alertEdit
                labelName="所属角色"
                :ajaxParams="{
                  '__prefloads__[]': ['RbacRoles'],
                  uuid: currentUuid,
                }"
                class="q-mt-md"
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
import ChkRbacRole_alertCreate from "src/components/ChkRbacRole_alertCreate.vue";
import ChkRbacRole_alertEdit from "src/components/ChkRbacRole_alertEdit.vue";
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
let columns = [
  {
    name: "index",
    label: "#",
    field: "index",
  },
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
let rows = ref([]);

// 表格数据
let name_search = ref("");
let uri_search = ref("");
let description_search = ref("");
let parentUuid_search = ref("");
let selRbacMenu_search_enable = ref(true);
let rbacRoleUuid_search = ref("");
let selected = ref("");

// 新建菜单对话框
let alertCreateRbacMenu = ref(false);
let name_alertCreateRbacMenu = ref("");
let uri_alertCreateRbacMenu = ref("");
let description_alertCreateRbacMenu = ref("");
let parentUuid_alertCreateRbacMenu = ref("");
let rbacRoleUuids_alertCreateRbacMenu = ref([]);

// 编辑菜单对话框
let alertEditRbacMenu = ref(false);
let rbacMenus_alertEditRbacMenu = ref([]);
let currentUuid = ref("");
let name_alertEditRbacMenu = ref("");
let uri_alertEditRbacMenu = ref("");
let description_alertEditRbacMenu = ref("");
let parentUuid_alertEditRbacMenu = ref("");
let rbacRoleUuids_alertEditRbacMenu = ref([]);

provide("parentUuid_search", parentUuid_search);
provide("parentUuid_alertCreate", parentUuid_alertCreateRbacMenu);
provide("parentUuid_alertEdit", parentUuid_alertEditRbacMenu);
provide("rbacRoleUuid_search", rbacRoleUuid_search);
provide("checkedRbacRoleUuids_alertCreate", rbacRoleUuids_alertCreateRbacMenu);
provide("checkedRbacRoleUuids_alertEdit", rbacRoleUuids_alertEditRbacMenu);

onMounted(() => {
  fnInit();
});

/**
 * 初始化页面
 */
let fnInit = () => {
  fnSearch();
};
/**
 * 重置搜索栏
 */
let fnResetSearch = () => {
  name_search.value = "";
  uri_search.value = "";
  description_search.value = "";
  parentUuid_search.value = "";
  rbacRoleUuid_search.value = "";
};
/**
 * 搜索
 */
let fnSearch = () => {
  rows.value = [];
  ajaxRbacMenuList({
    "__preloads__[]": ["Parent", "RbacRoles"],
    name: name_search.value,
    uri: uri_search.value,
    description: description_search.value,
    parent_uuid: parentUuid_search.value,
    rbac_role_uuid: rbacRoleUuid_search.value,
  })
    .then((res) => {
      if (res.content.rbac_menus.length > 0) {
        collect(res.content.rbac_menus).each((rbacMenu, idx) => {
          rows.value.push({
            index: idx,
            name: rbacMenu.name,
            uri: rbacMenu.uri,
            description: rbacMenu.description,
            parentName: rbacMenu.parent,
            rbacRoles: rbacMenu.rbac_roles || [],
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
 * 获取选中的行
 */
let getSelectedString = () => {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.value.length}`;
};
/**
 * 重置新建菜单对话框
 */
let fnResetAlertCreateRbace = () => {
  name_alertCreateRbacMenu.value = "";
  uri_alertCreateRbacMenu.value = "";
  description_alertCreateRbacMenu.value = "";
  parentUuid_alertCreateRbacMenu.value = "";
  rbacRoleUuids_alertCreateRbacMenu.value = [];
};
/**
 * 打开新建菜单对话框
 */
let fnOpenAlertCreateRbacMenu = () => {
  fnResetAlertCreateRbace();
  alertCreateRbacMenu.value = true;
};
/**
 * 新建菜单
 */
let fnStoreRbacMenu = () => {
  let loading = loadingNotify();

  ajaxRbacMenuStore({
    name: name_alertCreateRbacMenu.value,
    uri: uri_alertCreateRbacMenu.value,
    description: description_alertCreateRbacMenu.value,
    parent_uuid: parentUuid_alertCreateRbacMenu.value,
    rbac_role_uuids: rbacRoleUuids_alertCreateRbacMenu.value,
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
let fnResetAlertEditRbacMenu = () => {
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
let fnOpenAlertEditRbacMenu = (params = {}) => {
  if (!params.hasOwnProperty("uuid")) return;
  if (!params.uuid) return;

  fnResetAlertEditRbacMenu();
  currentUuid.value = params.uuid;

  ajaxRbacMenuDetail(currentUuid.value, {
    "__preloads__[]": ["Parent", "RbacRoles"],
  })
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
let fnUpdateRbacMenu = () => {
  if (!currentUuid.value) return;
  let loading = loadingNotify();
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
let fnDeleteRbacMenu = (params = {}) => {
  if (!params.uuid) return;

  actionNotify(
    getDestroyActions(() => {
      let loading = loadingNotify();
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
