<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240">
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="rbacMenu in rbacMenus"
          :key="rbacMenu.uuid"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="rbacMenu.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ rbacMenu.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { ajaxGetCurrentAccountMenuList } from "src/apis/auth";
import { errorNotify } from "src/utils/notify";

let leftDrawerOpen = inject("leftDrawerOpen");
let rbacMenus = ref([]);

onMounted(() => {
  fnInit();
});

let flattenMenus = (rbacMenus, parentUuid) => {
  for (let i = 0; i < rbacMenus.length; i++) {
    let menu = rbacMenus[i];
    if (menu.parent_uuid === parentUuid) {
      rbacMenus[i].subs = [];
      flattenMenus(rbacMenus, menu.uuid);
    }
  }
};

let fnInit = () => {
  ajaxGetCurrentAccountMenuList()
    .then((res) => {
      if (res.content.rbac_menus.length > 0) {
        flattenMenus(res.content.rbac_menus, "");
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
</script>
