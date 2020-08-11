<template>
  <v-container fluid class="fill-height pa-0 ma-0 align-start">
    <v-col class="py-0 pl-0 flex-grow-1 flex-shrink-1">
      <v-row class="mb-2">
        <v-col class="py-0 flex-grow-1 flex-shrink-1">
          <slot name="video"></slot>
        </v-col>
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          cols="6"
          class="py-0 flex-grow-1 flex-shrink-1 d-none d-sm-flex"
        >
          <v-row>
            <v-col cols="12" class="py-0 pl-1">
              <slot name="setting"></slot>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <slot></slot>
    </v-col>
    <v-col sm="12" md="4" :class="tableClass">
      <slot name="table"></slot>
    </v-col>
  </v-container>
</template>
<script>
export default {
  name: "WVuewerLayout",
  computed: {
    tableClass: function() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "py-0 pr-0 flex-grow-1 flex-shrink-1 d-none d-sm-flex";
      }
      return "pa-0 mt-2 flex-grow-1 flex-shrink-1 d-none d-sm-flex";
    }
  }
};
</script>

<style scoped></style>
