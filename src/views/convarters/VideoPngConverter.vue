<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-card>
      <v-card-text>
        <m-video-input @loading="onLoading" @loaded="onLoaded" />
      </v-card-text>
    </v-card>
    <m-loading-dialog v-model="isLoading">{{ status }}</m-loading-dialog>
  </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
import MVideoInput from "@/components/form/MVideoInput";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog";
export default {
  name: "video-png-converter",
  components: { MViewLayout, MVideoInput, MLoadingDialog },
  data: () => ({
    isLoading: false,
    status: ""
  }),
  computed: {
    heading: () => "Converter: mp4 to pngs",
    desc: () =>
      "mp4 ファイルを受け取り各フレーム毎の PNG ファイルを取得するデモです"
  },
  methods: {
    onLoading: function() {
      this.isLoading = true;
      this.status = "動画変換中...";
    },
    onLoaded: async function(payload) {
      if (payload.source) {
        const buff = this.$vuewer.io.file.toBuff(payload.source);
        const result = this.$vuewer.io.video.toPng(buff, payload.fps);

        this.status = "ZIP 変換中...";
        if (result.MEMFS) {
          const files = [];
          for (const out of result.MEMFS) {
            const blob = new Blob([out.data], { type: out.type });
            const base64 = await this.$vuewer.io.file.toBase64(blob);
            files.push({ name: out.name, base64 });
          }
          const zip = await this.$vuewer.io.zip.toZip(files);
          this.$vuewer.io.file.download(zip, "result.zip");
        }
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped></style>
