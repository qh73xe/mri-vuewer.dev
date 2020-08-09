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
          <w-vuwer-actions v-if="ws" :ws="ws" />
        </v-card>
      </v-col>
      <v-col cols="7" class="flex-grow-1 flex-shrink-1 d-none d-sm-flex">
      </v-col>
    </v-row>
    <wave-surfer
      ref="wavesurfer"
      v-if="videoSource"
      splitChannels
      normalize
      responsive
      scrollParent
      showTimeLine
      showSpectrogram
      showTextGrid
      backend="MediaElement"
      :source="videoSource"
      :minPxPerSec="minPxPerSec"
      :freqRate="freqRate"
      :targetChannel="targetChannel"
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
  </v-container>
</template>

<script>
import WVideo from "@/components/wavesurfer/WVideo.vue";
import WVuwerActions from "@/components/wavesurfer/WVuewerActions.vue";
import WaveSurfer from "wavesurfer.vue";
export default {
  name: "WVuwer",
  components: { WVideo, WaveSurfer, WVuwerActions },
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
    ws: null,
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
    minPxPerSec: {
      get() {
        return this.$store.state.ws.minPxPerSec;
      }
    },
    freqRate: {
      get() {
        return this.$store.state.ws.freqRate;
      }
    },
    targetChannel: {
      get() {
        return this.$store.state.ws.targetChannel;
      }
    }
  },
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
        this.videoSource = payload;
        this.$nextTick(() => {
          this.ws = this.$refs.wavesurfer;
        });
      }
    },
    onSpectrogramRenderStart() {
      this.isLoading = true;
    },
    onSpectrogramRenderEnd() {
      this.isLoading = false;
      this.ws.addTier("IPU", "interval");
    },
    onDblclick: function(obj) {
      const key = obj.key;
      const item = {
        time: obj.time,
        text: ""
      };
      this.ws.addTierValue(key, item);
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
      this.tabs = Object.keys(this.textgrid);
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
