<template>
  <q-layout view="hHh Lpr fFf">
    <app-header />
    <app-footer />
    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :mini="miniStateLeft"
      @mouseover="ActionSetMiniStateLeft(false)"
      @mouseout="ActionSetMiniStateLeft(true)"
      bordered
      content-class="bg-grey-1"
    >
      <app-menu />
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      content-class="bg-grey-1"
    >
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from "./AppHeader.vue";
import AppMenu from "./AppMenu.vue";
import LayoutService from "@/mixins/LayoutService";
import AppFooter from "./AppFooter.vue";
export default {
  name: "AppLayoutMain",
  mixins: [LayoutService],
  components: { AppHeader, AppMenu, AppFooter },
};
</script>

<style>
</style>
