<template>
  <v-container class="pa-0 grey lighten-2 fill-height" fluid>
    <v-col class="pa-0" v-if="originSize">
      <v-card :style="topRowStyle" class="overflow-y-auto" flat tile>
        <v-row dense>
          <v-col dense class="pa-0">
            <slot name="video"></slot>
          </v-col>
          <v-col class="pa-0">
            <v-card tile flat :style="topRowStyle" class="overflow-y-auto">
              <slot name="table"></slot>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        class="d-flex mt-3 overflow-y-auto"
        flat
        tile
        style="max-height:40vh"
      >
        <v-col class="pa-0">
          <slot></slot>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import MVideoMixin from "@/mixins/MVideoMixin";
export default {
  name: "WVuewerLayout",
  mixins: [MVideoMixin],
  computed: {
    topRowStyle: function() {
      if (this.originSize) {
        return `max-height: ${this.originSize.height + 116}px`;
      }
      return "100vh";
    }
  }
};
</script>

<style scoped></style>
