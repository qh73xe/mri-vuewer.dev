import Vue from "vue";
import Vuex from "vuex";

import wcards from "./wcards.js";
import snackbar from "./snackbar.js";
import logging from "./logging.js";

import setting from "./setting.js";
import current from "./current";
import files from "./files";

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
    max_z_index: function(state, val) {
      state.max_z_index = val;
    },
    setDrawer: function(state, val) {
      state.drawer = val;
    }
  },
  actions: {},
  modules: {
    snackbar,
    wcards,
    logging,
    setting,
    current,
    files
  }
});
