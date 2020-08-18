<template>
  <m-video-array-layout>
    <template v-slot:prev>
      <video muted ref="prev" :style="videoStyle" :src="src" />
    </template>
    <video
      ref="video"
      @loadeddata="onLoadeddata"
      @timeupdate="onTimeupdate"
      :style="videoStyle"
      :src="src"
    />
    <canvas ref="canvas" v-show="false" :style="videoStyle" />

    <template v-slot:next>
      <video muted ref="next" :style="videoStyle" :src="src" />
    </template>
  </m-video-array-layout>
</template>

<script>
import MVideoArrayLayout from "@/components/layouts/MVideoArrayLayout.vue";
import MVideoMixin from "@/mixins/MVideoMixin";
export default {
  name: "WVideo",
  components: { MVideoArrayLayout },
  mixins: [MVideoMixin],
  props: {
    src: {
      type: String,
      required: true
    },
    frameOffset: {
      type: Number,
      default: 1
    },
    headerColor: {
      type: String,
      default: "primary"
    }
  },
  data: () => ({
    el: null,
    systemBarClass: "caption text-truncate",
    videoStyle: {
      width: "100%",
      height: "auto"
    }
  }),
  computed: {
    frameRate: function() {
      return 1 / this.fps;
    }
  },
  methods: {
    t: function(key) {
      return this.$vuetify.lang.t(`$vuetify.wVideo.${key}`);
    },
    syncVideos: function(currentTime) {
      if (this.$refs.video) {
        this.syncCanvas();
        const offsetTime = this.frameOffset * this.frameRate;
        if (currentTime - offsetTime > 0) {
          const time = currentTime - offsetTime;
          this.$refs.prev.currentTime = time;
        }
        if (offsetTime + currentTime < this.getDuration()) {
          const time = currentTime + offsetTime;
          this.$refs.next.currentTime = time;
        }
      }
    },
    syncCanvas: function() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      if (video && canvas) {
        if (this.originSize && this.originSize.width) {
          canvas.width = this.originSize.width;
          canvas.height = this.originSize.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0);
          const dataUrl = canvas.toDataURL();
          this.$emit("syncCanvas", dataUrl);
        }
      }
    },
    getFrame: function() {
      const video = this.$refs.video;
      const canvas = document.createElement("canvas");
      if (video) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientWidth;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL();
        return dataUrl;
      }
    },
    getDuration: function() {
      if (this.$refs.video) {
        return this.$refs.video.duration;
      }
    },
    getCurrentTime: function() {
      if (this.$refs.video) {
        return this.$refs.video.currentTime;
      }
    },
    // イベント発火
    onLoadeddata() {
      const video = this.$refs.video;
      this.$emit("loadeddata", video);
    },
    onTimeupdate: function() {
      const currentTime = this.getCurrentTime();
      this.$emit("timeupdate", currentTime);
      this.syncVideos(currentTime);
    }
  }
};
</script>
