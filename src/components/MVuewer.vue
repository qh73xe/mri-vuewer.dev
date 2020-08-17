<template>
  <m-vuwer-layout>
    <template v-slot:video>
      <m-video-array
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
          v-if="current.key"
          v-model="current.text"
          class="ma-0"
          label="text"
          outline
          hide-details
          :disabled="current.key == null"
          @keydown.enter="saveTierValue"
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
    <template v-slot:table>
      <m-text-grid />
    </template>
  </m-vuwer-layout>
</template>

<script>
import WaveSurfer from "wavesurfer.vue";
import MVuwerLayout from "@/components/layouts/MVuwerLayout";
import MVideoArray from "@/components/video/MVideoArray";
import MTextGrid from "@/components/textgrid/MTextGrid";
import MVuwerActions from "@/components/actions/MVuewerActions";
import MSettingMixin from "@/mixins/MSettingMixin";
import MWavesurferMixin from "@/mixins/MWavesurferMixin";
import MFrameMixin from "@/mixins/MFrameMixin";
import MVideoMixin from "@/mixins/MVideoMixin";
export default {
  name: "WVuwer",
  mixins: [MSettingMixin, MWavesurferMixin, MFrameMixin, MVideoMixin],
  components: {
    MVuwerLayout,
    MVideoArray,
    MTextGrid,
    WaveSurfer,
    MVuwerActions
  },
  props: {
    frameOffset: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    current: {
      key: null,
      text: null,
      time: null,
      idx: null,
      values: []
    },
    isLoading: false,
    videoElm: null,
    videoHeight: 0
  }),
  computed: {
    skipLength: function() {
      return this.fps / this.duration;
    }
  },
  methods: {
    onSyncCanvas(payload) {
      this.image = payload;
    },
    onLoadeddata: function(payload) {
      if (payload) {
        this.videoElm = payload;
        this.$nextTick(() => {
          this.wavesurfer = this.$refs.wavesurfer;
        });
      }
    },
    onSpectrogramRenderStart() {
      this.isLoading = true;
    },
    onSpectrogramRenderEnd() {
      this.isLoading = false;
      this.wavesurfer.addTier("IPU", "interval");
    },
    onDblclick: function(obj) {
      const key = obj.key;
      const item = {
        time: obj.time,
        text: ""
      };
      this.wavesurfer.addTierValue(key, item);
    },
    onClick: function(obj) {
      if (obj.item) {
        this.current.key = obj.key;
        this.current.text = obj.item.text;
        this.current.time = obj.item.time;
      }
    },
    onTextGridUpdate: function(textgrid) {
      this.textgrid = textgrid;
    },
    onTextGridCurrentUpdate: function(current) {
      this.current.key = current.key;
      this.current.idx = current.index;
      if (current.item) {
        this.current.time = current.item.time;
        this.current.text = current.item.text;
      } else {
        this.current.time = 0;
        this.current.text = "";
      }
    }
  },
  beforeDestroy: function() {
    this.initWaveSurfer();
    this.initVideo();
  }
};
</script>

<style scoped></style>
