import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "MRI Vuewer",
    appVersion: "2.0",
    author: "qh73xe",
    devYear: "2017-2020",
    github: "https://github.com/qh73xe/mri-vuewer.dev",
    drawer: false
  },
  mutations: {
    setDrawer: function(state, val) {
      state.drawer = val;
    }
  },
  actions: {},
  modules: {}
});
