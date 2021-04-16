<template>
  <grid-layout
    :layout.sync="layout"
    :responsive-layouts="layouts"
    :responsive="responsive"
    :col-num="12"
    :max-rows="maxRows"
    :row-height="rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :use-css-transforms="true"
    @layout-updated="layoutUpdatedEvent"
    @breakpoint-changed="breakpointChangedEvent"
    :style="styleGrid"
    ref="grid"
    :cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
    :breakpoint="{ lg: 1439, md: 1023, sm: 599, xs: 480, xxs: 0 }"
  >
    <q-resize-observer @resize="onResize" />
    <span class="absolute-center">{{ sizePanel }}</span>
    <q-menu touch-position context-menu @show="getPositionMouse">
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
</template>

<script>
import { uid } from "quasar";
import { GridLayout, GridItem } from "vue-grid-layout";
import LayoutService from "@/mixins/LayoutService";

const layoutStorange = JSON.parse(localStorage.getItem("app-layout"))
  ? JSON.parse(localStorage.getItem("app-layout"))
  : { lg: [], md: [], sm: [], xs: [], xxs: [] };

export default {
  name: "Panel",
  mixins: [LayoutService],
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      layouts: layoutStorange,
      layout: [],
      responsive: true,
      draggable: true,
      resizable: true,
      maxRows: 6,
      rowHeight: 150,
      styleGrid: "{}",
      sizeGrid: "{}",
      breakpoint: "",
      modelItemGrid: {
        w: 1,
        h: 1,
      },
    };
  },
  methods: {
    setStyleGrid() {
      let offsetValue = offset(this.$refs.grid.$el);
      this.styleGrid = {
        minHeight: offsetValue.top
          ? `calc(100vh - ${offsetValue.top + 25}px`
          : "100vh",
      };
    },
    initGrid() {
      this.rowHeight = (this.$q.screen.height - 105 - 38) / this.maxRows;
    },
    onResize(size) {
      this.sizeGrid = size;
      console.log("width =>", this.$q.screen.width);
    },
    breakpointChangedEvent(newBreakpoint, newLayout) {
      this.breakpoint = newBreakpoint;
      this.layout = newLayout;
      this.initGrid();
      console.log("gridBreakpoint =>", newBreakpoint, this.$q.screen.width);
      // console.log("quasarBreakpoint =>", this.$q.screen.name);
    },
    layoutUpdatedEvent() {
      this.layouts[this.breakpoint] = this.layout;
      localStorage.setItem("app-layout", JSON.stringify(this.layouts));
    },
    getPositionMouse(evt) {
      let positionGrid = this.$refs.grid.$el.getBoundingClientRect();
      let colWidth = Math.trunc(positionGrid.width / 12);
      this.modelItemGrid.x = Math.trunc(
        (evt.clientX - positionGrid.x) / colWidth
      );
      this.modelItemGrid.y = Math.trunc(
        (evt.clientY - positionGrid.y) / this.rowHeight
      );
    },
    addItem() {
      Object.keys(this.layouts).forEach((item) => {
        this.layouts[item].push({
          ...this.modelItemGrid,
          i: uid(),
        });
      });
      this.layout = this.layouts[this.breakpoint];
    },
    removeItem(val) {
      Object.keys(this.layouts).forEach((item) => {
        let index = this.layouts[item].map((item) => item.i).indexOf(val);
        this.layouts[item].splice(index, 1);
      });
      this.layout = this.layouts[this.breakpoint];
    },
  },
  computed: {},
  created() {
    this.layout = this.layouts[this.$q.screen.name];
  },
  mounted() {
    this.setStyleGrid();
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