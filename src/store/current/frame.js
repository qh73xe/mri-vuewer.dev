export default {
  namespaced: true,
  state: () => ({
    time: null,
    source: null,
    idx: null
  }),
  mutations: {
    setTime(state, payload) {
      state.time = Number(payload);
    },
    setIdx(state, payload) {
      state.idx = Math.round(Number(payload));
    },
    setSource(state, payload) {
      state.source = payload;
    }
  },
  actions: {}
};
