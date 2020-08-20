<template>
  <m-vuwer-layout ref="layout" @resize="onResize">
    <template v-slot:video>
      <m-video-array
        :src="src"
        :fps="fps"
        :frameOffset="frameOffset"
        :origin-size="originSize"
        :frames="frames"
        @resize="onResize"
        @loadeddata="onLoadeddata"
        @frame-updated="onFrameUpdated"
      />
      <m-vuwer-actions :fps="fps" v-if="wavesurfer" />
    </template>
    <template v-slot:table>
      <m-text-grid
        @click-image-edit="onClickImageEdit"
        @click-ruler="onClickRuler"
        :frames="frames"
        :textgrid="textgrid"
        :video-height="videoHeight"
      />
    </template>

    <wave-surfer
      ref="wavesurfer"
      backend="MediaElement"
      splitChannels
      normalize
      responsive
      scrollParent
      showTextGrid
      :source="videoElm"
      :skipLength="skipLength"
      :minPxPerSec="minPxPerSec"
      :freqRate="freqRate"
      :targetChannel="targetChannel"
      :spectrogramHeight="spectrogramHeight"
      :showTimeLine="showTimeLine"
      :showSpectrogram="showSpectrogram"
      :showFreqLabel="showFreqLabel"
      :cursorColor="cursorColor"
      :waveColor="waveColor"
      :progressColor="progressColor"
      @spectrogram-render-start="onSpectrogramRenderStart"
      @spectrogram-render-end="onSpectrogramRenderEnd"
      @textgrid-dblclick="onDblclickTextGrid"
      @textgrid-click="onClickTextGrid"
      @textgrid-update="onTextGridUpdate"
      @textgrid-current-update="onTextGridCurrentUpdate"
    >
      <template v-slot:textform>
        <v-text-field
          v-if="current.tier.key"
          v-model="current.tier.item.text"
          class="ma-0"
          label="text"
          outline
          hide-details
          :disabled="current.tier.key == null"
          @keydown.enter="onUpdateCurrentItem"
        />
      </template>

      <div class="text-center" v-if="isLoading">
        <v-progress-circular
          :size="100"
          :width="10"
          color="primary"
          indeterminate
        />
        <div class="font-weight-light subtitle-1">
          Sound Analyzing ...
        </div>
      </div>
    </wave-surfer>

    <template v-slot:bottom>
      <m-speed-dial
        @click-detail="onClickDetail"
        @click-ruler="onClickRuler"
        @click-image-edit="onClickImageEdit"
        @click-tier-add="onClickTierAdd"
        @click-tier-edit="onClickTierEdit"
        @click-tier-delete="onClickTierDelete"
      />
      <m-detail-dialog v-model="dialog.detail.show" :src="current.frame.src" />
      <m-tier-dialog v-model="dialog.tier.show" :tiers="tiers" />
      <m-tier-edit-dialog v-model="dialog.tierEdit.show" :tiers="tiers" />
      <m-tier-delete-dialog v-model="dialog.tierDelete.show" :tiers="tiers" />
      <m-ruler-dialog
        v-if="originSize.width"
        v-model="dialog.ruler.show"
        :origin-size="originSize"
        :src="current.frame.src"
      />
      <m-image-edit-dialog v-model="dialog.imageEdit.show" />
    </template>
  </m-vuwer-layout>
</template>

<script>
/**
 * MVuwer.vue
 *
 * このコンポーネントの役割は種々アノテーション画面情報の受け渡しです.
 * 基本的にそれ以外のことはしないことに注意してください.
 */

import WaveSurfer from "wavesurfer.vue";
import MVuwerLayout from "@/components/layouts/MVuwerLayout";
import MVideoArray from "@/components/video/MVideoArray";
import MTextGrid from "@/components/MTextGrid";
import MVuwerActions from "@/components/actions/MVuewerActions";
import MDetailDialog from "@/components/dialogs/MDetailDialog";
import MTierDialog from "@/components/dialogs/MTierDialog";
import MTierEditDialog from "@/components/dialogs/MTierEditDialog";
import MTierDeleteDialog from "@/components/dialogs/MTierDeleteDialog";
import MRulerDialog from "@/components/dialogs/MRulerDialog";
import MImageEditDialog from "@/components/dialogs/MImageEditDialog";
import MSpeedDial from "@/components/MSpeedDial";
import MSettingMixin from "@/mixins/MSettingMixin";
import MSnackbarMixin from "@/mixins/MSnackbarMixin";

