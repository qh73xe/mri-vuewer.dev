export default {
  computed: {
    videoName: {
      get() {
        return this.$store.state.current.video.filename;
      },
      set(val) {
        this.$store.commit("current/video/setFileName", val);
      }
    },
    videoSource: {
      get() {
        return this.$store.state.current.video.source;
      },
      set(val) {
        this.$store.commit("current/video/setSource", val);
      }
    },
    fps: {
      get() {
        return this.$store.state.current.video.fps;
      },
      set(val) {
        this.$store.commit("current/video/setFps", val);
      }
    },
    duration: {
      get() {
        return this.$store.state.current.video.duration;
      },
      set(val) {
        this.$store.commit("current/video/setDuration", val);
      }
    },
    videoStream: {
      get() {
        return this.$store.state.current.video.videoStream;
      },
      set(val) {
        this.$store.commit("current/video/setVideoStream", val);
      }
    },
    audioStream: {
      get() {
        return this.$store.state.current.video.audioStream;
      },
      set(val) {
        this.$store.commit("current/video/setAudioStream", val);
      }
    },
    originSize: {
      get() {
        return this.$store.state.current.video.originSize;
      },
      set(val) {
        this.$store.commit("current/video/setOriginSize", val);
      }
    }
  },
  methods: {
    initVideo: function() {
      this.videoName = null;
      this.videoSource = null;
      this.fps = null;
      this.duration = null;
      this.videoStream = null;
      this.audioStream = null;
      this.originSize = null;
    }
  }
};
