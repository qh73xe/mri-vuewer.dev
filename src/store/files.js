import db from "@/storage/db";

export default {
  namespaced: true,
  state: () => ({
    files: [],
    isLoading: false,
    count: 0
  }),
  mutations: {
    push: function(state, obj) {
      state.files.push(obj);
    },
    destroy: function(state, id) {
      const i = state.files.findIndex(x => x.id == id);
      if (i > -1) {
        state.files.splice(i, 1);
      }
    },
    replace: function(state, obj) {
      if (obj.id) {
        const i = state.files.findIndex(x => x.id == obj.id);
        if (i > -1) {
          state.files[i] = obj;
        }
      }
    },
    isLoading: function(state, payload) {
      state.isLoading = payload;
    },
    count: function(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    init: function(context) {
      context.commit("isLoading", true);
      db.files.count().then(x => {
        context.commit("count", x);
      });
      db.files.toArray().then(items => {
        for (const x of items) {
          context.commit("push", x);
        }
        context.commit("isLoading", false);
      });
    }
  }
};
