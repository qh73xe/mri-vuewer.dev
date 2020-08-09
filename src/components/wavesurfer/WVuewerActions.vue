<template>
  <v-card-actions>
    <v-btn dark icon color="primary" @click="skipBackward">
      <v-icon dark>mdi-skip-backward</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn dark icon color="primary" @click="playPause">
      <v-icon dark>mdi-play-pause</v-icon>
    </v-btn>
    <v-btn dark icon color="primary" @click="play">
      <v-icon dark>mdi-play</v-icon>
    </v-btn>
    <v-btn dark icon color="primary" @click="pause">
      <v-icon dark>mdi-pause</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn dark icon color="primary" @click="skipForward">
      <v-icon dark>mdi-skip-forward</v-icon>
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  name: "WVuewerActions",
  props: ["ws"],
  methods: {
    play: function() {
      this.ws.play();
    },
    pause: function() {
      this.ws.pause();
    },
    playPause: function() {
      this.ws.playPause();
    },
    skipBackward: function() {
      this.ws.skipBackward();
    },
    skipForward: function() {
      this.ws.skipForward();
    }
  }
};
</script>

<style scoped></style>
