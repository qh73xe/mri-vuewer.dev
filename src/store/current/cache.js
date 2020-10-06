export default {
  namespaced: true,
  state: () => ({
    textgrids: []
  }),
  mutations: {
    textgrids(state, payload) {
      state.textgrids = payload;
    }
  },
  actions: {
    init: function(context) {
      context.commit("textgrids", []);
    },
    setTextgrid(context, payload) {
      context.state.textgrids.push(payload);
    }
  },
  getters: {
    textgrids: state => (idx = 0) => {
      const _idx = state.textgrids.length - idx - 1;
      if (_idx > -1) {
        const data = state.textgrids[_idx];
        state.textgrids.splice(_idx);
        return data;
      }
      return null;
    }
  }
};
