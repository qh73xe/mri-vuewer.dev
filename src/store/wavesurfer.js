export default {
  namespaced: true,
  state: () => ({
    minPxPerSec: 100,
    freqRate: 0.25,
    targetChannel: 0
  }),
  mutations: {
    setMinPxPerSec(state, payload) {
      state.minPxPerSec = payload;
    },
    setFreqRate(state, payload) {
      state.freqRate = payload;
    },
    targetChannel(state, payload) {
      state.targetChannel = payload;
    }
  },
  actions: {}
};
