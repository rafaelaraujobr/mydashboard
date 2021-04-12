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
import { dom } from "quasar";
const { offset } = dom;
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
      layouts: {lg: [], md: []},
      responsive: true,
      draggable: true,
      resizable: true,
      maxRows: 6,
      rowHeight: 150,
      styleGrid: "{}",
      sizeGrid: "{}",
      breakpoint: "lg",
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
      console.log(size);
      this.sizeGrid = size;
    },
    breakpointChangedEvent(newBreakpoint, newLayout) {
      console.log(
        "BREAKPOINT CHANGED breakpoint=",
        newBreakpoint,
        ", layout: ",
        newLayout
      );
      this.breakpoint = newBreakpoint;
      this.layout = newLayout;
      this.initGrid();
    },
    layoutUpdatedEvent() {
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
      console.log(JSON.stringify(this.modelItemGrid));
    },
    addItem() {
      this.layouts.lg.push({
        ...this.modelItemGrid,
        i: uid(),
      });
      this.layouts.md.push({
        ...this.modelItemGrid,
        i: uid(),
      });
    },
    removeItem(val) {
      const indexLg = this.layouts.lg.map((item) => item.i).indexOf(val);
      const indexMd = this.layouts.md.map((item) => item.i).indexOf(val);
      this.layouts.lg.splice(indexLg, 1);
      this.layouts.md.splice(indexMd, 1);
    },
  },
  computed: {
    layout() {
      return this.layouts[this.breakpoint];
    },
    layoutInit() {
      return JSON.parse(localStorage.getItem("app-layout"));
    },
  },
  created() {
    this.layouts = this.layoutInit ? this.layoutInit : { lg: [], md: [] };
    this.layout = this.layouts["lg"];
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