import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("Layout", [
      "ActionSetDrawerLeft",
      "ActionSetDrawerRight",
      "ActionSetMiniStateLeft",
      "ActionSetSizePanel",
    ]),
  },
  computed: {
    ...mapGetters("Layout", [
      "drawerLeft",
      "drawerRight",
      "miniStateLeft",
      "sizePanel",
    ]),
  },
};
