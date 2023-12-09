<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="parentUuid_search"
    :options="rbacMenus_search"
    :label="labelName"
    @filter="fnFilter"
    emit-value
    map-options
  />
</template>
<script setup>
import { inject, defineProps, onMounted, ref } from "vue";
import { ajaxRbacMenuList } from "/src/apis/rbac";
import collect from "collect.js";
import { errorNotify } from "src/tools/notify";

let props = defineProps({
  labelName: {
    type: String,
    default: "",
    required: true,
  },
  ajaxParams: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

let labelName = props.labelName;
let ajaxParams = props.ajaxParams;
let parentUuid_search = inject("parentUuid_search");
let rbacMenus_search = ref([]);
let rbacMenus = ref([]);

let fnFilter = (val, update) => {
  if (val === "") {
    update(() => {
      rbacMenus_search.value = rbacMenus.value;
    });
    return;
  }

  update(() => {
    rbacMenus_search.value = rbacMenus.value.filter(
      (v) => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
  });
};

onMounted(() => {
  ajaxRbacMenuList(ajaxParams)
    .then((res) => {
      if (res.content.rbac_menus.length > 0) {
        collect(res.content.rbac_menus).each((rbacMenu) => {
          rbacMenus.value.push({
            label: rbacMenu.name,
            value: rbacMenu.uuid,
          });
        });
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
});
</script>
