export default {
  computed: {
    wavesurfer: {
      get() {
        return this.$store.state.current.wavesurfer;
      },
      set(val) {
        this.$store.commit("current/setWaveSurfer", val);
      }
    },
    textgrid: {
      get() {
        return this.$store.state.current.textgrid;
      },
      set(val) {
        this.$store.commit("current/setTextGrid", val);
      }
    }
  }
};
