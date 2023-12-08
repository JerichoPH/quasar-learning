<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="rbacRoleUuid_alertEdit"
    :options="options"
    :display-value="rbacRolesMap[rbacRoleUuid_alertEdit]"
    :filter="fnFilter"
    :label="labelName"
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
const rbacRoleUuid_alertEdit = inject("rbacRoleUuid_alertEdit");
const options = ref([]);
const rbacRoles = ref([]);
const rbacRolesMap = ref({});

const fnFilter = (val, update) => {
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

onMounted(() => {
  ajaxRbacRoleList(ajaxParams)
    .then((res) => {
      if (res.content.rbacRoles.length > 0) {
        collect(res.content.rbacRoles).each((rbacRole) => {
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
</script>
