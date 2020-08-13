<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col>
      <v-card>
        <v-card-text>
          <v-image-converter-input
            @loading-file-info="onLoadingFileInfo"
            @loading-frames="onLoadingFrames"
            @loaded-frames="onLoadedFrames"
          />
        </v-card-text>
        <v-card-text v-if="frames.length > 0">
          <v-list>
            <v-list-item v-for="item in frames" :key="item.step">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.step }}: {{ item.time }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-img :src="item.src"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <m-loading-dialog v-model="isLoading">
      {{ status }}
    </m-loading-dialog>
  </m-view-layout>
</template>
<script>
import VImageConverterInput from "@/components/io/VImageConverterInput";
import MViewLayout from "@/components/base/MViewLayout";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog";
export default {
  name: "v-image-converter",
  components: {
    MViewLayout,
    MLoadingDialog,
    VImageConverterInput
  },
  data: () => ({
    heading: "Example: V-IMAGE-CONVERTER",
    desc: "mp4 動画を取得し地道に png に変換を掛けるデモです",
    isLoading: false,
    status: "",
    frames: []
  }),
  methods: {
    onLoadingFileInfo: function() {
      this.isLoading = true;
      this.status = "LOADING FILE INFO ...";
    },
    onLoadingFrames: function(payload) {
      this.status = `LOADING FRAMES ... (${payload.step} / ${payload.total})`;
    },
    onLoadedFrames: function(payload) {
      this.isLoading = false;
      this.frames = payload;
    }
  }
};
</script>

<style scoped></style>
