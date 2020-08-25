<template>
  <v-list dense>
    <v-subheader>{{ $vuetify.lang.t("$vuetify.textgrid.name") }}</v-subheader>
    <v-list-item
      v-for="(item, i) in textgrid"
      :key="i"
      @click="$emit('click', item)"
    >
      <v-list-item-title>{{ item }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "m-video-download-list",
  data: () => ({
    textgrid: ["TEXTGRID", "JSON", "XLSX"]
  })
};
</script>
<style scoped></style>
