<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col>
      <m-t-card title="WAVESURFER SETTING">
        <v-card-text>
          <w-setting-from />
        </v-card-text>
      </m-t-card>
    </v-col>
  </m-view-layout>
</template>
<script>
import MTCard from "@/components/base/card/MTCard.vue";
import MViewLayout from "@/components/base/MViewLayout";
import WSettingFrom from "@/components/wavesurfer/form/WSettingForm.vue";
export default {
  name: "Setting",
  components: {
    MViewLayout,
    MTCard,
    WSettingFrom
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
