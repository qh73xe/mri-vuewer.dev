import Vue from "vue";
import video from "./video.js";
import frame from "./frame.js";
export default {
  namespaced: true,
  state: () => ({
    wavesurfer: null,
    textgrid: null,
    frames: []
  }),
  mutations: {
    waveSurfer(state, payload) {
      state.wavesurfer = payload;
    },
    textGrid(state, payload) {
      state.textgrid = payload;
    },
    frames(state, payload) {
      state.frames = payload;
    }
  },
  actions: {
    init: function(context) {
      context.state.frames = [];
      context.state.wavesurfer = null;
      context.state.textgrid = null;
    },
    updateFrame: function(context, payload) {
      const i = context.state.frames.findIndex(x => x.id == payload.id);
      if (i !== -1) {
        Vue.set(context.state.frames, i, payload);
      }
    }
  },
  modules: { video: video, frame: frame }
};
