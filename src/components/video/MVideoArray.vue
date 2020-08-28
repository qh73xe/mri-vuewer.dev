<template>
  <m-video-array-layout>
    <template v-slot:prev>
      <m-video
        muted
        flat
        ref="prev"
        :style="videoStyle"
        :origin-size="originSize"
        :frames="frames"
        :src="src"
      />
    </template>
    <m-video
      flat
      ref="video"
      @loadeddata="onLoadeddata"
      @timeupdate="onTimeupdate"
      :origin-size="originSize"
      :frames="frames"
      :style="videoStyle"
      :src="src"
    />

    <template v-slot:next>
      <m-video
        flat
        muted
        ref="next"
        :src="src"
        :origin-size="originSize"
        :frames="frames"
        :style="videoStyle"
      />
    </template>
  </m-video-array-layout>
</template>

<script>
import MVideoArrayLayout from "@/components/layouts/MVideoArrayLayout.vue";
import MVideo from "@/components/video/MVideo.vue";
export default {
  name: "WVideo",
  components: { MVideoArrayLayout, MVideo },
  props: {
    src: {
      type: String,
      required: true
    },
    fps: {
      type: Number,
      required: true
    },
    originSize: {
      type: Object,
      required: true
    },
    frames: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // どの程度前後をずらすか?
    frameOffset: {
      type: Number,
      default: 1
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
        const offsetTime = this.frameOffset * this.frameRate;
        if (currentTime - offsetTime > 0) {
          const time = currentTime - offsetTime;
          this.$refs.prev.setCurrentTime(time);
        }
        if (offsetTime + currentTime < this.getDuration()) {
          const time = currentTime + offsetTime;
          this.$refs.next.setCurrentTime(time);
        }
        this.syncFrame();
      }
    },
    syncFrame: function() {
      const video = this.$refs.video;
      if (video) {
        const dataURL = video.getVideoDataURL();
        if (video.frame.time) {
          const i = this.frames.findIndex(x => {
            return x.time == video.frame.time;
          });
          if (i !== -1) {
            const frame = this.frames[i];
            frame.src = dataURL;
            this.$emit("frame-updated", frame);
          } else {
            this.$emit("frame-updated", {
              i: null,
              time: this.getCurrentTime(),
              points: [],
              rects: [],
              texts: [],
              src: dataURL
            });
          }
        } else {
          this.$emit("frame-updated", {
            i: null,
            time: this.getCurrentTime(),
            points: [],
            rects: [],
            texts: [],
            src: dataURL
          });
        }
      }
    },
    getDuration: function() {
      if (this.$refs.video) {
        return this.$refs.video.getDuration();
      }
    },
    getCurrentTime: function() {
      if (this.$refs.video) {
        return this.$refs.video.getCurrentTime();
      }
    },
    // イベント発火
    onLoadeddata(elm) {
      // 完全に 0 にすると画像取得ができない
      this.$refs.video.setCurrentTime(0);
      this.$emit("loadeddata", elm);
    },
    onTimeupdate: function(time) {
      this.$emit("timeupdate", time);
      this.syncVideos(time);
    }
  }
};
</script>
