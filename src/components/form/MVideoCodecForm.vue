<template>
  <v-form ref="form" v-model="valid">
    <v-text-field required v-model="video.name" label="file name" />
    <v-text-field
      required
      :rules="rules.positiveFloatRules"
      v-model="video.fps"
      label="fps"
      suffix="fps"
    />
    <v-text-field
      required
      :rules="rules.positiveFloatRules"
      v-model="video.duration"
      label="duration"
      suffix="sec"
    />
    <v-text-field
      required
      :rules="rules.positiveFloatRules"
      v-model="video.originSize.width"
      label="video width"
      suffix="pixel"
    />
    <v-text-field
      required
      :rules="rules.positiveFloatRules"
      v-model="video.originSize.height"
      label="video height"
      suffix="pixel"
    />
  </v-form>
</template>
<script>
import io from "@/io";
import rules from "./rules.js";
export default {
  name: "m-video-codec-form",
  data: () => ({
    video: io.video.initObj(),
    rules: {},
    valid: false
  }),
  props: {
    value: {
      type: Object,
      default: function() {
        return io.video.initObj();
      }
    }
  },
  methods: {
    validate: function() {
      this.$refs.form.validate();
      if (this.valid) {
        const item = {
          name: this.video.name,
          fps: Number(this.video.fps),
          duration: Number(this.video.duration),
          originSize: {
            width: Number(this.video.originSize.width),
            height: Number(this.video.originSize.height)
          }
        };
        this.$emit("valideted", item);
      }
    },
    reset: function() {
      this.resetValidation();
      this.video = JSON.parse(JSON.stringify(this.value));
    },
    resetValidation: function() {
      this.$refs.form.resetValidation();
    }
  },
  mounted: function() {
    const vm = this;
    this.video = JSON.parse(JSON.stringify(this.value));
    this.rules = rules(vm);
  }
};
</script>

<style scoped></style>
