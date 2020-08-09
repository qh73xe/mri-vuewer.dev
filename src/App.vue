<template>
  <v-app>
    <m-app-bar />
    <m-navigation-drawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MAppBar from "./components/base/MAppBar.vue";
import MNavigationDrawer from "./components/base/MNavigationDrawer.vue";

export default {
  name: "App",
  components: {
    MAppBar,
    MNavigationDrawer
  },
  data: () => ({})
};
</script>
