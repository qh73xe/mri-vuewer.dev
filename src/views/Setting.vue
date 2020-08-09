<template>
  <m-view-layout :heading="heading" :desc="desc"> </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
export default {
  name: "Setting",
  components: {
    MViewLayout
  },
  data: () => ({
    heading: "Setting"
  }),
  computed: {
    desc: function() {
      return `${this.$vuetify.lang.t("$vuetify.setting.disc")}`;
    }
  }
};
</script>

<style scoped></style>
