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
                <div class="col-3">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="username_search"
                    label="账号"
                    :rules="[]"
                    class="q-mb-md"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    outlined
                    clearable
                    lazy-rules
                    v-model="nickname_search"
                    label="昵称"
                    :rules="[]"
                    class="q-mb-md"
                  />
                </div>
                <div class="col-3">
                  <sel-rbac-role_search label-name="所属角色" />
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
              title="用户列表"
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
                  <q-td>{{ props.row.index }}</q-td>
                  <q-td key="username" :props="props">
                    {{ props.row.username }}
                  </q-td>
                  <q-td key="nickname" :props="props">
                    {{ props.row.nickname }}
                  </q-td>
                  <q-td key="rbac_roles" :props="props">
                    <q-chip
                      v-for="(rbacRole, idx) in props.row.rbac_roles"
                      :key="idx"
                      color="primary"
                      text-color="white"
                    >
                      {{ rbacRole.name }}
                    </q-chip>
                  </q-td>
                  <q-td key="operation" :props="props">
                    <q-btn-group>
                      <q-btn
                        @click="fnOpenAlertEditAccount(props.row.operation)"
                        color="warning"
                        icon="edit"
                      >
                        编辑
                      </q-btn>
                      <q-btn
                        @click="fnOpenAlertEditPassword(props.row.operation)"
                        color="warning"
                        icon="lock"
                      >
                        重置密码
                      </q-btn>
                      <q-btn
                        @click="fnDestroyAccount(props.row.operation)"
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
  <!-- 新建用户对话框 -->
  <q-dialog v-model="alertCreateAccount">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">新建用户</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="username_alertCreateAccount"
                label="账号"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="nickname_alertCreateAccount"
                label="昵称"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                type="password"
                v-model="password_alertCreateAccount"
                label="密码"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                type="password"
                v-model="passwordConfirmation_alertCreateAccount"
                label="确认密码"
                :rules="[]"
                class="q-mb-md"
              />
              <chk-rbac-role_alert-create lable-name="所属角色" />
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
          @click="fnStoreAccount"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 编辑用户对话框 -->
  <q-dialog v-model="alertEditAccount">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">编辑用户</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="username_alertEditAccount"
                label="账号"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="nickname_alertEditAccount"
                label="昵称"
                :rules="[]"
                class="q-mb-md"
              />
              <chk-rbac-role_alert-edit lable-name="所属角色" />
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
          @click="fnUpdateAccount"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 编辑密码对话框 -->
  <q-dialog v-model="alertEditPassword">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">编辑密码</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="oldPassword_alertEditPassword"
                label="旧密码"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="password_alertEditPassword"
                label="旧密码"
                :rules="[]"
                class="q-mb-md"
              />
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="passwordConfirmation_alertEditPassword"
                label="旧密码"
                :rules="[]"
                class="q-mb-md"
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
          color="negative"
          @click="fnUpdatePassword"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
  ajaxAccountUpdatePassword,
} from "src/apis/account";
import {
  loadingNotify,
  successNotify,
  errorNotify,
  actionNotify,
  getDestroyActions,
} from "src/utils/notify";
import SelRbacRole_search from "src/components/SelRbacRole_search.vue";
import ChkRbacRole_alertCreate from "src/components/ChkRbacRole_alertCreate.vue";
import ChkRbacRole_alertEdit from "src/components/ChkRbacRole_alertEdit.vue";

// 搜索栏数据
let username_search = ref("");
let nickname_search = ref("");
let rbacRoleUuid_search = ref("");

// 表格数据
let columns = [
  {
    name: "index",
    field: "index",
    label: "#",
    align: "left",
  },
  {
    name: "username",
    field: "username",
    label: "用户名",
    align: "left",
    sortable: true,
  },
  {
    name: "nickname",
    field: "nickname",
    label: "昵称",
    align: "left",
    sortable: true,
  },
  {
    name: "rbac_roles",
    field: "rbac_roles",
    label: "所属角色",
    align: "left",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    label: "",
    align: "right",
  },
];
let rows = ref([]);

// 新建用户对话框数据
let alertCreateAccount = ref(false);
let username_alertCreateAccount = ref("");
let nickname_alertCreateAccount = ref("");
let password_alertCreateAccount = ref("");
let passwordConfirmation_alertCreateAccount = ref("");
let rbacRoleUuids_alertCreateAccount = ref([]);

// 编辑用户对话框数据
let alertEditAccount = ref(false);
let username_alertEditAccount = ref("");
let nickname_alertEditAccount = ref("");
let rbacRoleUuids_alertEditAccount = ref([]);
let currentUuid = ref("");

//  编辑密码对话框数据
let alertEditPassword = ref(false);
let oldPassword_alertEditPassword = ref("");
let password_alertEditPassword = ref("");
let passwordConfirmation_alertEditPassword = ref("");

