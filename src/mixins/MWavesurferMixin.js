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
    play: function(start, end) {
      if (this.$ws) this.$ws.play(Number(start), Number(end));
    },
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
      const duration = this.getDuration();
      let t = time ? time : 0;
      t = time <= 0 ? 0 : time;
      t = time > duration ? duration : time;
      const progress = t == 0 ? 0 : t / duration;
      if (isCenter) {
        this.seekAndCenter(progress);
      } else {
        this.seekTo(progress);
      }
    },
    // アノテーション操作
    addTier: function(key, type, parent = null) {
      this.$vuewer.console.log(
        "mixin:vuewer",
        `add tier (key = ${key}, type=${type})`
      );
      if (this.$ws) this.$ws.addTier(key, type, parent);
    },
    deleteTier: function(key) {
      if (this.$ws) {
        this.$ws.deleteTier(key);
        this.$vuewer.console.log("mixin:vuewer", `delete tier (key=${key})`);
      }
    },
    copyTier: function(ref, key, type, parent, withText = true) {
      if (this.$ws) {
        this.$ws.copyTier(ref, key, type, parent, withText);
        this.$vuewer.console.log(
          "mixin:vuewer",
          `copy tier (ref=${ref}, key=${key})`
        );
      }
    },
    updateTier: function(key, obj) {
      if (this.$ws) {
        this.$ws.updateTier(key, obj);
        this.$vuewer.console.log(
          "mixin:vuewer",
          `update tier (key=${key}, new key=${name}, type=$.type})`
        );
      }
    },
    addTierValue: function(key, obj) {
      if (this.$ws) this.$ws.addTierValue(key, obj);
    },
    setTierValue: function(key, idx, obj) {
      if (this.$ws) this.$ws.setTierValue(key, idx, obj);
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
    },
    // Event 発火
    $fire: function(event) {
      if (this.$ws) {
        const el = this.$ws.wavesurfer;
        if (el) {
          const i = Object.keys(el.handlers || {}).findIndex(x => x == event);
          if (i != -1) {
            el.fireEvent(event);
          } else {
            const el = this.$ws.wavesurfer.drawer;
            const i = Object.keys(el.handlers || {}).findIndex(x => x == event);
            if (i != -1) {
              el.fireEvent(event);
            }
          }
        }
      }
    }
  }
};
