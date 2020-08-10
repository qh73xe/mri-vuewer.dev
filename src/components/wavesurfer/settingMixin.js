export default {
  computed: {
    minPxPerSec: {
      get() {
        return this.$store.state.wavesurfer.minPxPerSec;
      },
      set(val) {
        this.$store.commit("wavesurfer/setMinPxPerSec", val);
      }
    },
    freqRate: {
      get() {
        return this.$store.state.wavesurfer.freqRate;
      },
      set(val) {
        this.$store.commit("wavesurfer/setFreqRate", val);
      }
    },
    targetChannel: {
      get() {
        return this.$store.state.wavesurfer.targetChannel;
      },
      set(val) {
        this.$store.commit("wavesurfer/setTargetChannel", val);
      }
    },
    spectrogramHeight: {
      get() {
        return this.$store.state.wavesurfer.spectrogramHeight;
      },
      set(val) {
        this.$store.commit("wavesurfer/setSpectrogramHeight", val);
      }
    },
    showTimeLine: {
      get() {
        return this.$store.state.wavesurfer.showTimeLine;
      },
      set(val) {
        this.$store.commit("wavesurfer/setShowTimeLine", val);
      }
    },
    showSpectrogram: {
      get() {
        return this.$store.state.wavesurfer.showSpectrogram;
      },
      set(val) {
        this.$store.commit("wavesurfer/setShowSpectrogram", val);
      }
    },
    showFreqLabel: {
      get() {
        return this.$store.state.wavesurfer.showFreqLabel;
      },
      set(val) {
        this.$store.commit("wavesurfer/setShowFreqLabel", val);
      }
    },
    cursorColor: {
      get() {
        return this.$store.state.wavesurfer.cursorColor;
      },
      set(val) {
        this.$store.commit("wavesurfer/setCursorColor", val);
      }
    },
    waveColor: {
      get() {
        return this.$store.state.wavesurfer.waveColor;
      },
      set(val) {
        this.$store.commit("wavesurfer/setWaveColor", val);
      }
    },
    progressColor: {
      get() {
        return this.$store.state.wavesurfer.progressColor;
      },
      set(val) {
        this.$store.commit("wavesurfer/setProgressColor", val);
      }
    }
  },
  methods: {
    setDefaultSetting: function() {
      this.$store.dispatch("wavesurfer/setDefault");
    }
  }
};
