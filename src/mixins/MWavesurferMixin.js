export default {
  computed: {
    wavesurfer: {
      get() {
        return this.$store.state.current.wavesurfer;
      },
      set(val) {
        this.$store.commit("current/waveSurfer", val);
      }
    },
    textgrid: {
      get() {
        return this.$store.state.current.textgrid;
      },
      set(val) {
        this.$store.commit("current/textGrid", val);
      }
    }
  },
  methods: {
    initWaveSurfer: function() {
      this.sourceElement = null;
      this.waveSurfer = null;
      this.textGrid = {};
    },
    // 情報取得
    getDuration: function() {
      return this.wavesurfer.getDuration();
    },
    getCurrentTime: function() {
      return this.wavesurfer.getCurrentTime();
    },
    getProgress: function() {
      return this.getCurrentTime() / this.getDuration();
    },
    // 動画操作
    playPause: function() {
      if (this.wavesurfer) this.wavesurfer.playPause();
    },
    skipBackward: function() {
      if (this.wavesurfer) this.wavesurfer.skipBackward();
    },
    skipForward: function() {
      if (this.wavesurfer) this.wavesurfer.skipForward();
    },
    skip: function(offset) {
      if (this.wavesurfer) this.wavesurfer.skip(offset);
    },
    zoom: function(pxPerSec) {
      if (this.wavesurfer) this.wavesurfer.zoom(pxPerSec);
    },
    seekAndCenter: function(progress) {
      if (this.wavesurfer) this.wavesurfer.seekAndCenter(progress);
    },
    seekTo: function(progress) {
      if (this.wavesurfer) this.wavesurfer.seekTo(progress);
    },
    seek: function(time, isCenter) {
      if (isCenter) {
        this.seekAndCenter(time / this.getDuration());
      } else {
        this.seekTo(time / this.getDuration());
      }
    },
    // アノテーション操作
    addTier: function(key, type) {
      this.wavesurfer.addTier(key, type);
    },
    updateTier: function(key, obj) {
      this.wavesurfer.updateTier(key, obj);
    },
    deleteTier: function(key) {
      this.wavesurfer.deleteTier(key);
    },
    addTierValue: function(key, obj) {
      this.wavesurfer.addTierValue(key, obj);
    },
    setTierValue: function(key, idx, text) {
      this.wavesurfer.setTierValue(key, idx, text);
    },
    deleteTierValue: function(key, idx) {
      this.wavesurfer.deleteTierValue(key, idx);
    },
    playTextGrid: function(key, idx) {
      this.wavesurfer.playTextGrid(key, idx);
    },
    loadTextGrid: function(file) {
      this.wavesurfer.loadTextGrid(file);
    },
    downloadTextGrid: function(filename) {
      this.wavesurfer.downloadTextGrid(filename);
    }
  }
};
