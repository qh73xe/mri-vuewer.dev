<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col cols="12">
      <m-t-card title="Sample Videos">
        <v-list flat>
          <v-subheader>Select one item for the live demo.</v-subheader>
          <v-list-item-group v-model="sample" color="primary">
            <v-list-item v-for="(item, i) in samples" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </m-t-card>
    </v-col>
    <v-col cols="12" v-if="sample !== null">
      <m-t-card title="Live Demo">
        <v-card-text class="text-center" v-if="loading.isloading">
          <v-progress-circular
            :size="100"
            :width="10"
            color="primary"
            indeterminate
          />
          <div class="font-weight-light subtitle-1">
            {{ loading.status }}
          </div>
        </v-card-text>
        <v-container fluid v-else-if="video.source">
          <w-vuewer
            ref="video"
            :src="video.source"
            :fps="video.fps"
            :duration="video.duration"
          />
        </v-container>
      </m-t-card>
    </v-col>
  </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
import MTCard from "@/components/base/card/MTCard.vue";
import WVuewer from "@/components/wavesurfer/WVuewer.vue";
import io from "@/io";
export default {
  name: "Demo",
  components: {
    MViewLayout,
    MTCard,
    WVuewer
  },
  data: () => ({
    heading: "Live Demo",
    sample: null,
    samples: ["sample1.mp4", "sample2.mp4", "sample3.mp4"],
    loading: {
      isloading: false,
      status: null
    },
    video: {
      filename: null,
      source: null,
      fps: null,
      duration: null,
      videoStream: null,
      audioStream: null,
      originSize: null
    }
  }),
  watch: {
    sample: function(val, oldval) {
      if (val !== null) {
        if (val != oldval) {
          this.initVideo();
          const filename = this.samples[val];
          this.fetchVideo(filename);
        }
      }
    }
  },
  methods: {
    initVideo: function() {
      this.video = {
        source: null,
        fps: null,
        videoStream: null,
        audioStream: null,
        originSize: null,
        duration: null
      };
    },
    fetchVideo: async function(filename) {
      this.loading.isloading = true;
      this.loading.status = "file downloading...";
      const url = this.toUrl(filename);
      const file = await io.file
        .fetch(url, filename, { type: "video/mp4" })
        .catch(() => {
          this.loading.isloading = false;
          return null;
        });
      if (file) {
        this.loading.status = "load vide info...";
        if (file.arrayBuffer) {
          const buff = await file.arrayBuffer();
          io.video.info(buff, res => {
            this.video.fps = res.videoStream.fps;
            this.video.videoStream = res.videoStream;
            this.video.audioStream = res.audioStream;
            this.video.originSize = res.size;
            this.video.duration = res.duration;
            this.loading.status = "load vide file...";
            io.file.toBase64(file).then(res => {
              if (res) {
                this.video.source = res;
                this.video.filename = filename;
              }
              this.loading.isloading = false;
            });
          });
        } else {
          this.loading.isloading = false;
        }
      }
    },
    toUrl: function(filename) {
      return `https://raw.githubusercontent.com/qh73xe/mri-vuewer.dev/master/misc/${filename}`;
    }
  },
  computed: {
    desc: function() {
      return `${this.$vuetify.lang.t("$vuetify.demo.disc")}`;
    }
  }
};
</script>

<style scoped></style>
