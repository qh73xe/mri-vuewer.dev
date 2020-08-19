<template>
  <v-data-table
    :headers="headers"
    :items="frames"
    :items-per-page="-1"
    sort-by="id"
    hide-default-footer
    :style="`max-height: ${videoHeight - 64 || 0}px`"
    class="overflow-y-auto"
  >
    <template v-slot:item.time="{ item }">
      <span class="d-inline-block text-truncate" style="max-width: 30px;">
        {{ item.time }}
      </span>
    </template>

    <template v-slot:item.points="{ item }">
      <span
        class="d-inline-block text-truncate"
        style="max-width: 30px;"
        v-if="item.points"
      >
        {{ item.points.length }}
      </span>
      <span v-else>0</span>
    </template>
    <template v-slot:item.rects="{ item }">
      <span
        class="d-inline-block text-truncate"
        style="max-width: 30px;"
        v-if="item.rects"
      >
        {{ item.rects.length }}
      </span>
      <span v-else>0</span>
    </template>
    <template v-slot:item.texts="{ item }">
      <span
        class="d-inline-block text-truncate"
        style="max-width: 30px;"
        v-if="item.texts"
      >
        {{ item.texts.length }}
      </span>
      <span v-else>0</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-row>
        <v-btn class="mr-1" fab dark x-small @click="seek(item.time)">
          <v-icon x-small>
            mdi-format-horizontal-align-right
          </v-icon>
        </v-btn>

        <v-btn
          class="mr-1"
          fab
          dark
          x-small
          color="orange"
          @click="$emit('click-image-edit')"
        >
          <v-icon>mdi-selection-drag</v-icon>
        </v-btn>

        <v-btn
          @click="$emit('click-ruler')"
          class="mr-1"
          fab
          dark
          x-small
          color="orange"
        >
          <v-icon x-small>
            mdi-ruler
          </v-icon>
        </v-btn>
      </v-row>
    </template>
    <template v-slot:no-data>
      <v-alert type="warning">
        No Data
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
import MWavesurferMixin from "@/mixins/MWavesurferMixin";
export default {
  name: "m-frame-table",
  mixins: [MWavesurferMixin],
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
  data: () => ({
    rulerDialog: false,
    headers: [
      { text: "id", value: "i" },
      { text: "time", value: "time" },
      { text: "points", value: "points" },
      { text: "rects", value: "rects" },
      { text: "texts", value: "texts" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  })
};
</script>

<style scoped></style>
