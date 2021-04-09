import Vue from "vue";
import Vuex from "vuex";
import { version } from "../../package";
import Layout from "./modules/layout";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { packageVersion: version || "0" },
  getters: { appVersion: (state) => state.packageVersion },
  mutations: {},
  actions: {},
  modules: { Layout },
});
