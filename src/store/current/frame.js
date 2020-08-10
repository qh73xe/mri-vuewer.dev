export default {
  namespaced: true,
  state: () => ({
    time: null,
    image: null,
    idx: null
  }),
  mutations: {
    setTime(state, payload) {
      state.time = Number(payload);
    },
    setIdx(state, payload) {
      state.idx = Math.round(Number(payload));
    },
    setImage(state, payload) {
      state.image = payload;
    }
  },
  actions: {}
};
