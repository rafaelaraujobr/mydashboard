import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("Layout", [
      "ActionSetDrawerLeft",
      "ActionSetDrawerRight",
      "ActionSetMiniStateLeft",
    ]),
  },
  computed: {
    ...mapGetters("Layout", ["drawerLeft", "drawerRight", "miniStateLeft"]),
  },
};
