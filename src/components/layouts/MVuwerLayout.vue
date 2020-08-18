<template>
  <v-container class="pa-0 grey lighten-2 fill-height" fluid>
    <v-col class="pa-0" v-if="originSize">
      <v-card flat tile>
        <v-row dense v-resize="onResize">
          <v-col ref="videoArray" cols="videoCols" dense class="pa-0">
            <slot name="video"></slot>
          </v-col>
          <v-col
            :cols="textgridCols"
            class="pa-0"
            v-if="$vuetify.breakpoint.smAndUp"
          >
            <v-card
              :style="`max-height: ${maxHeight}px`"
              tile
              flat
              class="overflow-y-auto"
            >
              <slot name="table"></slot>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        :style="`max-height: ${wsMaxHeight}px`"
        class="d-flex mt-3 overflow-y-auto"
        flat
        tile
      >
        <v-row>
          <v-col class="pa-0">
            <slot></slot>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import MVideoMixin from "@/mixins/MVideoMixin";
export default {
  name: "WVuewerLayout",
  mixins: [MVideoMixin],
  data: () => ({
    maxHeight: 0,
    wsMaxHeight: 0,
    videoCols: 6
  }),
  computed: {
    textgridCols: function() {
      return 12 - this.videoCols;
    }
  },
  watch: {
    "$store.state.current.wavesurfer": function(val) {
      if (val) {
        this.$nextTick(() => {
          this.onResize();
        });
      }
    }
  },
  methods: {
    onResize() {
      if (this.$refs.videoArray) {
        const children = this.$refs.videoArray.children;
        if (children) {
          let height = 0;
          for (const child of children) {
            if (child.clientHeight) {
              height = height + child.clientHeight;
            }
          }
          this.maxHeight = height;
          this.wsMaxHeight = window.innerHeight - height - 128;
        }
      }
    }
  }
};
</script>

<style scoped></style>
