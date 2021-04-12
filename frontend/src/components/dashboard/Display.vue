<template>
  <q-card flat>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="150"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
      :style="`min-height:50px;`"
      ref="grid"
      :cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
    >
      <span class="absolute-center">{{ sizePanel }}</span>
      <q-menu
        touch-position
        context-menu
        @show="getPositionMouse"
      >
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click="addItem">
            <q-item-section>New</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        drag-allow-from=".vue-draggable-handle"
        drag-ignore-from=".no-drag"
      >
        <q-card class="fit" flat bordered>
          <q-toolbar class="bg-grey-1 vue-draggable-handle q-pa-sm">
            <q-toolbar-title class="text-body2 text-weightmedium">
              {{ item.i }}
            </q-toolbar-title>
            <q-btn
              flat
              round
              dense
              icon="mdi-close"
              @click="removeItem(item.i)"
            />
          </q-toolbar>
          <q-separator />
        </q-card>
      </grid-item>
    </grid-layout>
  </q-card>
</template>

<script>
import { uid } from "quasar";
import { GridLayout, GridItem } from "vue-grid-layout";
import LayoutService from "@/mixins/LayoutService";
export default {
  name: "Grid",
  mixins: [LayoutService],
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      layout: [],
      draggable: true,
      resizable: true,
      modelItemGrid: {
        x: 0,
        y: 0, // puts it at the bottom
        w: 1,
        h: 1,
      },
    };
  },
  methods: {
    layoutUpdatedEvent() {
      localStorage.setItem("app-layout", JSON.stringify(this.layout));
    },
    getPositionMouse(evt) {
      let positionGrid = this.$refs.grid.$el.getBoundingClientRect();
      let colWidth = Math.trunc(positionGrid.width / 12);
      this.modelItemGrid.x = Math.trunc(
        (evt.clientX - positionGrid.x) / colWidth
      );
      this.modelItemGrid.y = Math.trunc((evt.clientY - positionGrid.y) / 150);
      console.log(JSON.stringify(this.modelItemGrid));
    },
    addItem() {
      this.layout.push({
        ...this.modelItemGrid,
        i: uid(),
      });
    },
    removeItem(val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
  },
  computed: {
    layoutInit() {
      return JSON.parse(localStorage.getItem("app-layout"));
    },
  },
  created() {
    this.layout = this.layoutInit ? this.layoutInit : [];
  },
};
</script>

<style >
.vue-grid-item.vue-grid-placeholder {
  background: red;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
}
</style>