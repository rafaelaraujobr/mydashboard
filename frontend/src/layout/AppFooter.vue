<template>
  <q-footer reveal>
    <q-bar dense>
      <q-space />
      <div>v {{ appVersion }}</div>
    </q-bar>
  </q-footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    appVersion() {
      return this.$store.getters.appVersion;
    },
  },
};
</script>

<style>
</style>