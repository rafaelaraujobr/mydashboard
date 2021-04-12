<template>
  <q-page :style-fn="myTweak"><display /></q-page>
</template>

<script>
import Display from "../components/dashboard/Display.vue";

export default {
  name: "Dashboard",
  components: { Display },
  methods: {
    myTweak(offset) {
      console.log(offset);
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
  },
};
</script>

<style>
</style>