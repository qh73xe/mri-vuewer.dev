<template>
  <v-container class="meta-manager grey lighten-2 fill-height" fluid>
    <v-row v-if="!$vuetify.breakpoint.smAndDown">
      <v-col>
        <m-jumbotron :heading="heading" :desc="desc" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MJumbotron from "@/components/base/MJumbotron.vue";
export default {
  name: "MetaManager",
  components: {
    MJumbotron
  },
  data: () => ({
    heading: "Meta Data Manager"
  }),
  computed: {
    desc: function() {
      return `${this.$vuetify.lang.t("$vuetify.meta.disc")}`;
    }
  }
};
</script>

<style scoped></style>
