<template>
  <div class="q-pa-md">
    <div class="row"></div>
    <div class="row">
      <div class="col">
        <q-table
          flat
          bordered
          title="Treats"
          :rows="rows"
          :columns="columns"
          row-key="name"
          dark
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
  },
};
</script>
