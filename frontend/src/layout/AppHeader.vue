<template>
  <q-header breveal bordered class="bg-white text-dark">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        :icon="drawerLeft ? 'mdi-text' : 'mdi-menu'"
        :size="$q.platform.is.mobile ? '1.1rem' : 'md'"
        @click="ActionSetDrawerLeft(!drawerLeft)"
      />
      <q-toolbar-title> mydashboard </q-toolbar-title>
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        icon="mdi-menu"
        @click="ActionSetDrawerRight(!drawerRight)"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import LayoutService from "@/mixins/LayoutService";
export default {
  name: "AppHeader",
  mixins: [LayoutService],
};
</script>

<style>
</style>