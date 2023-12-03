<template>
  <div class="q-pa-md search-form">
    <div class="row">
      <div class="col">
        <span style="font-size: 20px">搜索</span>
      </div>
      <div class="col text-right">
        <q-btn-group right>
          <q-btn color="primary" label="搜索" icon="search" @click="fnSearch" />
          <q-btn color="primary" label="重置" flat @click="fnReset" />
        </q-btn-group>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <q-form @submit="fnSearch" @reset="fnReset" class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="name_search"
                label="名称"
                lazy-rules
                :rules="[]"
              />
            </div>
          </div>
        </q-form>
      </div>
    </div>
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
        />
      </div>
    </div>
  </div>
</template>
<script>
import { rbacRoleListAjax } from "../../apis/rbac";

export default {
  data() {
    return {
      name_search: "",
      columns: [
        {
          name: "name",
          label: "名称",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "",
          lable: "",
          align: "left",
          field: "operation",
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
    fnInit() {
      rbacRoleListAjax().then((res) => {
        console.log(res);
      });
    },
    fnSearch() {
      rbacRoleListAjax({
        name: this.name_search,
      }).then((res) => {
        console.log(res);
      });
    },
    fnReset() {},
  },
};
</script>
