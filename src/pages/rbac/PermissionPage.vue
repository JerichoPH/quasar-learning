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
              title="权限列表"
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
                  <q-td key="rbacRoles" :props="props"
                    >{{ props.row.rbacRoles.name }}
                  </q-td>
                  <q-td key="operation" :props="props">
                    <q-btn-group>
                      <q-btn
                        @click="
                          fnOpenAlertEditRbacPermission(props.row.operation)
                        "
                        color="warning"
                        icon="edit"
                      >
                        编辑
                      </q-btn>
                      <q-btn
                        @click="fnDestroyRbacPermission(props.row.operation)"
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
  <!-- 新建权限对话框 -->
  <q-dialog v-model="alertCreateRbacPermission">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">新建权限</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertCreateRbacPermission"
                label="名称"
                :rules="[]"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="uri_alertCreateRbacPermission"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertCreateRbacPermission"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <SelRbacRole_alertCreate
                label-name="所属角色"
                multiple
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
          @click="fnStoreRbacPermission"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 编辑权限对话框 -->
  <q-dialog v-model="alertEditRbacPermission">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">编辑权限</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertEditRbacPermission"
                label="名称"
                :rules="[]"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="uri_alertEditRbacPermission"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="description_alertEditRbacPermission"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <SelRbacRole_alertEdit
                label-name="所属角色"
                multiple
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
          color="warning"
          @click="fnUpdateRbacPermission"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, provide } from "vue";
import collect from "collect.js";
import SelRbacRole_search from "src/components/SelRbacRole_search.vue";
import SelRbacRole_alertCreate from "src/components/SelRbacRole_alertCreate.vue";
import SelRbacRole_alertEdit from "src/components/SelRbacRole_alertEdit.vue";
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

// 表格数据
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
    name: "rbacRoles",
    field: "rbacRoles",
    label: "相关角色",
    align: "left",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    label: "",
    align: "left",
    sortable: false,
  },
];
let rows = ref([]);

// 搜索条件
let name_search = ref("");
let uri_search = ref("");
let description_search = ref("");
let rbacRoleUuid_search = ref("");

// 新建权限对话框
let alertCreateRbacPermission = ref(false);
let name_alertCreateRbacPermission = ref("");
let uri_alertCreateRbacPermission = ref("");
let description_alertCreateRbacPermission = ref("");
let rbacRoleUuids_alertCreateRbacPermission = ref([]);

// 编辑权限对话框
let alertEditRbacPermission = ref(false);
let name_alertEditRbacPermission = ref("");
let uri_alertEditRbacPermission = ref("");
let description_alertEditRbacPermission = ref("");
let rbacRoleUuids_alertEditRbacPermission = ref([]);
let currentUuid = ref("");

provide("rbacRoleUuid_search", rbacRoleUuid_search);
provide("rbacRoleUuids_alertCreate", rbacRoleUuids_alertCreateRbacPermission);
provide("rbacRoleUuids_alertEdit", rbacRoleUuids_alertEditRbacPermission);

onMounted(() => {
  fnInit();
});

/**
 * 初始化
 */
let fnInit = () => {
  fnSearch();
};
let fnResetSearch = () => {
  name_search.value = "";
  uri_search.value = "";
  description_search.value = "";
  rbacRoleUuid_search.value = "";
};
/**
 * 搜索
 */
let fnSearch = () => {
  rows.value = [];

  ajaxRbacPermissionList({
    "__preloads__[]": ["RbacRoles"],
    name: name_search.value,
    uri: uri_search.value,
    description: description_search.value,
    rbac_role_uuid: rbacRoleUuid_search.value,
  })
    .then((res) => {
      if (res.content.rbac_permissions.length > 0) {
        collect(res.content.rbac_permissions).each((rbacPermission) => {
          rows.value.push({
            name: rbacPermission.name,
            uri: rbacPermission.uri,
            description: rbacPermission.description,
            rbacRoles: {
              name: collect(rbacPermission.rbac_roles)
                .pluck("name")
                .implode(","),
            },
            operation: { uuid: rbacPermission.uuid },
          });
        });
        console.log(rows.value);
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 重置新建权限对话框
 */
let fnResetAlertCreateRbacPermission = () => {
  name_alertCreateRbacPermission.value = "";
  uri_alertCreateRbacPermission.value = "";
  description_alertCreateRbacPermission.value = "";
  rbacRoleUuids_alertCreateRbacPermission.value = [];
};
/**
 * 打开新建权限对话框
 */
let fnOpenAlertCreateRbacPermission = () => {
  fnResetAlertCreateRbacPermission();
  alertCreateRbacPermission.value = true;
};
/**
 * 新建权限
 */
let fnStoreRbacPermission = () => {
  let loading = loadingNotify();

  ajaxRbacPermissionStore({
    name: name_alertCreateRbacPermission.value,
    uri: uri_alertCreateRbacPermission.value,
    description: description_alertCreateRbacPermission.value,
    rbac_role_uuids: rbacRoleUuids_alertCreateRbacPermission.value,
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
 * 重置编辑权限对话框
 */
let fnResetAlertEditRbacPermission = () => {
  name_alertEditRbacPermission.value = "";
  uri_alertEditRbacPermission.value = "";
  description_alertEditRbacPermission.value = "";
  rbacRoleUuids_alertEditRbacPermission.value = [];
};
/**
 * 打开编辑权限对话框
 * @param {{*}} params 参数
 */
let fnOpenAlertEditRbacPermission = (params = {}) => {
  if (!params["uuid"]) return;
  fnResetAlertEditRbacPermission();

  currentUuid.value = params.uuid;

  ajaxRbacPermissionDetail(params.uuid, { "__preloads__[]": ["RbacRoles"] })
    .then((res) => {
      name_alertEditRbacPermission.value = res.content.rbac_permission.name;
      uri_alertEditRbacPermission.value = res.content.rbac_permission.uri;
      description_alertEditRbacPermission.value =
        res.content.rbac_permission.description;

      alertEditRbacPermission.value = true;
      if (res.content.rbac_permission.rbac_roles.length > 0) {
        rbacRoleUuids_alertEditRbacPermission.value = collect(
          res.content.rbac_permission.rbac_roles
        )
          .pluck("uuid")
          .all();
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 编辑权限
 */
let fnUpdateRbacPermission = () => {
  if (!currentUuid.value) return;

  let loading = loadingNotify();

  ajaxRbacPermissionUpdate(currentUuid.value, {
    name: name_alertEditRbacPermission.value,
    uri: uri_alertEditRbacPermission.value,
    description: description_alertEditRbacPermission.value,
    rbac_role_uuids: rbacRoleUuids_alertEditRbacPermission.value,
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
 * 删除权限
 * @param {{*}} params 参数
 */
let fnDestroyRbacPermission = (params = {}) => {
  if (!params["uuid"]) return;

  let loading = loadingNotify();
  actionNotify(
    getDestroyActions(() => {
      ajaxRbacPermissionDestory(params.uuid)
        .then((res) => {
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
