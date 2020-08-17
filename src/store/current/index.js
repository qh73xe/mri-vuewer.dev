import video from "./video.js";
import frame from "./frame.js";
export default {
  namespaced: true,
  state: () => ({
    wavesurfer: null,
    textgrid: null
  }),
  mutations: {
    waveSurfer(state, payload) {
      state.wavesurfer = payload;
    },
    textGrid(state, payload) {
      state.textgrid = payload;
    }
  },
  actions: {},
  modules: { video: video, frame: frame }
};
