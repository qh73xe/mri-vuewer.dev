<template>
  <v-stepper v-model="step">
    <form></form>
    <v-stepper-header>
      <template v-for="n in steps">
        <v-stepper-step
          :key="`${n}-step`"
          :complete="step > n"
          :step="n"
          :editable="editable"
        >
          Step {{ n }}
        </v-stepper-step>
        <v-divider v-if="n !== steps" :key="n" />
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
        <v-btn color="primary" @click="nextStep(n)"> Continue </v-btn>
        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  name: "w-video-upload-form",
  data: () => ({
    steps: 3,
    step: 1
  }),
  methods: {
    next(n) {
      if (n === this.steps) {
        this.step = 1;
      } else {
        this.step = n + 1;
      }
    }
  }
};
</script>

<style scoped></style>
