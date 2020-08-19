<template>
  <v-container fluid class="py-0 transparent">
    <m-tab v-slot="tab" :tabs="tabs">
      <m-frame-table
        v-if="tab.i == 0"
        :frames="frames"
        :video-height="videoHeight"
        @click-image-edit="$emit('click-image-edit')"
        @click-ruler="$emit('click-ruler')"
      />
      <w-text-grid-table
        v-if="tab.i > 0"
        :title="tab.item"
        :tier="textgrid[tab.item]"
      />
    </m-tab>
  </v-container>
</template>
<script>
import MTab from "@/components/base/MTab.vue";
import WTextGridTable from "./WTextGridTable.vue";
import MFrameTable from "@/components/table/MFrameTable";
import MWavesurferMixin from "@/mixins/MWavesurferMixin";
export default {
  name: "WTextGrid",
  mixins: [MWavesurferMixin],
  components: {
    MTab,
    WTextGridTable,
    MFrameTable
  },
  props: {
    frames: {
      type: Array,
      default: function() {
        return [];
      }
    },
    videoHeight: {
      default: null
    }
  },
  computed: {
    tabs: function() {
      const tabs = ["FRAMES"];
      if (this.textgrid) {
        for (const x of Object.keys(this.textgrid)) {
          tabs.push(x);
        }
      }
      return tabs;
    }
  }
};
</script>

<style scoped></style>
