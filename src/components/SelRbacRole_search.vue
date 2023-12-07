<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="rbacRoleUuid_search"
    :options="rbacRoles_search"
    :label="labelName"
    :dispaly-value="rbacRolesMap[rbacRoleUuid_search]"
    @filter="fnFilter"
    emit-value
    map-options
  />
</template>
<script setup>
import { inject, defineProps, onMounted, ref } from "vue";
import { ajaxRbacRoleList } from "/src/apis/rbac";
import collect from "collect.js";
import { errorNotify } from "src/tools/notify";

const props = defineProps({
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

const labelName = props.labelName;
const ajaxParams = props.ajaxParams;
const rbacRoleUuid_search = inject("rbacRoleUuid_search");
const rbacRoles_search = ref([]);
const rbacRoles = ref([]);
const rbacRolesMap = ref({});

const fnFilter = (val, update) => {
  if (val === "") {
    update(() => {
      rbacRoles_search.value = rbacRoles.value;
    });
    return;
  }

  update(() => {
    rbacRoles_search.value = rbacRoles.value.filter(
      (v) => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
  });
};

onMounted(() => {
  ajaxRbacRoleList(ajaxParams)
    .then((res) => {
      if (res.content.rbacMenus.length > 0) {
        collect(res.content.rbacMenus).each((rbacMenu) => {
          rbacRoles.value.push({
            label: rbacMenu.name,
            value: rbacMenu.uuid,
          });
          rbacRolesMap[rbacMenu.uuid] = rbacMenu.name;
        });
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
});
</script>
