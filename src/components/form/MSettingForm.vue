<template>
  <v-form ref="form">
    <div class="mb-4">
      <label>{{ t(`${locale}.loading.label`) }}</label>
      <v-checkbox
        class="mt-0"
        hide-details
        v-model="shouldGetVideoInfo"
        :label="t(`${locale}.loading.shouldGetVideoInfo.label`)"
      />
      <v-icon small>mdi-information</v-icon>
      <span
        class="caption ml-1"
        v-text="t(`${locale}.loading.shouldGetVideoInfo.hint`)"
      />
      <v-checkbox
        hide-details
        v-model="shouldGetFrameInfo"
        :label="t(`${locale}.loading.shouldGetFrameInfo.label`)"
      />
      <v-icon small>mdi-information</v-icon>
      <span
        class="caption ml-1"
        v-text="t(`${locale}.loading.shouldGetFrameInfo.hint`)"
      />
    </div>
    <v-text-field
      v-model="maxVideoSize"
      suffix="MB"
      :rules="rules.positiveIntegerRules"
      :label="t(`${locale}.loading.maxVideoSize.label`)"
      :hint="t(`${locale}.loading.maxVideoSize.hint`)"
    />

    <v-divider />

    <div class="my-5">
      <label>{{ t(`${locale}.waveform.label`) }}</label>
      <v-text-field
        v-model="minPxPerSec"
        suffix="px/sec"
        :rules="rules.positiveIntegerRules"
        :label="t(`${locale}.waveform.minPxPerSec.label`)"
        :hint="t(`${locale}.waveform.minPxPerSec.hint`)"
      />
      <v-row v-if="$vuetify.breakpoint.smAndUp">
        <v-col sm="4" class="text-truncate">
          <label>
            {{ t(`${locale}.waveform.cursorColor.label`) }}:
            {{ cursorColor }}
          </label>
          <v-color-picker v-model="cursorColor" />
        </v-col>
        <v-col sm="4" class="text-truncate">
          <label>
            {{ t(`${locale}.waveform.waveColor.label`) }}: {{ waveColor }}
          </label>
          <v-color-picker v-model="waveColor" />
        </v-col>
        <v-col sm="4" class="text-truncate">
          <label>
            {{ t(`${locale}.waveform.progressColor.label`) }}:
            {{ progressColor }}
          </label>
          <v-color-picker v-model="progressColor" />
        </v-col>
      </v-row>
      <v-checkbox
        hide-details
        v-model="showTimeLine"
        :label="t(`${locale}.waveform.showTimeLine.label`)"
      />
      <v-checkbox
        hide-details
        v-model="showSpectrogram"
        :label="t(`${locale}.waveform.showSpectrogram.label`)"
      />
    </div>
    <v-divider />
    <div v-if="showSpectrogram" class="my-5">
      <label>{{ t(`${locale}.spectrogram.label`) }}</label>
      <v-select
        v-model="targetChannel"
        :items="[0, 1]"
        :label="t(`${locale}.spectrogram.targetChannel.label`)"
      />
      <v-text-field
        v-model="freqRate"
        :rules="rules.positiveFloatRules"
        :label="t(`${locale}.spectrogram.freqRate.label`)"
        :hint="t(`${locale}.spectrogram.freqRate.hint`)"
      />
      <v-checkbox
        hide-details
        v-model="showFreqLabel"
        :label="t(`${locale}.spectrogram.showFreqLabel.label`)"
      />
    </div>
    <v-btn block @click="setDefaultSetting" color="error">
      Reset setting
    </v-btn>
  </v-form>
</template>
<script>
import MSettingMixin from "@/mixins/MSettingMixin.js";
import rules from "./rules.js";
export default {
  name: "MSettingForm",
  mixins: [MSettingMixin],
  data: () => ({
    locale: "$vuetify.setting.form",
    rules: {}
  }),
  methods: {
    t: function(val) {
      return this.$vuetify.lang.t(val);
    }
  },
  mounted: function() {
    const vm = this;
    this.rules = rules(vm);
  }
};
</script>

<style scoped></style>
