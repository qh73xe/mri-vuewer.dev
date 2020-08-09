<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col>
      <v-card class="mx-auto">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Sample Videos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list flat>
          <v-subheader>Select one item for the live demo.</v-subheader>
          <v-list-item-group v-model="sample" color="primary">
            <v-list-item v-for="(item, i) in samples" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </m-view-layout>
</template>
<script>
import MViewLayout from "@/components/base/MViewLayout";
export default {
  name: "Demo",
  components: {
    MViewLayout
  },
  data: () => ({
    heading: "Live Demo",
    sample: null,
    samples: ["sample1.mp4", "sample2.mp4", "sample3.mp4"]
  }),
  methods: {
    filename2url: function(filename) {
      return `https://github.com/qh73xe/mri-vuewer.dev/blob/master/misc/${filename}?raw=true`;
    }
  },
  computed: {
    desc: function() {
      return `${this.$vuetify.lang.t("$vuetify.demo.disc")}`;
    }
  }
};
</script>

<style scoped></style>
