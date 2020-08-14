<template>
  <m-tab v-slot="tab" :tabs="tabs">
    <w-text-grid-table :title="tab.item" :tier="textgrid[tab.item]" />
  </m-tab>
</template>
<script>
import MTab from "@/components/base/MTab.vue";
import WTextGridTable from "./WTextGridTable.vue";
import MWavesurferMixin from "@/mixins/MWavesurferMixin";
export default {
  name: "WTextGrid",
  mixins: [MWavesurferMixin],
  components: {
    MTab,
    WTextGridTable
  },
  computed: {
    tabs: function() {
      const tabs = [];
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
