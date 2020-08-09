<template>
  <v-container class="grey lighten-2 fill-height" fluid>
    <v-row v-if="showJumbotron">
      <v-col>
        <m-jumbotron :heading="heading" :desc="desc" />
      </v-col>
    </v-row>
    <v-row>
      <slot></slot>
    </v-row>
  </v-container>
</template>
<script>
import MJumbotron from "@/components/base/MJumbotron.vue";
export default {
  name: "MViewLayout",
  components: {
    MJumbotron
  },
  props: {
    heading: {
      type: String
    },
    desc: {
      type: String
    }
  },
  computed: {
    showJumbotron: function() {
      if (this.heading) {
        if (this.desc) {
          return !this.$vuetify.breakpoint.smAndDown;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped></style>