provide("rbacRoleUuid_search", rbacRoleUuid_search);
provide("checkedRbacRoleUuids_alertCreate", rbacRoleUuids_alertCreateAccount);
provide("checkedRbacRoleUuids_alertEdit", rbacRoleUuids_alertEditAccount);

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
 * 重置搜索栏条件
 */
let fnResetSearch = () => {
  username_search.value = "";
  nickname_search.value = "";
  rbacRoleUuid_search.value = "";
};
/**
 * 搜索
 */
let fnSearch = () => {
  ajaxAccountList({
    "__preloads__[]": ["RbacRoles"],
    username: username_search.value,
    nickname: nickname_search.value,
    rbac_role_uuid_search: rbacRoleUuid_search.value,
  })
    .then((res) => {
      rows.value = [];

      if (res.content.accounts.length > 0) {
        collect(res.content.accounts).each((account, idx) => {
          rows.value.push({
            index: idx + 1,
            username: account.username,
            nickname: account.nickname,
            rbac_roles: account.rbac_roles || [],
            operation: { uuid: account.uuid },
          });
        });
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 重置新建用户对话框
 */
let fnResetAlertCreateAccount = () => {
  username_alertCreateAccount.value = "";
  nickname_alertCreateAccount.value = "";
  password_alertCreateAccount.value = "";
  passwordConfirmation_alertCreateAccount.value = "";
  rbacRoleUuids_alertCreateAccount.value = [];
};
/**
 * 打开新建用户对话框
 */
let fnOpenAlertCreateAccount = () => {
  alertCreateAccount.value = true;
};
/**
 * 新建用户
 */
let fnStoreAccount = () => {
  let loading = loadingNotify();
  ajaxAccountStore({
    username: username_alertCreateAccount.value,
    nickname: nickname_alertCreateAccount.value,
    password: password_alertCreateAccount.value,
    password_confirmation: passwordConfirmation_alertCreateAccount.value,
    rbac_role_uuids: rbacRoleUuids_alertCreateAccount.value,
  })
    .then((res) => {
      successNotify(res.msg);
      fnSearch();
      fnResetAlertCreateAccount();
    })
    .catch((e) => {
      errorNotify(e.msg);
    })
    .finally(() => {
      loading();
    });
};
/**
 * 重置编辑用户对话框
 */
let fnResetAlertEditAccount = () => {
  username_alertEditAccount.value = "";
  nickname_alertEditAccount.value = "";
  rbacRoleUuids_alertEditAccount.value = [];
};
/**
 * 打开编辑用户对话框
 */
let fnOpenAlertEditAccount = (params = {}) => {
  if (!params["uuid"]) return;

  currentUuid.value = params.uuid;

  ajaxAccountDetail(currentUuid.value, { "__preloads__[]": ["RbacRoles"] })
    .then((res) => {
      username_alertEditAccount.value = res.content.account.username;
      nickname_alertEditAccount.value = res.content.account.nickname;
      rbacRoleUuids_alertEditAccount.value = collect(
        res.content.account.rbac_roles
      )
        .pluck("uuid")
        .all();
      alertEditAccount.value = true;
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 编辑用户
 */
let fnUpdateAccount = () => {
  if (!currentUuid.value) return;

  let loading = loadingNotify();

  ajaxAccountUpdate(currentUuid.value, {
    username: username_alertEditAccount.value,
    nickname: nickname_alertEditAccount.value,
    rbac_role_uuids: rbacRoleUuids_alertEditAccount.value,
  })
    .then((res) => {
      successNotify(res.msg);
      fnSearch();
      fnResetAlertEditAccount();
    })
    .catch((e) => {
      errorNotify(e.msg);
    })
    .finally(() => {
      loading();
    });
};
/**
 * 删除用户
 * @param {{*}} params 参数
 */
let fnDestroyAccount = (params = {}) => {
  if (!params["uuid"]) return;

  actionNotify(
    getDestroyActions(() => {
      let loading = loadingNotify();

      ajaxAccountDestroy(params.uuid)
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
/**
 * 重置密码对话框
 */
let fnResetAlertEditPassword = () => {
  oldPassword_alertEditPassword.value = "";
  password_alertEditPassword.value = "";
  passwordConfirmation_alertEditPassword.value = "";
};
/**
 * 打开编辑密码对话框
 */
let fnOpenAlertEditPassword = (params = {}) => {
  if (!params["uuid"]) return;
  currentUuid.value = params.uuid;
  alertEditPassword.value = true;
};
/**
 * 编辑密码
 */
let fnUpdatePassword = () => {
  if (!currentUuid.value) return;

  let loading = loadingNotify();
  ajaxAccountUpdatePassword(currentUuid.value, {
    old_password: oldPassword_alertEditPassword.value,
    password: password_alertEditPassword.value,
    password_confirmation: passwordConfirmation_alertEditPassword.value,
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
</script>
