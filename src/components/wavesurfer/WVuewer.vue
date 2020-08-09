<template>
  <v-container v-resize="onResize" fluid class="pa-0">
    <v-row>
      <v-col class="flex-grow-1 flex-shrink-1">
        <v-card ref="videoCard" flat>
          <w-video
            ref="videoArray"
            :src="src"
            :frameOffset="frameOffset"
            :fps="fps"
            @loadeddata="onLoadeddata"
            @syncCanvas="onSyncCanvas"
          />
        </v-card>
      </v-col>
      <v-col cols="5" class="flex-grow-1 flex-shrink-1 d-none d-sm-flex">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WVideo from "@/components/wavesurfer/WVideo.vue";
export default {
  name: "WVuwer",
  components: { WVideo },
  props: {
    src: {
      type: String,
      requested: true
    },
    fps: {
      type: Number,
      requested: true
    },
    frameOffset: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    videoHeight: 0
  }),
  methods: {
    setVideoHeight() {
      this.$nextTick(() => {
        const el = this.$refs.videoCard ? this.$refs.videoCard.$el : null;
        if (el) {
          this.videoHeight = el.clientHeight;
        }
      });
    },
    onResize() {
      this.setVideoHeight();
    },
    onSyncCanvas(payload) {
      console.log(payload);
    },
    onLoadeddata: function(payload) {
      if (payload) {
        console.log(payload);
      }
    }
  }
};
</script>

<style scoped></style>
