<template>
  <v-dialog v-model="dialog" hide-overlay persistent :width="width">
    <v-card :color="color" dark>
      <v-card-text class="pt-3">
        <slot></slot>
        <v-progress-linear indeterminate :color="progressColor" class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "MLoadingDialog",
  props: {
    color: {
      type: String,
      default: "primary"
    },
    progressColor: {
      type: String,
      default: "white"
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    close: function() {
      this.dialog = false;
    },
    open: function() {
      this.dialog = true;
    }
  }
};
</script>

<style scoped></style>
