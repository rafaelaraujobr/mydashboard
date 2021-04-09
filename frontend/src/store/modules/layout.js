export default {
  namespaced: true,
  state: {
    drawerLeft: false,
    drawerRight: false,
    miniStateLeft: true,
  },
  getters: {
    drawerLeft: (state) => state.drawerLeft,
    drawerRight: (state) => state.drawerRight,
    miniStateLeft: (state) => state.miniStateLeft,
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
  },
};
