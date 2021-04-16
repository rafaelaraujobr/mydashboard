<template>
  <q-layout view="hHh Lpr fFf">
    <q-header breveal bordered class="bg-white text-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          :icon="drawerLeft ? 'mdi-text' : 'mdi-menu'"
          :size="$q.platform.is.mobile ? '1.1rem' : 'md'"
          @click="drawerLeft = !drawerLeft"
        />
        <q-toolbar-title> mydashboard </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="mdi-menu"
          @click="drawerRigth = !drawerRigth"
        />
      </q-toolbar>
    </q-header>
    <app-footer />
    <q-drawer
      v-model="drawerLeft"
      :mini="miniStateLeft"
      show-if-above
      @click="drawerLeft = !drawerLeft"
      bordered
    >
      <app-menu />
    </q-drawer>

    <q-drawer side="right" v-model="drawerRight" bordered> </q-drawer>

    <q-page-container class="bg-grey-1">
      <q-resize-observer @resize="onResize" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppMenu from "./AppMenu.vue";
import LayoutService from "@/mixins/LayoutService";
import AppFooter from "./AppFooter.vue";
export default {
  name: "AppLayoutMain",
  mixins: [LayoutService],
  components: { AppMenu, AppFooter },
  data() {
    return {
      drawerRight: false,
      drawerLeft: false,
    };
  },
  methods: {
    onResize(size) {
      this.ActionSetSizePanel(size);
    },
  },
  watch: {
    drawerLeft() {},
  },
};
</script>

<style>
</style>
