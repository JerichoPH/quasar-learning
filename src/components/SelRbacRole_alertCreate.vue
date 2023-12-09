<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="rbacRoleUuids_alertCreate"
    :options="options"
    :filter="fnFilter"
    :label="labelName"
    :display-value="
      rbacRoleUuids_alertCreate
        ? rbacRoleUuids_alertCreate.map((uuid) => {
            return rbacRolesMap[uuid]['name'];
          })
        : ''
    "
    :multiple="multiple"
    @filter="fnFilter"
    emit-value
    map-options
  />
</template>
<script setup>
import { inject, defineProps, onMounted, ref } from "vue";
import collect from "collect.js";
import { ajaxRbacRoleList } from "/src/apis/rbac";
import { errorNotify } from "src/tools/notify";

let props = defineProps({
  labelName: {
    type: String,
    default: "",
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
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
let multiple = props.multiple;
let rbacRoleUuids_alertCreate = inject("rbacRoleUuids_alertCreate");
let options = ref([]);
let rbacRoles = ref([]);
let rbacRolesMap = ref({});

onMounted(() => {
  ajaxRbacRoleList(ajaxParams)
    .then((res) => {
      if (res.content.rbac_roles.length > 0) {
        collect(res.content.rbac_roles).each((rbacRole) => {
          rbacRoles.value.push({
            label: rbacRole.name,
            value: rbacRole.uuid,
          });
          rbacRolesMap.value[rbacRole.uuid] = rbacRole.name;
        });
      }
      console.log("ok", rbacRolesMap);
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
});

let fnFilter = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = rbacRoles.value;
    });
    return;
  }

  update(() => {
    options.value = rbacRoles.value.filter(
      (v) => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
  });
};
</script>
