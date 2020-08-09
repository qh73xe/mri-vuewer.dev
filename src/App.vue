<template>
  <v-app>
    <m-app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MAppBar from "./components/base/MAppBar.vue";

export default {
  name: "App",
  components: {
    MAppBar
  },
  data: () => ({})
};
</script>
