<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-card>
      <v-card-text>
        <v-image-converter-input
          @loading-file-info="onLoadingFileInfo"
          @loading-frames="onLoadingFrames"
          @loaded-frames="onLoadedFrames"
        />
      </v-card-text>
      <v-list v-if="frames.length > 0">
        <v-list-item
          v-for="item in frames"
          :key="item.step"
          @click="showFrame(item)"
        >
          <v-list-item-avatar tile>
            <v-img :src="item.src"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.step }}: {{ item.time }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <m-loading-dialog v-model="isLoading">
      {{ status }}
    </m-loading-dialog>
    <m-card-dialog v-model="frameDialog.show" :title="frameDialog.title">
      <v-img :src="frameDialog.item.src">
        <v-card-title>
          <v-spacer />
          <span class="image-text white--text">
            FRAME: {{ frameDialog.item.step }}
          </span>
        </v-card-title>
      </v-img>
    </m-card-dialog>
  </m-view-layout>
</template>
<script>
import VImageConverterInput from "@/components/io/VImageConverterInput";
import MViewLayout from "@/components/base/MViewLayout";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog";
import MCardDialog from "@/components/base/dialog/MCardDialog";
export default {
  name: "v-image-converter",
  components: {
    MViewLayout,
    MLoadingDialog,
    MCardDialog,
    VImageConverterInput
  },
  data: () => ({
    heading: "Example: V-IMAGE-CONVERTER",
    desc: "mp4 動画を取得し地道に png に変換を掛けるデモです",
    isLoading: false,
    status: "",
    frames: [],
    frameDialog: {
      show: false,
      title: "",
      item: {}
    }
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
    },
    showFrame: function(item) {
      console.log(item);
      this.frameDialog.show = true;
      this.frameDialog.item = item;
    }
  }
};
</script>

<style scoped>
.image-text {
  text-shadow: 1px 1px 2px #000000;
}
</style>
