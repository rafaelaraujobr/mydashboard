<template>
  <q-layout view="hHh Lpr fFf">
    <app-header />
    <app-footer />
    <q-drawer
      v-model="drawerLeft"
      :mini="miniStateLeft"
      @mouseover="ActionSetMiniStateLeft(false)"
      @mouseout="ActionSetMiniStateLeft(true)"
      bordered
    >
      <app-menu />
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
    >
    </q-drawer>

    <q-page-container>
      <q-resize-observer @resize="onResize" />
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
  methods: {
    onResize(size) {
      this.ActionSetSizePanel(size);
    },
  },
};
</script>

<style>
</style>
