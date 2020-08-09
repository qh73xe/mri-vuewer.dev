<template>
  <v-app-bar app color="primary" dark style="z-index:99">
    <v-toolbar-title>{{ name }} ver. {{ version }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="to({ name: 'Home' })">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon :href="$store.state.github">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$vuetify.lang.current = 'en'">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$vuetify.lang.current = 'ja'">
          <v-list-item-title>日本語</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  name: "MAppBar",
  computed: {
    name: {
      get() {
        return this.$store.state.appName;
      }
    },
    version: {
      get() {
        return this.$store.state.appVersion;
      }
    }
  },
  methods: {
    to: function(payload) {
      if (payload.name) {
        if (this.$route.name !== payload.name) {
          this.$router.push(payload);
        }
      }
    }
  }
};
</script>

<style scoped></style>
