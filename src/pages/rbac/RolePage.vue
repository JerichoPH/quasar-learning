<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row margin-top-1">
          <div class="col">
            <span style="font-size: 20px">搜索</span>
          </div>
          <div class="col text-right">
            <q-btn-group right>
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
          <div class="col-3">
            <q-form>
              <div class="row q-gutter-sm">
                <div class="col">
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
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">{{ props.row.name }}</q-td>
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
                        @click="fnDeleteRbacRole(props.row.operation)"
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

  <!-- Dialog -->
  <!-- 新建角色对话框 -->
  <q-dialog v-model="alertCreateRbacRole">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">新建角色</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
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
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <input type="hidden" v-mode="currentUuid" />
              <q-input
                filled
                v-model="name_alertEditRbacRole"
                label="名称"
                lazy-rules
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
<script steup>
import { onMounted, ref } from "vue";
import {
  ajaxRbacRoleList,
  ajaxRbacRoleDetail,
  ajaxRbacRoleStore,
  ajaxRbacRoleUpdate,
  ajaxRbacRoleDelete,
} from "../../apis/rbac";
import {
  successNotify,
  errorNotify,
  actionNotify,
  getDeleteActions,
} from "src/tools/notify";
import collect from "collect.js";

const name_search = ref("");
const alertCreateRbacRole = ref(false);
const name_alertCreateRbacRole = ref("");
const currentUuid = ref("");
const alertEditRbacRole = ref(false);
const name_alertEditRbacRole = ref("");
const columns = [
  {
    name: "name",
    label: "名称",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "operation",
    lable: "操作",
    align: "left",
    field: "operation",
    sortable: false,
  },
];
const rows = ref([]);

onMounted(() => {
  fnInit();
});

const fnInit = () => {
  ajaxRbacRoleList().then((res) => {
    fnSearch();
  });
};

const fnSearch = () => {
  this.rows = [];

  ajaxRbacRoleList(
    collect({ name: name_search.value })
      .filter((val) => {
        return !val;
      })
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

const fnResetSearch = () => {
  this.name_search = "";
};

const fnOpenAlertCreateRbacRole = () => {
  this.alertCreateRbacRole = true;
};

const fnStoreRbacRole = () => {
  ajaxRbacRoleStore({
    name: name_alertCreateRbacRole.value,
  })
    .then((res) => {
      successNotify(res.msg, 500, () => {
        fnSearch();
      });
    })
    .catch((e) => {
      errorNotify(e.msg, 500);
    });
};
const fnOpenAlertEditRbacRole = (params = {}) => {
  if (params.uuid) {
    ajaxRbacRoleDetail(params.uuid).then((res) => {
      name_alertEditRbacRole.value = res.content.rbacRole.name;
      alertEditRbacRole.value = true;
      currentUuid.value = params.uuid;
    });
  }
};

const fnUpdateRbacRole = () => {
  if (!currentUuid.value) return;

  ajaxRbacRoleUpdate(currentUuid.value, {
    name: name_alertEditRbacRole.value,
  })
    .then((res) => {
      successNotify(res.msg, 500, () => {
        fnSearch();
      });
    })
    .catch((e) => {
      errorNotify(e.msg, 500);
    });
};

const fnDeleteRbacRole = (params = {}) => {
  actionNotify(
    getDeleteActions(() => {
      // 执行删除
      ajaxRbacRoleDelete(params.uuid).then((res) => {
        successNotify("删除成功", 500, () => {
          fnSearch();
        });
      });
    })
  );
};
</script>
