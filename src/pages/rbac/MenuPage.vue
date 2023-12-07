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
            <SelRbacMenu_search labelName="所属父级" />
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
              <SelRbacMenu_alertCreate
                labelName="所属父级"
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
              <SelRbacMenu_alertEdit
                labelName="所属父级"
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
import { onMounted, ref, provide } from "vue";
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
} from "src/tools/notify";
import { collect } from "collect.js";
import SelRbacMenu_search from "src/components/SelRbacMenu_search.vue";
import SelRbacMenu_alertCreate from "src/components/SelRbacMenu_alertCreate.vue";
import SelRbacMenu_alertEdit from "src/components/SelRbacMenu_alertEdit.vue";

const alertCreateRbacMenu = ref(false);
const alertEditRbacMenu = ref(false);
const name_search = ref("");
const uri_search = ref("");
const description_search = ref("");
const parentUuid_search = ref("");
const rbacMenus_search = ref([]);
const name_alertCreateRbacMenu = ref("");
const uri_alertCreateRbacMenu = ref("");
const description_alertCreateRbacMenu = ref("");
const parentUuid_alertCreateRbacMenu = ref("");
const rbacMenus_alertEditRbacMenu = ref([]);
const currentUuid = ref("");
const name_alertEditRbacMenu = ref("");
const uri_alertEditRbacMenu = ref("");
const description_alertEditRbacMenu = ref("");
const parentUuid_alertEditRbacMenu = ref("");
const columns = [
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
];
const rows = ref([]);

provide("parentUuid_search", parentUuid_search);
provide("parentUuid_alertCreate", parentUuid_alertCreateRbacMenu);
provide("parentUuid_alertEdit", parentUuid_alertEditRbacMenu);

const fnInit = () => {
  fnGetParentRbacMenus();
  fnSearch();
};

const fnGetParentRbacMenus = () => {
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
        rbacMenus_search.value.push({
          label: rbacMenu.name,
          value: rbacMenu.uuid,
        });
      });
    }
  });
};

const fnSearch = () => {
  rows.value = [];
  ajaxRbacMenuList(
    collect({
      name: name_search.value,
      uri: uri_search.value,
      description: description_search.value,
      parent_uuid: parentUuid_search.value,
      "__preloads__[]": ["Parent"],
    })
      .filter((val) => {
        return val;
      })
      .all()
  ).then((res) => {
    if (res.content.rbacMenus.length > 0) {
      collect(res.content.rbacMenus).each((rbacMenu) => {
        rows.value.push({
          name: rbacMenu.name,
          uri: rbacMenu.uri,
          description: rbacMenu.description,
          parentName: rbacMenu.parent ? rbacMenu.parent.name : "无",
          operation: { uuid: rbacMenu.uuid },
        });
      });
    }
  });
};

const fnResetSearch = () => {
  name_search.value = "";
  uri_search.value = "";
  description_search.value = "";
  parentUuid_search.value = "";
};

// const fnSelParentMenuFilter = (val, update) => {
//   if (val === "") {
//     update(() => {
//       // rbacRoleUuid_search.value = rbacRoleUuid_search.value;
//     });
//     return;
//   }

//   update(() => {
//     const needle = val.toLowerCase();
//     rbacRoleUuid_search.value = rbacRoleUuid_search.value.filter(
//       (v) => v.toLowerCase().indexOf(needle) > -1
//     );
//   });
// };

const fnResetAlertCreateRbace = () => {
  name_alertCreateRbacMenu.value = "";
  uri_alertCreateRbacMenu.value = "";
  description_alertCreateRbacMenu.value = "";
  parentUuid_alertCreateRbacMenu.value = "";
};

const fnOpenAlertCreateRbacMenu = () => {
  fnResetAlertCreateRbace();
  alertCreateRbacMenu.value = true;
};

const fnStoreRbacMenu = () => {
  const loading = loadingNotify();

  ajaxRbacMenuStore(
    collect({
      name: name_alertCreateRbacMenu.value,
      uri: uri_alertCreateRbacMenu.value,
      description: description_alertCreateRbacMenu.value,
      parentUuid: parentUuid_alertCreateRbacMenu.value,
    }).all()
  )
    .then((res) => {
      successNotify(res.msg, 500);
      fnGetParentRbacMenus();
      fnSearch();
    })
    .catch((err) => {
      errorNotify(err.msg);
    })
    .finally(() => {
      loading();
    });
};

const fnResetAlertEditRbacMenu = () => {
  rbacMenus_alertEditRbacMenu.value = [];
  currentUuid.value = "";
  name_alertEditRbacMenu.value = "";
  uri_alertEditRbacMenu.value = "";
  description_alertEditRbacMenu.value = "";
  parentUuid_alertEditRbacMenu.value = "";
};

const fnOpenAlertEditRbacMenu = (params = {}) => {
  if (!params.hasOwnProperty("uuid")) return;
  if (!params.uuid) return;

  fnResetAlertEditRbacMenu();
  currentUuid.value = params.uuid;

  ajaxRbacMenuDetail(currentUuid.value, { "__preloads__[]": ["Parent"] })
    .then((res) => {
      const { rbacMenu } = res.content;
      name_alertEditRbacMenu.value = rbacMenu.name;
      uri_alertEditRbacMenu.value = rbacMenu.uri;
      description_alertEditRbacMenu.value = rbacMenu.description;
      parentUuid_alertEditRbacMenu.value = rbacMenu.parent
        ? rbacMenu.parent.uuid
        : "";
    })
    .catch((e) => {
      errorNotify(e.msg);
      return;
    });

  alertEditRbacMenu.value = true;
};

const fnUpdateRbacMenu = () => {
  if (!currentUuid.value) return;
  const loading = loadingNotify();
  ajaxRbacMenuUpdate(currentUuid.value, {
    name: name_alertEditRbacMenu.value,
    uri: uri_alertEditRbacMenu.value,
    description: description_alertEditRbacMenu.value,
    parentUuid: parentUuid_alertEditRbacMenu.value,
  })
    .then((res) => {
      successNotify(res.msg);
      fnGetParentRbacMenus();
      fnSearch();
    })
    .catch((e) => {
      errorNotify(e.msg);
    })
    .finally(() => {
      loading();
    });
};

const fnDeleteRbacMenu = (params = {}) => {
  if (!params.uuid) return;

  actionNotify(
    getDeleteActions(() => {
      const loading = loadingNotify();
      ajaxRbacMenuDelete(params.uuid)
        .then(() => {
          successNotify("删除成功");
          fnGetParentRbacMenus();
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

onMounted(() => {
  fnInit();
});
</script>
