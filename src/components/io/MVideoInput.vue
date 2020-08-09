<template>
  <v-file-input
    :label="`${$vuetify.lang.t('$vuetify.io.mVideoInput.title')}*`"
    :hint="$vuetify.lang.t('$vuetify.io.MVideoInput.hint')"
    v-model="file"
    prepend-icon="mdi-file-video"
    accept="*.mp4,*.MP4"
    show-size
    @change="onChangeFileInput"
  />
</template>
<script>
import io from "@/io";
export default {
  name: "MVideoInput",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    onChangeFileInput: async function(e) {
      this.video.loading = true;
      if (e) {
        this.video.name = e.name;
        if (e.arrayBuffer) {
          const buff = await e.arrayBuffer();
          io.video.info(buff, res => {
            this.video.size = res.size;
            if (res.duration) {
              this.video.duration = res.duration;
            }
            if (res.videoStream) {
              this.video.fps = res.videoStream.fps
                ? res.videoStream.fps
                : this.video.fps;
              this.video.videoStream = {
                codec_name: res.videoStream.codec_name,
                pix_fmt: res.videoStream.pix_fmt,
                bitrate: res.videoStream.bitrate,
                fps: res.videoStream.fps,
                tbc: res.videoStream.tbc,
                tbn: res.videoStream.tbn,
                tbr: res.videoStream.tbr
              };
            }
            if (res.audioStream) {
              this.video.audioStream = {
                codec_name: res.audioStream.codec_name,
                sample_rate: res.audioStream.sample_rate,
                channel_layout: res.audioStream.channel_layout,
                sample_fmt: res.audioStream.sample_fmt,
                bitrate: res.audioStream.bitrate
              };
            }
          });
          this.video.dataUrl = await io.file.toBase64(this.video.file);
        } else {
          this.initItem();
        }
        this.video.loading = false;
      } else {
        this.initItem();
        this.video.loading = false;
      }
    }
  },
  computed: {
    video: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("onChangeFileInput", val);
      }
    }
  }
};
</script>

<style scoped></style>
