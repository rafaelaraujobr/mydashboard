export default {
  namespaced: true,
  state: {
    drawerLeft: true,
    drawerRight: false,
    miniStateLeft: true,
    sizePanel: {
      heigth: 0,
      width: 0,
    },
  },
  getters: {
    drawerLeft: (state) => state.drawerLeft,
    drawerRight: (state) => state.drawerRight,
    miniStateLeft: (state) => state.miniStateLeft,
    sizePanel: (state) => state.sizePanel,
  },
  mutations: {
    SET_DRAWERLEFT(state, payload) {
      state.drawerLeft = payload;
    },
    SET_DRAWERRIGHT(state, payload) {
      state.drawerRight = payload;
    },
    SET_MINISTATELEFT(state, payload) {
      state.miniStateLeft = payload;
    },
    SET_SIZEPANEL(state, payload) {
      state.sizePanel = payload;
    },
  },
  actions: {
    ActionSetDrawerLeft({ commit }, payload) {
      commit("SET_DRAWERLEFT", payload);
    },
    ActionSetDrawerRight({ commit }, payload) {
      commit("SET_DRAWERRIGHT", payload);
    },
    ActionSetMiniStateLeft({ commit }, payload) {
      commit("SET_MINISTATELEFT", payload);
    },
    ActionSetSizePanel({ commit }, payload) {
      commit("SET_SIZEPANEL", payload);
    },
  },
};
