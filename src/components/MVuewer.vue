<template>
  <m-vuwer-layout>
    <template v-slot:video>
      <m-video-array
        :src="src"
        :frameOffset="frameOffset"
        @loadeddata="onLoadeddata"
        @syncCanvas="onSyncCanvas"
      />
      <m-vuwer-actions v-if="wavesurfer" />
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
      @textgrid-dblclick="onDblclick"
      @textgrid-click="onClick"
      @textgrid-update="onTextGridUpdate"
      @textgrid-current-update="onTextGridCurrentUpdate"
    >
      <template v-slot:textform>
        <v-text-field
          v-if="current.tier.key"
          v-model="current.tier.text"
          class="ma-0"
          label="text"
          outline
          hide-details
          :disabled="current.tier.key == null"
          @keydown.enter="saveTierValue"
        />
      </template>
      <template v-slot:table>
        <m-text-grid />
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
      <m-speed-dial @click-tier-add="dialog.tier.show = true" />
      <m-tier-dialog v-model="dialog.tier.show" />
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
import MTextGrid from "@/components/textgrid/MTextGrid";
import MVuwerActions from "@/components/actions/MVuewerActions";
import MTierDialog from "@/components/dialogs/MTierDialog";
import MSpeedDial from "@/components/MSpeedDial";
import MSettingMixin from "@/mixins/MSettingMixin";

export default {
  name: "WVuwer",
  mixins: [MSettingMixin],
  components: {
    MVuwerLayout,
    MVideoArray,
    MTextGrid,
    WaveSurfer,
    MSpeedDial,
    MTierDialog,
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
    // スキップ時に何フレーム分をスキップするか
    frameOffset: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    videoElm: null, // WS のレンダ対象
    isLoading: false, // WS がレンダ中か否か
    dialog: {
      // TIER 編集ダイアログ
      tier: {
        show: false,
        target: null // 編集対象がある場合には TIER 名
      }
    },
    current: {
      // 現在フォーカスが当たっている TIER 情報
      tier: {
        key: null,
        text: null,
        time: null,
        idx: null,
        values: []
      },
      // 現在時刻のフレーム情報
      frame: {
        src: null // 現在時刻画像
      }
    }
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
  methods: {
    // 動画の読み込みが終了した場合の動作
    onLoadeddata: function(payload) {
      if (payload) {
        this.videoElm = payload;
        this.$nextTick(() => {
          // 他コンポーネントで WS の操作を実施可能にする
          this.wavesurfer = this.$refs.wavesurfer;
        });
      }
    },

    // 動画現在画像が変更された場合の動作
    onSyncCanvas(payload) {
      this.current.frame.src = payload;
    },

    // スペクトログラムのレンダが始まった場合の動作
    onSpectrogramRenderStart() {
      this.isLoading = true;
    },

    // スペクトログラムのレンダが終了した場合の動作
    onSpectrogramRenderEnd() {
      this.isLoading = false;
    },

    // TEXTGRID をダブルクリックされた場合の動作
    onDblclick: function(obj) {
      const key = obj.key;
      const item = {
        time: obj.time,
        text: ""
      };
      this.wavesurfer.addTierValue(key, item);
    },

    // TEXTGRID をシングルクリックされた場合の動作
    onClick: function(obj) {
      if (obj.item) {
        this.current.tier.key = obj.key;
        this.current.tier.text = obj.item.text;
        this.current.tier.time = obj.item.time;
      }
    },

    // TEXTGRID 情報が更新された場合の動作
    onTextGridUpdate: function(textgrid) {
      this.textgrid = textgrid;
    },

    // TEXTGRID のフォーカス情報が更新された場合の動作
    onTextGridCurrentUpdate: function(payload) {
      this.current.tier.key = payload.key;
      this.current.tier.idx = payload.index;
      if (payload.tier.item) {
        this.current.tier.time = payload.item.time;
        this.current.tier.text = payload.item.text;
      } else {
        this.current.tier.time = 0;
        this.current.tier.text = "";
      }
    }
  }
};
</script>

<style scoped></style>
