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
                label="添加角色"
                icon="add"
                @click="fnOpenAlertCreateRbacRole"
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
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col">
            <q-table
              flat
              bordered
              title="角色列表"
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
                  <q-td key="operation" :props="props">
                    <q-btn-group>
                      <q-btn
                        @click="fnOpenAlertEditRbacRole(props.row.operation)"
                        color="warning"
                        icon="edit"
                      >
                        编辑
                      </q-btn>
                      <q-btn
                        @click="fnDestroyRbacRole(props.row.operation)"
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
  <!-- 新建角色对话框 -->
  <q-dialog v-model="alertCreateRbacRole">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">新建角色</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertCreateRbacRole"
                label="名称"
                :rules="[]"
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
          @click="fnStoreRbacRole"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 编辑角色对话框 -->
  <q-dialog v-model="alertEditRbacRole">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">编辑角色</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit.prevent="">
          <div class="row">
            <div class="col">
              <q-input
                outlined
                clearable
                lazy-rules
                v-model="name_alertEditRbacRole"
                label="名称"
                :rules="[]"
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
          @click="fnUpdateRbacRole"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import collect from "collect.js";
import {
  ajaxRbacRoleList,
  ajaxRbacRoleDetail,
  ajaxRbacRoleStore,
  ajaxRbacRoleUpdate,
  ajaxRbacRoleDestroy,
} from "src/apis/rbac";
import {
  loadingNotify,
  errorNotify,
  successNotify,
  actionNotify,
  getDestroyActions,
} from "src/tools/notify";

let name_search = ref("");
let columns = [
  {
    name: "name",
    field: "name",
    label: "名称",
    align: "left",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    label: "操作",
    align: "left",
    sortable: true,
  },
];
let rows = ref([]);
let alertCreateRbacRole = ref(false);
let name_alertCreateRbacRole = ref("");
let alertEditRbacRole = ref(false);
let name_alertEditRbacRole = ref("");
let currentUuid = ref("");

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
 * 搜索
 */
let fnSearch = () => {
  rows.value = [];

  ajaxRbacRoleList(
    collect({
      name: name_search.value,
    })
      .filter((val) => !val)
      .all()
  ).then((res) => {
    if (res.content.rbacRoles.length > 0) {
      collect(res.content.rbacRoles).each((rbacRole) => {
        rows.value.push({
          name: rbacRole.name,
          operation: { uuid: rbacRole.uuid },
        });
      });
    }
  });
};
/**
 * 重置新建角色对话框
 */
let fnResetAlertCreateRbacRole = () => {
  name_alertCreateRbacRole.value = "";
};
/**
 * 打开新建角色对话框
 */
let fnOpenAlertCreateRbacRole = () => {
  fnResetAlertCreateRbacRole();
  alertCreateRbacRole.value = true;
};
/**
 * 新建角色
 */
let fnStoreRbacRole = () => {
  let loading = loadingNotify();

  ajaxRbacRoleStore({
    name: name_alertCreateRbacRole.value,
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
 * 重置编辑角色对话框
 */
let fnResetAlertEditRbacRole = () => {
  name_alertEditRbacRole.value = "";
};
/**
 * 打开编辑角色对话框
 */
let fnOpenAlertEditRbacRole = (params = {}) => {
  if (!params["uuid"]) return;

  fnResetAlertEditRbacRole();
  currentUuid.value = params.uuid;

  ajaxRbacRoleDetail(currentUuid.value)
    .then((res) => {
      if (res.content.rbacRole) {
        name_alertEditRbacRole.value = res.content.rbacRole.name;
        alertEditRbacRole.value = true;
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 编辑角色
 */
let fnUpdateRbacRole = () => {
  if (!currentUuid.value) return;

  ajaxRbacRoleUpdate(currentUuid.value, {
    name: name_alertEditRbacRole.value,
  })
    .then((res) => {
      successNotify(res.msg);
      fnSearch();
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 删除角色
 */
let fnDestroyRbacRole = (params = {}) => {
  if (!params["uuid"]) return;

  actionNotify(
    getDestroyActions(() => {
      let loading = loadingNotify();

      ajaxRbacRoleDestroy(params.uuid)
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