export default {
  name: "WVuwer",
  mixins: [MSettingMixin, MSnackbarMixin],
  components: {
    MVuwerLayout,
    MVideoArray,
    MTextGrid,
    WaveSurfer,
    MSpeedDial,
    MDetailDialog,
    MTierDialog,
    MTierEditDialog,
    MTierDeleteDialog,
    MRulerDialog,
    MImageEditDialog,
    MVuwerActions
  },
  props: {
    /**
     * 解析対象の動画ソース
     */
    src: {
      type: String,
      required: true
    },
    /**
     * 解析対象の動画の fps
     */
    fps: {
      type: Number,
      required: true
    },
    // 動画オリジナルサイズ
    originSize: {
      type: Object,
      required: true
    },
    // 既存アノテーション情報
    oldTextgrid: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 各種画像アノテーション結果
    frames: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // スキップ時に何フレーム分をスキップするか
    frameOffset: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    videoElm: null, // WS のレンダ対象
    videoHeight: null, // ビデオ表示領域の最大幅
    isLoading: false, // WS がレンダ中か否か
    isSyncing: false, // 過去データを反映中か否か
    dialog: {
      detail: {
        show: false
      },
      // TIER 編集ダイアログ
      tier: {
        show: false
      },
      tierEdit: {
        show: false
      },
      tierDelete: {
        show: false
      },
      ruler: {
        show: false
      },
      imageEdit: {
        show: false
      }
    },
    current: {
      // 現在フォーカスが当たっている TIER 情報
      tier: {
        key: null,
        // 現在選択されている TIER ITEM
        item: {
          idx: 0,
          text: "",
          time: 0
        },
        values: []
      },
      // 現在時刻のフレーム情報
      frame: {
        i: null, // 現在フレーム番号
        time: null, // 現在フレーム時刻
        src: null, // 現在フレーム画像
        points: [],
        rects: [],
        texts: []
      }
    },
    tiers: []
  }),
  computed: {
    wavesurfer: {
      get() {
        return this.$store.state.current.wavesurfer;
      },
      set(val) {
        this.$store.commit("current/waveSurfer", val);
      }
    },
    textgrid: {
      get() {
        return this.$store.state.current.textgrid;
      },
      set(val) {
        this.$store.commit("current/textGrid", val);
      }
    },
    // fps の逆数
    frameRate: function() {
      return 1 / this.fps;
    },

    // スキップ時の長さ
    skipLength: function() {
      return this.frameOffset * this.frameRate;
    }
  },
  watch: {
    textgrid: {
      handler: function(val, oldVal) {
        if (val && val != oldVal) {
          this.tiers = [];
          for (const key in val) {
            this.tiers.push(key);
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 動画表示領域の最大高さが決定された場合の動作
    onResize: function(payload) {
      this.videoHeight = payload;
    },
    // 動画の読み込みが終了した場合の動作
    onLoadeddata: function(payload) {
      if (payload) {
        this.videoElm = payload;
        this.$nextTick(() => {
          // 他コンポーネントで WS の操作を実施可能にする
          this.wavesurfer = this.$refs.wavesurfer;

          // レイアウトのリサイズ
          this.$refs.layout.onResize();
        });
      }
    },

    // 動画現在画像が変更された場合の動作
    onFrameUpdated(payload) {
      this.current.frame = payload;
    },

    // スペクトログラムのレンダが始まった場合の動作
    onSpectrogramRenderStart() {
      this.isLoading = true;
    },

    // スペクトログラムのレンダが終了した場合の動作
    onSpectrogramRenderEnd() {
      // 既存のアノテーション情報を反映
      if (this.oldTextgrid) {
        this.isSyncing = true;
        for (const key in this.oldTextgrid) {
          this.wavesurfer.addTier(key, this.oldTextgrid[key].type);
          for (const val of this.oldTextgrid[key].values) {
            if (val) this.wavesurfer.addTierValue(key, val);
          }
        }
        this.isSyncing = false;
      }
      this.isLoading = false;
    },

    // TEXTGRID をダブルクリックされた場合の動作
    onDblclickTextGrid: function(obj) {
      const key = obj.key;
      const item = {
        time: obj.time,
        text: ""
      };
      this.wavesurfer.addTierValue(key, item);
    },

    // TEXTGRID をシングルクリックされた場合の動作
    onClickTextGrid: function(obj) {
      if (obj.item) {
        this.current.key = obj.key;
        this.current.text = obj.item.text;
        this.current.time = obj.item.time;
      }
    },
    // TEXTGRID の Text field がエンターされた場合
    onUpdateCurrentItem: function() {
      const tier = this.current.tier;
      const key = tier.key;
      const item = {
        time: tier.item.time,
        text: tier.item.text
      };
      const idx = this.current.tier.item.idx;

      const len = this.textgrid[key].values.length;
      if (len - 1 == idx) {
        this.showWarning("最後の値は空です");
      } else {
        this.wavesurfer.setTierValue(key, idx, item);
      }
    },
    // TEXTGRID 情報が更新された場合の動作
    onTextGridUpdate: function(textgrid) {
      if (textgrid) {
        this.textgrid = Object.assign({}, textgrid);
        if (!this.isSyncing) {
          this.$emit("textgrid-updated", this.textgrid);
        }
      }
    },

    // TEXTGRID のフォーカス情報が更新された場合の動作
    onTextGridCurrentUpdate: function(payload) {
      this.current.tier.key = payload.key;
      this.current.tier.item.idx = payload.index;
      if (payload.item) {
        this.current.tier.item.time = payload.item.time;
        this.current.tier.item.text = payload.item.text;
      } else {
        this.current.tier.item.time = 0;
        this.current.tier.item.text = "";
      }
    },

    // 動画情報出力ダイアログが要求された場合の動作
    onClickDetail: function() {
      this.dialog.detail.show = true;
    },
    // 画像編集モードを要求された場合の動作
    onClickRuler: function(payload) {
      console.log(payload);
      this.dialog.ruler.show = true;
    },
    // 画像編集モードを要求された場合の動作
    onClickImageEdit: function(payload) {
      console.log(payload);
      this.dialog.imageEdit.show = true;
    },
    // 新規アノテーション階層作成ダイアログが要求された場合の動作
    onClickTierAdd: function() {
      this.dialog.tier.show = true;
    },
    onClickTierEdit: function() {
      this.dialog.tierEdit.show = true;
    },
    onClickTierDelete: function() {
      this.dialog.tierDelete.show = true;
    }
  }
};
</script>

<style scoped></style>
