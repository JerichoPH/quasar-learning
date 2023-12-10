<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="rbacRoleUuids_alertEdit"
    :options="options"
    :filter="fnFilter"
    :label="labelName"
    :display-value="
      rbacRoleUuids_alertEdit
        ? rbacRoleUuids_alertEdit.map((val) => rbacRolesMap[val])
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
import { errorNotify } from "src/utils/notify";

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
let rbacRoleUuids_alertEdit = inject("rbacRoleUuids_alertEdit");
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
src/utils/notify
