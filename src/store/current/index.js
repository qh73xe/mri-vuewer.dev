import video from "./video.js";
import frame from "./frame.js";
export default {
  namespaced: true,
  state: () => ({
    wavesurfer: null,
    textgrid: null
  }),
  mutations: {
    setWaveSurfer(state, payload) {
      state.wavesurfer = payload;
    },
    setTextGrid(state, payload) {
      state.textgrid = payload;
    }
  },
  actions: {},
  modules: { video: video, frame: frame }
};
