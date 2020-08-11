<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="time"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title v-if="title">
          {{ title }}
          <v-chip class="ml-2" color="info" v-if="tier">{{ tier.type }}</v-chip>
        </v-toolbar-title>
        <v-spacer />
        <m-card-dialog :title="formTitle">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="primary"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Dessert name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.calories"
                    label="Calories"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.fat"
                    label="Fat (g)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.carbs"
                    label="Carbs (g)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.protein"
                    label="Protein (g)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text>Cancel</v-btn>
            <v-btn color="blue darken-1" text>Save</v-btn>
          </v-card-actions>
        </m-card-dialog>
      </v-toolbar>
    </template>
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
import MCardDialog from "@/components/base/dialog/MCardDialog.vue";
import MAgreementDialog from "@/components/base/dialog/MAgreementDialog.vue";
import MLoadingDialog from "@/components/base/dialog/MLoadingDialog.vue";
export default {
  name: "WTextGridTable",
  components: {
    MCardDialog,
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
