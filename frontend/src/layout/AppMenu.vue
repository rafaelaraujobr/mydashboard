<template>
  <q-list>
    <q-item-label header>Essential Links</q-item-label>
    <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
      <q-item-section avatar>
        <q-icon name="mdi-school" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Docs</q-item-label>
        <q-item-label caption>quasar.dev</q-item-label>
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