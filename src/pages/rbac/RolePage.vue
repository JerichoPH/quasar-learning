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
                    filled
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
                  <!-- <q-td key="index" :props="props">
                    {{
                      (track_pagination.page - 1) *
                        track_pagination.rowsPerPage +
                      props.row.index +
                      1
                    }}
                  </q-td>
                  <q-td
                    key="equipment_unique_code"
                    :props="props"
                    class="text-blue-9"
                    @click="jump(props.row.equipment_unique_code)"
                  >
                    {{ props.row.equipment_unique_code }}
                  </q-td>
                  <q-td
                    v-for="col in props.cols.slice(2)"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td> -->
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
<script>
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

export default {
  data() {
    return {
      name_search: "",
      alertCreateRbacRole: false,
      name_alertCreateRbacRole: "",
      currentUuid: "",
      alertEditRbacRole: false,
      name_alertEditRbacRole: "",
      columns: [
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
      ],
      rows: [],
    };
  },
  mounted() {
    this.fnInit();
  },
  methods: {
    /**
     * 初始化
     */
    fnInit() {
      ajaxRbacRoleList().then((res) => {
        this.fnSearch();
      });
    },
    /**
     * 搜索
     */
    fnSearch() {
      this.rows = [];

      ajaxRbacRoleList(
        collect({ name: this.name_search })
          .filter((val) => {
            return !val;
          })
          .all()
      ).then((res) => {
        if (res.content.rbacRoles.length > 0) {
          collect(res.content.rbacRoles).each((rbacRole) => {
            this.rows.push({ ...rbacRole, operation: { uuid: rbacRole.uuid } });
          });
        }
      });
    },
    /**
     * 重置搜索框
     */
    fnResetSearch() {
      this.name_search = "";
    },

    /**
     * 打开新建角色对话框
     */
    fnOpenAlertCreateRbacRole() {
      this.alertCreateRbacRole = true;
    },

    /**
     * 新建角色
     */
    fnStoreRbacRole() {
      ajaxRbacRoleStore({
        name: this.name_alertCreateRbacRole,
      })
        .then((res) => {
          successNotify(res.msg, 500, () => {
            this.fnSearch();
          });
        })
        .catch((e) => {
          errorNotify(e.msg, 500);
        });
    },

    /**
     * 打开编辑角色对话框
     * @param {{*}} params
     */
    fnOpenAlertEditRbacRole(params = {}) {
      if (params.uuid) {
        ajaxRbacRoleDetail(params.uuid).then((res) => {
          this.name_alertEditRbacRole = res.content.rbacRole.name;
          this.alertEditRbacRole = true;
          this.currentUuid = params.uuid;
        });
      }
    },

    /**
     * 编辑角色
     */
    fnUpdateRbacRole() {
      if (!this.currentUuid) return;

      ajaxRbacRoleUpdate(this.currentUuid, {
        name: this.name_alertEditRbacRole,
      })
        .then((res) => {
          successNotify(res.msg, 500, () => {
            this.fnSearch();
          });
        })
        .catch((e) => {
          errorNotify(e.msg, 500);
        });
    },

    /**
     * 删除角色
     * @param {{*}} params
     */
    fnDeleteRbacRole(params = {}) {
      actionNotify(
        getDeleteActions(() => {
          // 执行删除
          ajaxRbacRoleDelete(params.uuid).then((res) => {
            successNotify("删除成功", 500, () => {
              this.fnSearch();
            });
          });
        })
      );
    },
  },
};
</script>
