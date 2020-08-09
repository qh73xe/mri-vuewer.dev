<template>
  <v-container class="home grey lighten-2 fill-height" fluid>
    <v-row v-if="!$vuetify.breakpoint.smAndDown">
      <v-col>
        <m-jumbotron :heading="heading" :desc="desc" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :md="cardCols" v-for="(nav, key) in navs" :key="key">
        <m-s-card
          :color="nav.color"
          :icon="nav.icon"
          :title="nav.title"
          sub-icon="mdi-information"
          :sub-text="nav.subText"
          :actions="nav.actions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MJumbotron from "@/components/base/MJumbotron.vue";
import MSCard from "@/components/base/card/MSCard.vue";
export default {
  name: "Home",
  components: {
    MJumbotron,
    MSCard
  },
  data: () => ({}),
  methods: {
    to: function(payload) {
      this.$router.push(payload);
    }
  },
  computed: {
    name: function() {
      return this.$store.state.appName;
    },
    version: function() {
      return this.$store.state.appVersion;
    },
    heading: function() {
      return `${this.name} ver.${this.version}`;
    },
    desc: function() {
      return `${this.$vuetify.lang.t("$vuetify.home.disc")}`;
    },
    navs: function() {
      const vm = this;
      return {
        upload: {
          icon: "mdi-file-upload",
          color: "primary",
          title: this.$vuetify.lang.t("$vuetify.home.upload.title"),
          subText: this.$vuetify.lang.t("$vuetify.home.upload.hint"),
          actions: [
            {
              icon: "mdi-plus",
              function: () => {}
            }
          ]
        },
        manage: {
          color: "primary",
          icon: "mdi-database-search",
          title: this.$vuetify.lang.t("$vuetify.home.manage.title"),
          subText: this.$vuetify.lang.t("$vuetify.home.manage.hint"),
          actions: [
            {
              icon: "mdi-dots-vertical",
              function: () => {
                vm.to({ name: "Meta" });
              }
            }
          ]
        },
        demo: {
          color: "primary",
          icon: "mdi-code-brackets",
          title: this.$vuetify.lang.t("$vuetify.home.demo.title"),
          subText: this.$vuetify.lang.t("$vuetify.home.demo.hint"),
          actions: [
            {
              icon: "mdi-dots-vertical",
              function: () => {}
            }
          ]
        }
      };
    },
    cardCols: function() {
      const navSize = Object.keys(this.navs).length;
      return Math.round(12 / navSize);
    }
  }
};
</script>
