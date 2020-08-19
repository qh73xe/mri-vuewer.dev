<template>
  <m-card-dialog
    titleColor="error"
    :title="$vuetify.lang.t(title)"
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <v-card-text>
      <m-tier-form v-if="dialog" @validated="onValidated" @error="onError" />
    </v-card-text>
  </m-card-dialog>
</template>
<script>
import MCardDialog from "@/components/base/dialog/MCardDialog";
import MTierForm from "@/components/form/MTierForm";
export default {
  name: "m-tier-delete-dialog",
  components: { MCardDialog, MTierForm },
  data: () => ({
    title: "$vuetify.forms.tierDelete.title"
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
  },
  methods: {
    onError: function() {},
    onValidated: function() {}
  }
};
</script>
<style scoped></style>
