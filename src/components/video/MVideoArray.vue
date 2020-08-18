<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-col class="pa-0">
        <v-card tile flat color="transparent">
          <video muted ref="videoPre" :style="videoStyle" :src="videoSource" />
        </v-card>
      </v-col>

      <v-col class="pa-0">
        <v-card tile flat color="transparent">
          <video
            ref="video"
            @loadeddata="onLoadeddata"
            @timeupdate="onTimeupdate"
            :style="videoStyle"
            :src="videoSource"
          />
          <canvas ref="canvas" v-show="false" :style="videoStyle" />
        </v-card>
      </v-col>

      <v-col class="pa-0">
        <v-card tile flat color="transparent">
          <video muted ref="videoPos" :style="videoStyle" :src="videoSource" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MVideoMixin from "@/mixins/MVideoMixin";
export default {
  name: "WVideo",
  mixins: [MVideoMixin],
  props: {
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
          this.$refs.videoPre.currentTime = time;
        }
        if (offsetTime + currentTime < this.getDuration()) {
          const time = currentTime + offsetTime;
          this.$refs.videoPos.currentTime = time;
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
