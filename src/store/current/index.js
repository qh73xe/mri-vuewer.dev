import video from "./video.js";
import frame from "./frame.js";
export default {
  namespaced: true,
  state: () => ({
    ws: null,
    textgrid: null
  }),
  mutations: {
    setWs(state, payload) {
      state.ws = payload;
    },
    setTextGrid(state, payload) {
      state.textgrid = payload;
    }
  },
  actions: {},
  modules: { video: video, frame: frame }
};
