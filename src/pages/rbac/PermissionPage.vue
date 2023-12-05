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
                  <q-select
                    filled
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

<script>
import { defineComponent } from "vue";
import {
  ajaxRbacRoleList,
  ajaxRbacPermissionList,
  ajaxRbacPermissionDetail,
  ajaxRbacPermissionStore,
  ajaxRbacPermissionUpdate,
  ajaxRbacPermissionDelete,
} from "../../apis/rbac";
import {
  errorNotify,
  successNotify,
  actionNotify,
  getDefaultActions,
} from "../../tools/notify";
import collect from "collect.js";

export default defineComponent({
  name: "PermissionPage",
  data() {
    return {
      name_search: "",
      uri_search: "",
      rbacRoleUuid_search: "",
      rbacRoles: [],
      alertCreateRbacPermission: false,
      name_alertCreateRbacPermission: "",
      uri_alertCreateRbacPermission: "",
      description_alertCreateRbacPermission: "",
      currentUuid: "",
      alertEditRbacPermission: false,
      name_alertEditRbacPermission: "",
      uri_alertEditRbacPermission: "",
      description_alertEditRbacPermission: "",
      columns: [
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
      ],
      rows: [],
    };
  },
  mounted() {
    this.fnInit();
  },
  methods: {
    /**
     * 初始化页面
     */
    fnInit() {
      this.fnLoadRbacRoleList();
      this.fnSearch();
    },
    /**
     * 加载角色列表
     */
    fnLoadRbacRoleList() {
      ajaxRbacRoleList()
        .then((res) => {
          if (res.content.rbacRoles.length > 0) {
            collect(res.content.rbacRoles).each((rbacRole) => {
              this.rbacRoles.push({
                label: rbacRole.name,
                value: rbacRole.uuid,
              });
            });
          }
        })
        .catch((e) => {
          errorNotify(`加载角色列表错误 ${e.msg}`);
        });
    },
    /**
     * 搜索权限列表
     */
    fnSearch() {
      this.rows = [];

      ajaxRbacPermissionList(
        collect({
          name: this.name_search,
          uri: this.uri_search,
          rbac_role_uuid: this.rbacRoleUuid_search,
        })
          .filter((val) => {
            return !val;
          })
          .all()
      ).then((res) => {
        if (res.content.rbacPermissions.length > 0) {
          collect(res.content.rbacPermissions).each((rbacPermission) => {
            this.rows.push({
              name: rbacPermission.name,
              uri: rbacPermission.uri,
              description: rbacPermission.description,
              operation: { uuid: rbacPermission.uuid },
            });
          });
          console.log("rows", this.rows);
        }
      });
    },
    /**
     * 重置搜索条件
     */
    fnResetSearch() {
      this.name_search = "";
      this.uri_search = "";
      this.rbacRoleUuid_search = "";
    },
    /**
     * 下拉框筛选
     * @param {string} val
     * @param {string} update
     */
    fnSelRbacRoleFilter(val, update) {
      if (val === "") {
        update(() => {
          this.rbacRoleUuid_search = this.rbacRoleUuid_search;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.rbacRoleUuid_search = this.rbacRoleUuid_search.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    /**
     * 重置新建权限对话框
     */
    fnResetAlertCreateRbacPermission() {
      this.name_alertCreateRbacPermission = "";
      this.uri_alertCreateRbacPermission = "";
      this.description_alertCreateRbacPermission = "";
    },
    /**
     * 打开新建权限对话框
     */
    fnOpenAlertCreateRbacPermission() {
      this.fnResetAlertCreateRbacPermission();
      this.alertCreateRbacPermission = true;
    },
    /**
     * 新建权限
     */
    fnStoreRbacPermission() {
      ajaxRbacPermissionStore({
        name: this.name_alertCreateRbacPermission,
        uri: this.uri_alertCreateRbacPermission,
        description: this.description_alertCreateRbacPermission,
      })
        .then((res) => {
          successNotify(res.msg, 500, () => {
            this.fnSearch();
          });
        })
        .catch((e) => {
          errorNotify(e.msg, 5000);
        });
    },
    /**
     * 重置编辑权限对话框
     */
    fnResetAlertEditRbacPermission() {
      this.name_alertEditRbacPermission = "";
      this.uri_alertEditRbacPermission = "";
      this.description_alertEditRbacPermission = "";
    },
    /**
     * 打开编辑权限模态框
     * @param {{*}} params
     */
    fnOpenAlertEditRbacPermission(params = {}) {
      if (params.uuid) {
        this.fnResetAlertEditRbacPermission();
        this.currentUuid = params.uuid;
        ajaxRbacPermissionDetail(params.uuid).then((res) => {
          this.alertEditRbacPermission = true;
          this.name_alertEditRbacPermission = res.content.rbacPermission.name;
          this.uri_alertEditRbacPermission = res.content.rbacPermission.uri;
          this.description_alertEditRbacPermission =
            res.content.rbacPermission.description;
        });
      }
    },
    /**
     * 更新权限
     * @param {{*}} params
     */
    fnUpdateRbacPermission() {
      if (!this.currentUuid) return;

      ajaxRbacPermissionUpdate(this.currentUuid, {
        name: this.name_alertEditRbacPermission,
        uri: this.uri_alertEditRbacPermission,
        description: this.description_alertEditRbacPermission,
      })
        .then((res) => {
          successNotify(res.msg, 500, () => {
            this.fnSearch();
          });
        })
        .catch((e) => {
          errorNotify(e.msg, 5000);
        });
    },
    /**
     * 删除权限
     * @param {{*}} params
     */
    fnDeleteRbacPermission(params = {}) {
      actionNotify(
        getDefaultActions(() => {
          ajaxRbacPermissionDelete(params.uuid).then(
            successNotify("删除成功", 500, () => {
              this.fnSearch();
            })
          );
        })
      );
    },
  },
});
</script>
