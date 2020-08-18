<template>
  <v-container fluid>
    <m-vuewer v-if="$source" ref="video" :src="$source" :fps="$fps" />
  </v-container>
</template>
<script>
import db from "@/storage/db";
import MVuewer from "@/components/MVuewer";
import MVideoTWBMixin from "@/mixins/MVideoTWBMixin";
export default {
  name: "vuewer",
  mixins: [MVideoTWBMixin],
  components: {
    MVuewer
  },
  data: () => ({
    isLoading: false,
    videoElm: null
  }),
  computed: {
    source: {
      get() {
        return this.$store.state.current.video.source;
      },
      set(val) {
        this.$store.commit("current/video/source", val);
      }
    },
    fps: {
      get() {
        return this.$store.state.current.video.fps;
      },
      set(val) {
        this.$store.commit("current/video/fps", val);
      }
    }
  },
  methods: {
    /**
     * onIdChanged.
     *
     * ルータの id が変更した際に呼ばれます.
     *
     * これは id を元に動画の情報を取得し,
     * this.$store.state.current 以下の情報を書き換えます.
     */
    onIdChanged: function(id) {
      if (id) {
        this.isLoading = true;

        // 画面表示する動画情報を初期化する
        this.$initVideo();
        db.files.get(Number(id)).then(x => {
          this.$source = x.source;
          this.$fps = x.fps;

          this.$name = x.name;
          this.$duration = x.duration;
          this.$videoStream = x.videoStream;
          this.$audioStream = x.audioStream;
          this.$originSize = x.originSize;
          this.isLoading = false;
        });
      } else {
        alert("no file");
      }
    }
  },
  watch: {
    "$route.params.id": function(val) {
      this.onIdChanged(val);
    }
  },
  mounted: function() {
    const id = this.$route.params.id;
    this.onIdChanged(id);
  }
};
</script>
<style scoped></style>
