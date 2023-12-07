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
                label="添加权限"
                icon="add"
                @click="fnOpenAlertCreateRbacPermission"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row margin-top-1">
          <div class="col">
            <q-form>
              <div class="row q-gutter-sm">
                <div class="col-3">
                  <q-input
                    filled
                    clearable
                    lazy-rules
                    v-model="name_search"
                    label="名称"
                    :rules="[]"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    filled
                    clearable
                    lazy-rules
                    v-model="uri_search"
                    label="路由"
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
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                  <q-td key="uri" :props="props">{{ props.row.uri }}</q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.description }}
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
                        @click="fnDeleteRbacPermission(props.row.operation)"
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
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
                clearable
                lazy-rules
                v-model="name_alertCreateRbacPermission"
                label="名称"
                :rules="[]"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="uri_alertCreateRbacPermission"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="description_alertCreateRbacPermission"
                label="描述"
                :rules="[]"
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
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
                clearable
                lazy-rules
                v-model="name_alertEditRbacPermission"
                label="名称"
                :rules="[]"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="uri_alertEditRbacPermission"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="description_alertEditRbacPermission"
                label="描述"
                :rules="[]"
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
import { onMounted, ref } from "vue";
import {
  ajaxRbacRoleList,
  ajaxRbacPermissionList,
  ajaxRbacPermissionDetail,
  ajaxRbacPermissionStore,
  ajaxRbacPermissionUpdate,
  ajaxRbacPermissionDelete,
} from "src/apis/rbac";
import {
  errorNotify,
  successNotify,
  actionNotify,
  getDeleteActions,
} from "src/tools/notify";
import collect from "collect.js";
import SelRbacRole_search from "src/components/SelRbacRole_search.vue";

const name_search = ref("");
const uri_search = ref("");
const rbacRoleUuid_search = ref("");
const rbacRoles = ref([]);
const alertCreateRbacPermission = ref(false);
const name_alertCreateRbacPermission = ref("");
const uri_alertCreateRbacPermission = ref("");
const description_alertCreateRbacPermission = ref("");
const currentUuid = ref("");
const alertEditRbacPermission = ref(false);
const name_alertEditRbacPermission = ref("");
const uri_alertEditRbacPermission = ref("");
const description_alertEditRbacPermission = ref("");
const columns = [
  {
    name: "name",
    label: "名称",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "uri",
    label: "路由",
    align: "left",
    field: "uri",
    sortable: true,
  },
  {
    name: "description",
    label: "描述",
    align: "left",
    field: "description",
    sortable: true,
  },
  {
    name: "operation",
    label: "操作",
    align: "left",
    field: "operation",
    sortable: false,
  },
];
const rows = ref([]);

onMounted(() => {
  fnInit();
});

/**
 * 初始化页面
 */
const fnInit = () => {
  fnLoadRbacRoleList();
  fnSearch();
};
/**
 * 加载角色列表
 */
const fnLoadRbacRoleList = () => {
  ajaxRbacRoleList()
    .then((res) => {
      if (res.content.rbacRoles.length > 0) {
        collect(res.content.rbacRoles).each((rbacRole) => {
          rbacRoles.value.push({
            label: rbacRole.name,
            value: rbacRole.uuid,
          });
        });
      }
    })
    .catch((e) => {
      errorNotify(`加载角色列表错误 ${e.msg}`);
    });
};
/**
 * 搜索权限列表
 */
const fnSearch = () => {
  this.rows = [];

  ajaxRbacPermissionList(
    collect({
      name: name_search.value,
      uri: uri_search.value,
      rbac_role_uuid: rbacRoleUuid_search.value,
    })
      .filter((val) => {
        return !val;
      })
      .all()
  ).then((res) => {
    if (res.content.rbacPermissions.length > 0) {
      collect(res.content.rbacPermissions).each((rbacPermission) => {
        rows.value.push({
          name: rbacPermission.name,
          uri: rbacPermission.uri,
          description: rbacPermission.description,
          operation: { uuid: rbacPermission.uuid },
        });
      });
    }
  });
};
/**
 * 重置搜索条件
 */
const fnResetSearch = () => {
  name_search.value = "";
  uri_search.value = "";
  rbacRoleUuid_search.value = "";
};
/**
 * 下拉框筛选
 * @param {string} val
 * @param {string} update
 */
const fnSelRbacRoleFilter = (val, update) => {
  if (val === "") {
    update(() => {
      rbacRoleUuid_search.value = rbacRoleUuid_search.value;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    rbacRoleUuid_search.value = this.rbacRoleUuid_search.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
/**
 * 重置新建权限对话框
 */
const fnResetAlertCreateRbacPermission = () => {
  name_alertCreateRbacPermission.value = "";
  uri_alertCreateRbacPermission.value = "";
  description_alertCreateRbacPermission.value = "";
};
/**
 * 打开新建权限对话框
 */
const fnOpenAlertCreateRbacPermission = () => {
  fnResetAlertCreateRbacPermission();
  alertCreateRbacPermission.value = true;
};
/**
 * 新建权限
 */
const fnStoreRbacPermission = () => {
  ajaxRbacPermissionStore({
    name: name_alertCreateRbacPermission.value,
    uri: uri_alertCreateRbacPermission.value,
    description: description_alertCreateRbacPermission.value,
  })
    .then((res) => {
      successNotify(res.msg, 500, () => {
        fnSearch();
      });
    })
    .catch((e) => {
      errorNotify(e.msg, 5000);
    });
};
/**
 * 重置编辑权限对话框
 */
const fnResetAlertEditRbacPermission = () => {
  name_alertEditRbacPermission.value = "";
  uri_alertEditRbacPermission.value = "";
  description_alertEditRbacPermission.value = "";
};
/**
 * 打开编辑权限模态框
 * @param {{*}} params
 */
const fnOpenAlertEditRbacPermission = (params = {}) => {
  if (params.uuid) {
    fnResetAlertEditRbacPermission();
    currentUuid.value = params.uuid;
    ajaxRbacPermissionDetail(params.uuid).then((res) => {
      alertEditRbacPermission.value = true;
      name_alertEditRbacPermission.value = res.content.rbacPermission.name;
      uri_alertEditRbacPermission.value = res.content.rbacPermission.uri;
      description_alertEditRbacPermission.value =
        res.content.rbacPermission.description;
    });
  }
};
/**
 * 更新权限
 * @param {{*}} params
 */
const fnUpdateRbacPermission = () => {
  if (!this.currentUuid) return;

  ajaxRbacPermissionUpdate(this.currentUuid, {
    name: name_alertEditRbacPermission.value,
    uri: uri_alertEditRbacPermission.value,
    description: description_alertEditRbacPermission.value,
  })
    .then((res) => {
      successNotify(res.msg, 500, () => {
        fnSearch();
      });
    })
    .catch((e) => {
      errorNotify(e.msg, 5000);
    });
};
/**
 * 删除权限
 * @param {{*}} params
 */
const fnDeleteRbacPermission = (params = {}) => {
  if (!params["uuid"]) return;

  actionNotify(
    getDeleteActions(() => {
      const loading = loadingNotify();
      ajaxRbacPermissionDelete(params.uuid)
        .then(() => {
          successNotify("删除成功", 500, () => {
            fnSearch();
          });
        })
        .catch((e) => {
          errorNotify(e.msg, 5000);
        })
        .finally(() => {
          loading.close();
        });
    })
  );
};
</script>
