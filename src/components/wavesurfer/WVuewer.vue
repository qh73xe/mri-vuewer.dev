<template>
  <w-vuwer-layout>
    <template v-slot:video>
      <w-video
        :src="src"
        :frameOffset="frameOffset"
        :fps="fps"
        @loadeddata="onLoadeddata"
        @syncCanvas="onSyncCanvas"
      />
      <w-vuwer-actions v-if="wavesurfer" />
    </template>
    <template v-slot:setting>
      <m-t-card tile dense title="Setting">
        <v-card-text>
          <v-slider
            append-icon="mdi-magnify-plus-cursor"
            prepend-icon="mdi-magnify-minus-cursor"
            step="100"
            :min="0"
            :max="500"
            :thumb-size="24"
            label="Zoom"
          >
            <template v-slot:thumb-label="{ value }">
              {{ (value / 100).toFixed(1) }}
            </template>
          </v-slider>
          <v-slider
            append-icon="mdi-magnify-plus-cursor"
            prepend-icon="mdi-magnify-minus-cursor"
            step="0.25"
            :min="0.25"
            :max="1"
            label="MaxFreq"
          >
            <template v-slot:thumb-label="{ value }">
              {{ value }}
            </template>
          </v-slider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary">New tier</v-btn>
          <v-spacer />
          <v-btn color="primary">Redraw</v-btn>
        </v-card-actions>
      </m-t-card>
    </template>
    <v-card>
      <wave-surfer
        ref="wavesurfer"
        v-if="videoSource"
        backend="MediaElement"
        splitChannels
        normalize
        responsive
        scrollParent
        showTextGrid
        :source="videoSource"
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
    </v-card>
    <template v-slot:table>
      <w-text-grid />
    </template>
  </w-vuwer-layout>
</template>

<script>
import WaveSurfer from "wavesurfer.vue";
import MTCard from "@/components/base/card/MTCard.vue";
import WVuwerLayout from "./WVuewerLayout.vue";
import WVideo from "./WVideo.vue";
import WTextGrid from "./WTextGrid.vue";
import WVuwerActions from "./WVuewerActions.vue";
import SettingMixin from "./settingMixin";
import WavesurferMixin from "./wavesurferMixin";
export default {
  name: "WVuwer",
  mixins: [SettingMixin, WavesurferMixin],
  components: {
    WVuwerLayout,
    MTCard,
    WVideo,
    WaveSurfer,
    WVuwerActions,
    WTextGrid
  },
  props: {
    src: {
      type: String,
      requested: true
    },
    fps: {
      type: Number,
      requested: true
    },
    duration: {
      type: Number,
      requested: true
    },
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
    videoSource: null,
    videoHeight: 0
  }),
  computed: {
    skipLength: function() {
      console.log(this.fps / this.duration);
      return this.fps / this.duration;
    }
  },
  methods: {
    onSyncCanvas(payload) {
      console.log(payload);
    },
    onLoadeddata: function(payload) {
      if (payload) {
        this.videoSource = payload;
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
  }
};
</script>

<style scoped></style>
