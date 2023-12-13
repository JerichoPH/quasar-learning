<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-primary text-white q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="fnToggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            YouTube
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="white"
            text-color="black"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            icon="video_call"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="white"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="white"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240">
      <div class="q-pa-md">
        <div class="text-h6">Menu</div>

        <q-list link dense separator style="min-width: 200px">
          <q-item clickable v-ripple :to="{ name: 'account:index' }">
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>
            <q-item-section>关于</q-item-section>
          </q-item>
        </q-list>

        <q-list link dense separator style="min-width: 200px">
          <q-item clickable v-ripple :to="{ name: 'account:index' }">
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>
            <q-item-section>关于</q-item-section>
          </q-item>

          <q-item-label header>层级菜单</q-item-label>

          <q-expansion-item group="menu" icon="mail" label="邮件">
            <q-list dense>
              <q-item clickable v-ripple :to="{ name: 'home:index' }">
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>Inbox</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'Sent' }">
                <q-item-section avatar>
                  <q-icon name="send" />
                </q-item-section>
                <q-item-section>Sent</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <!-- 添加更多层级菜单... -->
        </q-list>
      </div>

      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="rbacMenu in rbacMenus"
            :key="rbacMenu.uuid"
            v-ripple
            clickable
            :to="{ name: rbacMenu.page_route_name }"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="rbacMenu.icon || 'fa fa-list'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ rbacMenu.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            More from Youtube
          </q-item-label>

          <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { errorNotify } from "src/utils/notify";
import { ajaxGetCurrentAccountMenuList } from "src/apis/auth";

let router = useRouter();

// 搜索栏数据
let search = ref("");

// 做侧边栏数据
let leftDrawerOpen = ref(true);
let rbacMenus = ref([]);

onMounted(() => {
  fnInit();
});

/**
 * 初始化
 */
let fnInit = () => {
  if (!localStorage.getItem("auth.token")) {
    errorNotify(
      "未登录",
      500,
      (router) => {
        router.push("/auth/login");
      },
      router
    );
  }

  // 加载当前用户菜单
  ajaxGetCurrentAccountMenuList({
    "__preloads__[]": ["Subs"],
  })
    .then((res) => {
      if (res.content.rbac_menus.length > 0) {
        rbacMenus.value = res.content.rbac_menus;
      }
    })
    .catch((e) => {
      errorNotify(e.msg);
    });
};
/**
 * 切换左侧边栏
 */
let fnToggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

/**
 * 跳转页面
 * @param {string} uri 路由
 */
let fnHref = (uri) => {
  router.push(uri);
};
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
