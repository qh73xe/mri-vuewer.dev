<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    hide-default-footer
    sort-by="time"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <m-loading-dialog ref="loading">
        <p>now loading...</p>
      </m-loading-dialog>
      <v-btn class="mr-1" fab dark x-small @click="seek(item.time)">
        <v-icon>
          mdi-format-horizontal-align-right
        </v-icon>
      </v-btn>
      <v-btn color="error" fab dark x-small @click="deleteItem(item)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-alert type="warning">
        No Data
      </v-alert>
    </template>
  </v-data-table>
</template>
<script>
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog.vue";
import MWavesurferMixin from "@/mixins/MWavesurferMixin";
export default {
  name: "WTextGridTable",
  components: {
    MLoadingDialog
  },
  mixins: [MWavesurferMixin],
  props: {
    title: {
      type: String
    },
    tier: {
      type: Object
    }
  },
  data: () => ({
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    headers: function() {
      const headers = [];
      if (this.tier) {
        if (this.tier.type == "interval") {
          headers.push({ text: "Start Time (sec)", value: "start" });
          headers.push({ text: "End Time (sec)", value: "end" });
        } else {
          headers.push({ text: "Time (sec)", value: "time" });
        }
      }
      headers.push({ text: "Text", value: "text" });
      headers.push({
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end"
      });
      return headers;
    },
    items: function() {
      if (this.tier) {
        if (this.tier.type == "interval") {
          this.tier.values.map((x, i) => {
            x.idx = i;
            if (i == 0) {
              x.start = 0;
            } else {
              x.start = this.tier.values[i - 1].time;
            }
            x.end = x.time;
            return x;
          });
          return this.tier.values;
        } else {
          return this.tier.values;
        }
      }
      return [];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    deleteItem(item) {
      const vm = this;
      setTimeout(() => {
        if (vm.items.length == 1) {
          vm.deleteTier(vm.title);
        } else if (vm.items.length == 2) {
          const duration = vm.getDuration();
          if (item.time == duration) {
            const prevIdx = 0;
            vm.deleteTierValue(vm.title, item.idx);
            vm.deleteTierValue(vm.title, prevIdx);
            vm.addTierValue(vm.title, {
              time: duration,
              text: "" // 本来は前のテキストを反映すべき
            });
          } else {
            const nextIdx = item.idx + 1;
            // const next = vm.tier[nextIdx];
            vm.deleteTierValue(vm.title, nextIdx);
            vm.deleteTierValue(vm.title, item.idx);
            vm.addTierValue(vm.title, {
              time: duration,
              text: "" // 本来は後のテキストを反映すべき
            });
          }
        } else {
          vm.deleteTierValue(vm.title, item.idx);
        }
      }, 1);
    },
    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>

<style scoped></style>
