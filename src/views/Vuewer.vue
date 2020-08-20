<template>
  <v-container fluid>
    <m-vuewer
      v-if="!isLoading && $source"
      ref="video"
      :src="$source"
      :fps="$fps"
      :frames="frames"
      :origin-size="$originSize"
      :old-textgrid="textgrid"
      @textgrid-updated="onTextGridUpdated"
    />
    <m-loading-dialog v-model="isLoading">
      now loading ...
    </m-loading-dialog>
  </v-container>
</template>
<script>
import db from "@/storage/db";
import MVuewer from "@/components/MVuewer";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog";
import MSnackbarMixin from "@/mixins/MSnackbarMixin";
import MVideoTWBMixin from "@/mixins/MVideoTWBMixin";
export default {
  name: "vuewer",
  mixins: [MVideoTWBMixin, MSnackbarMixin],
  components: {
    MVuewer,
    MLoadingDialog
  },
  data: () => ({
    isLoading: false,
    videoElm: null,
    frames: [],
    item: {}, // DB データ更新用オブジェクト
    textgrid: {}
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
        this.log({ msg: `change id ${id}` });
        this.isLoading = true;
        // 画面表示する動画情報を初期化する
        this.$initVideo();
        db.files
          .get(Number(id))
          .then(x => {
            this.item = x;
            this.$source = x.source;
            this.$fps = x.fps;

            this.$name = x.name;
            this.$duration = x.duration;
            this.$videoStream = x.videoStream;
            this.$audioStream = x.audioStream;
            this.$originSize = x.originSize;

            this.frames = x.frames;
            this.textgrid = x.textgrid || null;
          })
          .catch(error => this.showError(error))
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.showError("no id");
      }
    },
    // DB ファイルのテキストグリッド情報を更新する
    updateTextGrid: function(textgrid) {
      const vm = this;
      this.item.textgrid = Object.assign({}, textgrid);
      for (const key in this.item.textgrid) {
        this.item.textgrid[key] = {
          type: textgrid[key].type,
          values: textgrid[key].values
        };
      }
      db.files
        .put(this.item)
        .then(id => {
          const msg = `update the textgrid of a file (id=${id})`;
          vm.log({ msg: msg });
        })
        .catch(error => {
          const msg = `failed: update the textgrid of a file (id=${this.item.id})`;
          vm.error({ msg: msg, error: error });
          console.error(error);
        });
    },
    log: function(payload) {
      this.$store.commit("logging/log", payload);
    },
    error: function(payload) {
      this.$store.commit("logging/error", payload);
    },
    onTextGridUpdated: function(payload) {
      if (payload) {
        this.updateTextGrid(payload);
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
