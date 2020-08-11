<template>
  <v-form ref="form">
    <v-text-field v-model="type" label="Tier Name" />
    <v-select v-model="type" :items="['interval', 'point']" />
  </v-form>
</template>
<script>
export default {
  name: "WTierFrom",
  data: () => ({
    name: "",
    type: ""
  })
};
</script>
<style scoped></style>
