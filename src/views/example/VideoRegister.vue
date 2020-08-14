<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-card>
      <m-video-input @loading="onLoading" @loaded="onLoaded" />
      <pre>{{ videos }}</pre>
    </v-card>
    <m-loading-dialog v-model="isLoading">
      {{ status }}
    </m-loading-dialog>
  </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
import MVideoInput from "@/components/form/MVideoInput";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog";
import db from "@/storage/db";
export default {
  name: "video-register",
  components: { MViewLayout, MLoadingDialog, MVideoInput },
  data: () => ({
    heading: "Example: Video Registration",
    desc: "mp4 ファイルを受け取り内部 DB に登録するデモです",
    isLoading: false,
    status: "",
    videos: []
  }),
  methods: {
    onLoading: function() {
      this.isLoading = true;
      this.status = "ファイル情報を取得中...";
    },
    onLoaded: async function(payload) {
      this.isLoading = false;
      if (payload) {
        db.files.put(payload);
        this.videos = await db.files.toArray();
      }
    }
  },
  mounted: async function() {
    this.videos = await db.files.toArray();
  }
};
</script>

<style scoped></style>
