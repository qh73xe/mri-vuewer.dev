export default {
  computed: {
    videoName: {
      get() {
        return this.$store.state.current.video.filename;
      },
      set(val) {
        this.$store.commit("current/video/fileName", val);
      }
    },
    videoSource: {
      get() {
        return this.$store.state.current.video.source;
      },
      set(val) {
        this.$store.commit("current/video/source", val);
      }
    },
    fps: {
      get() {
        return this.$store.state.current.video.fps;
      },
      set(val) {
        this.$store.commit("current/video/fps", val);
      }
    },
    duration: {
      get() {
        return this.$store.state.current.video.duration;
      },
      set(val) {
        this.$store.commit("current/video/duration", val);
      }
    },
    videoStream: {
      get() {
        return this.$store.state.current.video.videoStream;
      },
      set(val) {
        this.$store.commit("current/video/videoStream", val);
      }
    },
    audioStream: {
      get() {
        return this.$store.state.current.video.audioStream;
      },
      set(val) {
        this.$store.commit("current/video/audioStream", val);
      }
    },
    originSize: {
      get() {
        return this.$store.state.current.video.originSize;
      },
      set(val) {
        this.$store.commit("current/video/originSize", val);
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
