import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("Layout", [
      "ActionSetMiniStateLeft",
      "ActionSetSizePanel",
    ]),
  },
  computed: {
    ...mapGetters("Layout", [
      "miniStateLeft",
      "sizePanel",
    ]),
  },
};
