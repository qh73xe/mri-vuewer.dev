<template>
  <v-container fluid v-if="videoSource">
    <m-vuewer ref="video" :src="videoSource" :fps="fps" :duration="duration" />
  </v-container>
</template>
<script>
import db from "@/storage/db";
import MVuewer from "@/components/MVuewer";
import MVideoMixin from "@/mixins/MVideoMixin";

export default {
  name: "vuewer",
  mixins: [MVideoMixin],
  components: {
    MVuewer
  },
  data: () => ({
    isLoading: false,
    videoElm: null
  }),
  methods: {
    onMounted: function(id) {
      if (id) {
        this.isLoading = true;
        db.files.get(Number(id)).then(x => {
          this.videoName = x.name;
          this.videoSource = x.source;
          this.fps = x.fps;
          this.duration = x.duration;
          this.videoStream = x.videoStream;
          this.audioStream = x.audioStream;
          this.originSize = x.originSize;
          this.isLoading = false;
        });
      } else {
        alert("no file");
      }
    }
  },
  watch: {
    "$route.params.id": function(val) {
      this.onMounted(val);
    }
  },
  mounted: function() {
    const id = this.$route.params.id;
    this.onMounted(id);
  }
};
</script>
<style scoped></style>
