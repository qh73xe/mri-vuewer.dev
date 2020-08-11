<template>
  <v-hover v-slot:default="{ hover }">
    <v-card-actions :class="`elevation-${hover ? 4 : 1}`">
      <v-btn
        dark
        icon
        color="primary"
        :class="`elevation-${hover ? 4 : 0}`"
        @click="skipBackward"
      >
        <v-icon dark>mdi-skip-backward</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        dark
        icon
        color="primary"
        :class="`elevation-${hover ? 4 : 0}`"
        @click="playPause"
      >
        <v-icon dark>mdi-play-pause</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        dark
        icon
        color="primary"
        :class="`elevation-${hover ? 4 : 0}`"
        @click="skipForward"
      >
        <v-icon dark>mdi-skip-forward</v-icon>
      </v-btn>
    </v-card-actions>
  </v-hover>
</template>
<script>
import WavesurferMixin from "./wavesurferMixin";
export default {
  name: "WVuewerActions",
  mixins: [WavesurferMixin],
  methods: {
    playPause: function() {
      this.wavesurfer.playPause();
    },
    skipBackward: function() {
      this.wavesurfer.skipBackward();
    },
    skipForward: function() {
      this.wavesurfer.skipForward();
    }
  }
};
</script>

<style scoped></style>
