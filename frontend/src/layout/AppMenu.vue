<template>
  <q-list>
    <q-item clickable to="/dashboard">
      <q-item-section avatar>
        <q-icon name="mdi-view-dashboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Dashboard</q-item-label>
        <!-- <q-item-label caption>quasar.dev</q-item-label> -->
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {
  name: "AppMenu",
};
</script>

<style>
</style>