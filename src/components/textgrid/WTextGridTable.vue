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
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <m-agreement-dialog
        title="Delete Item"
        :next-action="deleteItem"
        :action-args="item"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon small v-bind="attrs" v-on="on">mdi-delete</v-icon>
        </template>
        <p>データを削除します.</p>
        <p>よろしいですか?</p>
      </m-agreement-dialog>
    </template>
    <template v-slot:no-data>
      <v-alert type="warning">
        No Data
      </v-alert>
    </template>
  </v-data-table>
</template>
<script>
import MAgreementDialog from "@/components/base/dialog/MAgreementDialog.vue";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog.vue";
export default {
  name: "WTextGridTable",
  components: {
    MAgreementDialog,
    MLoadingDialog
  },
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
      headers.push({ text: "Actions", value: "actions", sortable: false });
      return headers;
    },
    items: function() {
      if (this.tier) {
        if (this.tier.type == "interval") {
          this.tier.values.map((x, i) => {
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
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      this.$refs.loading.open();
      setInterval(this.$refs.loading.close, 4000);
      console.log("delete", item);
    },
    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      this.close();
    }
  }
};
</script>

<style scoped></style>
