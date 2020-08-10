export default {
  namespaced: true,
  state: () => ({
    filename: null,
    source: null,
    fps: null,
    duration: null,
    videoStream: null,
    audioStream: null,
    originSize: null
  }),
  mutations: {
    setFilename(state, payload) {
      state.filename = payload;
    },
    setSource(state, payload) {
      state.source = payload;
    },
    setFps(state, payload) {
      state.fps = payload;
    },
    setDuration(state, payload) {
      state.duration = payload;
    },
    setVideoStream(state, payload) {
      state.videoStream = payload;
    },
    setAudioStream(state, payload) {
      state.audioStream = payload;
    },
    setOriginSize(state, payload) {
      state.originSize = payload;
    }
  },
  actions: {}
};
