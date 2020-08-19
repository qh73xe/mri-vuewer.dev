<template>
  <m-card-dialog
    persistent
    titleColor="warning darken-1"
    :title="$vuetify.lang.t(title)"
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <template v-slot:toolbar-actions>
      <v-btn icon @click="dialog = false" color="white">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-card-text>
      this is ruler dialog
    </v-card-text>
  </m-card-dialog>
</template>
<script>
import MCardDialog from "@/components/base/dialog/MCardDialog";
export default {
  name: "m-image-edit-dialog",
  components: { MCardDialog },
  data: () => ({
    title: "$vuetify.forms.ruler.title"
  }),
  props: {
    value: {
      type: Boolean
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped></style>
