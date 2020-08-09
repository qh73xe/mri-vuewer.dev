<template>
  <m-view-layout :heading="heading" :desc="desc"> </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
export default {
  name: "MetaManager",
  components: {
    MViewLayout
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
