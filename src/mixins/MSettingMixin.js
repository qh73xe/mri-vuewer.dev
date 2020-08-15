export default {
  computed: {
    maxVideoSize: {
      get() {
        return this.$store.state.setting.maxVideoSize;
      },
      set(val) {
        const type = typeof val;
        if (type == "number") {
          this.$store.commit("setting/setMaxVideoSize", val);
        } else if (type == "string") {
          if (Number(val)) {
            this.$store.commit("setting/setMaxVideoSize", Number(val));
          }
        }
      }
    },
    shouldGetVideoInfo: {
      get() {
        return this.$store.state.setting.shouldGetVideoInfo;
      },
      set(val) {
        this.$store.commit("setting/setShouldGetVideoInfo", val);
      }
    },
    shouldGetFrameInfo: {
      get() {
        return this.$store.state.setting.shouldGetFrameInfo;
      },
      set(val) {
        this.$store.commit("setting/setShouldGetFrameInfo", val);
      }
    },
    minPxPerSec: {
      get() {
        return this.$store.state.setting.minPxPerSec;
      },
      set(val) {
        const type = typeof val;
        if (type == "number") {
          this.$store.commit("setting/setMinPxPerSec", val);
        } else if (type == "string") {
          if (Number(val)) {
            this.$store.commit("setting/setMinPxPerSec", Number(val));
          }
        }
      }
    },
    freqRate: {
      get() {
        return this.$store.state.setting.freqRate;
      },
      set(val) {
        const type = typeof val;
        if (type == "number") {
          this.$store.commit("setting/setFreqRate", val);
        } else if (type == "string") {
          if (Number(val)) {
            this.$store.commit("setting/setFreqRate", Number(val));
          }
        }
      }
    },
    targetChannel: {
      get() {
        return this.$store.state.setting.targetChannel;
      },
      set(val) {
        this.$store.commit("setting/setTargetChannel", val);
      }
    },
    spectrogramHeight: {
      get() {
        return this.$store.state.setting.spectrogramHeight;
      },
      set(val) {
        this.$store.commit("setting/setSpectrogramHeight", val);
      }
    },
    showTimeLine: {
      get() {
        return this.$store.state.setting.showTimeLine;
      },
      set(val) {
        this.$store.commit("setting/setShowTimeLine", val);
      }
    },
    showSpectrogram: {
      get() {
        return this.$store.state.setting.showSpectrogram;
      },
      set(val) {
        this.$store.commit("setting/setShowSpectrogram", val);
      }
    },
    showFreqLabel: {
      get() {
        return this.$store.state.setting.showFreqLabel;
      },
      set(val) {
        this.$store.commit("setting/setShowFreqLabel", val);
      }
    },
    cursorColor: {
      get() {
        return this.$store.state.setting.cursorColor;
      },
      set(val) {
        this.$store.commit("setting/setCursorColor", val);
      }
    },
    waveColor: {
      get() {
        return this.$store.state.setting.waveColor;
      },
      set(val) {
        this.$store.commit("setting/setWaveColor", val);
      }
    },
    progressColor: {
      get() {
        return this.$store.state.setting.progressColor;
      },
      set(val) {
        this.$store.commit("setting/setProgressColor", val);
      }
    }
  },
  methods: {
    setDefaultSetting: function() {
      this.$store.dispatch("setting/setDefault");
    }
  }
};
