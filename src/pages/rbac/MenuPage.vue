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
                label="添加菜单"
                icon="add"
                @click="fnOpenAlertCreateRbacMenu"
              />
            </q-btn-group>
          </div>
        </div>
        <q-form class="row q-gutter-sm margin-top-1">
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
          <div class="col">
            <q-input
              filled
              clearable
              lazy-rules
              v-model="uri_search"
              label="路由"
              :rules="[]"
            />
          </div>
          <div class="col">
            <q-input
              filled
              clearable
              lazy-rules
              v-model="description_search"
              label="描述"
              :rules="[]"
            />
          </div>
          <div class="col">
            <q-select
              filled
              use-input
              clearable
              v-model="parentUuid_search"
              :options="rbacMenus_search"
              @filter="fnSelParentMenuFilter"
              label="所属父级"
              emit-value
              map-options
            />
          </div>
        </q-form>
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
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
                clearable
                lazy-rules
                v-model="name_alertCreateRbacMenu"
                label="名称"
                :rules="[]"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="uri_alertCreateRbacMenu"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="description_alertCreateRbacMenu"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <q-select
                filled
                use-input
                clearable
                v-model="parentUuid_alertCreateRbacMenu"
                :options="rbacMenus_search"
                @filter="fnSelParentMenuFilter"
                label="所属父级"
                emit-value
                map-options
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
        <q-form class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
                clearable
                lazy-rules
                v-model="name_alertEditRbacMenu"
                label="名称"
                :rules="[]"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="uri_alertEditRbacMenu"
                label="路由"
                :rules="[]"
                class="margin-top-1"
              />
              <q-input
                filled
                clearable
                lazy-rules
                v-model="description_alertEditRbacMenu"
                label="描述"
                :rules="[]"
                class="margin-top-1"
              />
              <q-select
                filled
                use-input
                clearable
                v-model="parentUuid_alertEditRbacMenu"
                :options="rbacMenus_alertEditRbacMenu"
                @filter="fnSelParentMenuFilter"
                label="所属父级"
                emit-value
                map-options
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
<script>
import { defineComponent } from "vue";
import {
  ajaxRbacMenuDelete,
  ajaxRbacMenuDetail,
  ajaxRbacMenuList,
  ajaxRbacMenuStore,
  ajaxRbacMenuUpdate,
} from "src/apis/rbac";
import {
  successNotify,
  errorNotify,
  loadingNotify,
  actionNotify,
  getDeleteActions,
  getErrorActions,
} from "src/tools/notify";
import { collect } from "collect.js";

