<template>
  <v-file-input
    :label="`${$vuetify.lang.t('$vuetify.io.mVideoInput.title')}*`"
    prepend-icon="mdi-file-video"
    accept="*.mp4,*.MP4"
    show-size
    @change="onChange"
  />
</template>
<script>
import io from "@/io";

const initVideo = () => {
  return {
    name: null,
    source: null,
    fps: null,
    duration: null,
    videoStream: null,
    audioStream: null,
    originSize: null
  };
};

export default {
  name: "MVideoInput",
  data: () => ({
    video: initVideo()
  }),
  methods: {
    clearVideo: function() {
      this.video = initVideo();
    },
    onChange: async function(e) {
      this.clearVideo();
      if (e) {
        this.$emit("loading");
        this.video.name = e.name;
        this.video.source = await io.file.toBase64(e);
        if (e.arrayBuffer) {
          const buff = await e.arrayBuffer();
          io.video.info(buff, res => {
            this.video.fps = res.videoStream.fps;
            this.video.videoStream = res.videoStream;
            this.video.audioStream = res.audioStream;
            this.video.originSize = res.size;
            this.video.duration = res.duration;
            this.$emit("loaded", this.video);
          });
        } else {
          this.$emit("loaded", this.video);
        }
      } else {
        this.$emit("loaded", null);
      }
    }
  }
};
</script>
