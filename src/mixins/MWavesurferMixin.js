/**
 * MWavesurferMixin
 *
 * 現在レンダされている ws を操作するコンポーネントが呼び出します.
 * この mixin は ws, textgrid に対して
 *
 * @computed {vue component} ws - wave-surfer コンポーネント
 * @computed {object} textgrid - アノテーション情報
 */
export default {
  computed: {
    $ws: function() {
      return this.$store.state.current.wavesurfer || null;
    },
    $tg: function() {
      return this.$store.state.current.textgrid || null;
    }
  },
  methods: {
    // 情報取得
    getDuration: function() {
      return this.$ws ? this.$ws.getDuration() : 0;
    },
    getCurrentTime: function() {
      return this.$ws ? this.$ws.getCurrentTime() : 0;
    },
    getProgress: function() {
      return this.getCurrentTime() / this.getDuration();
    },
    // 動画操作
    playPause: function() {
      if (this.$ws) this.$ws.playPause();
    },
    skipBackward: function() {
      if (this.$ws) this.$ws.skipBackward();
    },
    skipForward: function() {
      if (this.$ws) this.$ws.skipForward();
    },
    skip: function(offset) {
      if (this.$ws) this.$ws.skip(offset);
    },
    zoom: function(pxPerSec) {
      if (this.$ws) this.$ws.zoom(pxPerSec);
    },
    seekAndCenter: function(progress) {
      if (this.$ws) this.$ws.seekAndCenter(progress);
    },
    seekTo: function(progress) {
      if (this.$ws) this.$ws.seekTo(progress);
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
      if (this.$ws) this.$ws.addTier(key, type);
    },
    updateTier: function(key, obj) {
      if (this.$ws) this.$ws.updateTier(key, obj);
    },
    deleteTier: function(key) {
      if (this.$ws) this.$ws.deleteTier(key);
    },
    addTierValue: function(key, obj) {
      if (this.$ws) this.$ws.addTierValue(key, obj);
    },
    setTierValue: function(key, idx, text) {
      if (this.$ws) this.$ws.setTierValue(key, idx, text);
    },
    deleteTierValue: function(key, idx) {
      if (this.$ws) this.$ws.deleteTierValue(key, idx);
    },
    playTextGrid: function(key, idx) {
      if (this.$ws) this.$ws.playTextGrid(key, idx);
    },
    loadTextGrid: function(file) {
      if (this.$ws) this.$ws.loadTextGrid(file);
    },
    downloadTextGrid: function(filename) {
      if (this.$ws) this.$ws.downloadTextGrid(filename);
    }
  }
};