export default defineComponent({
  name: "MenuPage",
  data() {
    return {
      alertCreateRbacMenu: false,
      alertEditRbacMenu: false,
      name_search: "",
      uri_search: "",
      description_search: "",
      parentUuid_search: "",
      rbacMenus_search: [],
      name_alertCreateRbacMenu: "",
      uri_alertCreateRbacMenu: "",
      description_alertCreateRbacMenu: "",
      parentUuid_alertCreateRbacMenu: "",
      rbacMenus_alertEditRbacMenu: [],
      currentUuid: "",
      name_alertEditRbacMenu: "",
      uri_alertEditRbacMenu: "",
      description_alertEditRbacMenu: "",
      parentUuid_alertEditRbacMenu: "",
      columns: [
        {
          name: "name",
          label: "名称",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "uri",
          label: "路由",
          field: "uri",
          align: "left",
          sortable: true,
        },
        {
          name: "description",
          label: "描述",
          field: "description",
          align: "left",
          sortable: true,
        },
        {
          name: "parentName",
          label: "所属父级",
          field: "parentName",
          align: "left",
          sortable: true,
        },
        {
          name: "operation",
          label: "操作",
          field: "operation",
          align: "left",
          sortable: true,
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
      this.fnGetParentRbacMenus();
      this.fnSearch();
    },
    /**
     * 加载父级菜单
     */
    fnGetParentRbacMenus() {
      ajaxRbacMenuList(
        collect({
          parentUuid: "",
        })
          .filter((val) => {
            return val;
          })
          .all()
      ).then((res) => {
        if (res.content.rbacMenus.length > 0) {
          collect(res.content.rbacMenus).each((rbacMenu) => {
            this.rbacMenus_search.push({
              label: rbacMenu.name,
              value: rbacMenu.uuid,
            });
          });
        }
      });
    },
    /**
     * 下拉框筛选
     * @param {string} val
     * @param {string} update
     */
    fnSelParentMenuFilter(val, update) {
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
     * 搜索
     */
    fnSearch() {
      this.rows = [];
      ajaxRbacMenuList(
        collect({
          name: this.name_search,
          uri: this.uri_search,
          description: this.description_search,
          parentUuid: this.parentUuid_search,
          "__preloads__[]": ["Parent"],
        })
          .filter((val) => {
            return val;
          })
          .all()
      ).then((res) => {
        if (res.content.rbacMenus.length > 0) {
          collect(res.content.rbacMenus).each((rbacMenu) => {
            this.rows.push({
              name: rbacMenu.name,
              uri: rbacMenu.uri,
              description: rbacMenu.description,
              parentName: rbacMenu.parent ? rbacMenu.parent.name : "无",
              operation: { uuid: rbacMenu.uuid },
            });
          });
        }
      });
    },
    /**
     * 重置搜索框
     */
    fnResetSearch() {
      this.name_search = "";
      this.uri_search = "";
      this.description_search = "";
      this.parentUuid_search = "";
    },
    /**
     * 重置新建菜单对话框
     */
    fnResetAlertCreateRbace() {
      this.name_alertCreateRbacMenu = "";
      this.uri_alertCreateRbacMenu = "";
      this.description_alertCreateRbacMenu = "";
      this.parentUuid_alertCreateRbacMenu = "";
    },
    /**
     * 打开新建菜单对话框
     */
    fnOpenAlertCreateRbacMenu() {
      this.fnResetAlertCreateRbace();
      this.alertCreateRbacMenu = true;
    },
    /**
     * 新建菜单
     */
    fnStoreRbacMenu() {
      const loading = loadingNotify();

      ajaxRbacMenuStore(
        collect({
          name: this.name_alertCreateRbacMenu,
          uri: this.uri_alertCreateRbacMenu,
          description: this.description_alertCreateRbacMenu,
          parentUuid: this.parentUuid_alertCreateRbacMenu,
        }).all()
      )
        .then((res) => {
          successNotify(res.msg, 500);
          this.fnGetParentRbacMenus();
          this.fnSearch();
        })
        .catch((err) => {
          errorNotify(err.msg);
        })
        .finally(() => {
          loading();
        });
    },
    /**
     * 重置编辑菜单对话框
     */
    fnResetAlertEditRbacMenu() {
      this.rbacMenus_alertEditRbacMenu = [];
      this.currentUuid = "";
      this.name_alertEditRbacMenu = "";
      this.uri_alertEditRbacMenu = "";
      this.description_alertEditRbacMenu = "";
      this.parentUuid_alertEditRbacMenu = "";
    },
    /**
     * 打开编辑菜单对话框
     */
    fnOpenAlertEditRbacMenu(params = {}) {
      if (!params.hasOwnProperty("uuid")) return;
      if (!params.uuid) return;

      this.fnResetAlertEditRbacMenu();
      this.currentUuid = params.uuid;

      ajaxRbacMenuDetail(this.currentUuid, { "__preloads__[]": ["Parent"] })
        .then((res) => {
          const { rbacMenu } = res.content;
          this.name_alertEditRbacMenu = rbacMenu.name;
          this.uri_alertEditRbacMenu = rbacMenu.uri;
          this.description_alertEditRbacMenu = rbacMenu.description;
          this.parentUuid_alertEditRbacMenu = rbacMenu.parent
            ? rbacMenu.parent.uuid
            : "";
        })
        .catch((e) => {
          errorNotify(e.msg);
          actionNotify();
          return;
        });
      ajaxRbacMenuList(
        collect({
          __neq__: { uuid: this.currentUuid },
          not_has_subs: this.currentUuid,
        })
          .filter((val) => {
            return val;
          })
          .all()
      ).then((res) => {
        if (res.content.rbacMenus.length > 0) {
          collect(res.content.rbacMenus).each((rbacMenu) => {
            this.rbacMenus_alertEditRbacMenu.push({
              label: rbacMenu.name,
              value: rbacMenu.uuid,
            });
          });
        }
        this.alertEditRbacMenu = true;
      });
    },
    /**
     * 编辑菜单
     */
    fnUpdateRbacMenu() {
      if (!this.currentUuid) return;
      const loading = loadingNotify();
      ajaxRbacMenuUpdate(this.currentUuid, {
        name: this.name_alertEditRbacMenu,
        uri: this.uri_alertEditRbacMenu,
        description: this.description_alertEditRbacMenu,
        parentUuid: this.parentUuid_alertEditRbacMenu,
      })
        .then((res) => {
          successNotify(res.msg);
          this.fnGetParentRbacMenus();
          this.fnSearch();
        })
        .catch((e) => {
          errorNotify(e.msg);
        })
        .finally(() => {
          loading();
        });
    },
    /**
     * 删除菜单
     */
    fnDeleteRbacMenu(params = {}) {
      if (!params.uuid) return;

      actionNotify(
        getDeleteActions(() => {
          const loading = loadingNotify();
          ajaxRbacMenuDelete(params.uuid)
            .then(() => {
              successNotify("删除成功");
              this.fnGetParentRbacMenus();
              this.fnSearch();
            })
            .catch((e) => {
              errorNotify(e.msg);
            })
            .finally(() => {
              loading();
            });
        })
      );
    },
  },
});
</script>
