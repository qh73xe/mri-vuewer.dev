<template>
  <v-form ref="form" v-model="valid">
    <v-form ref="itemForm" v-model="item.valid">
      <label>New Meta Data</label>
      <v-row class="pa-0">
        <v-col cols="4" class="pt-0">
          <v-text-field
            :rules="keyRules"
            :counter="10"
            v-model="item.key"
            required
            label="key"
          />
        </v-col>
        <v-col cols="7" class="pt-0">
          <v-text-field
            :rules="valueRules"
            :counter="50"
            v-model="item.value"
            required
            label="value"
          />
        </v-col>
        <v-col cols="1" class="pt-0">
          <v-btn @click="add" fab small color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div v-for="key in keys" :key="key">
        <v-row class="pa-0">
          <v-col cols="11" class="pt-0">
            <v-text-field
              :value="metaData[key]"
              @input="edit($event, key)"
              :rules="valueRules"
              :counter="50"
              :label="key"
            />
          </v-col>
          <v-col cols="1" class="pt-0">
            <v-btn @click="destroy(key)" fab small color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-form>
</template>
<script>
export default {
  name: "m-video-meta-deta-form",
  data: () => ({
    valid: false,
    item: {
      valid: false,
      key: null,
      value: null
    },
    keys: [],
    metaData: {}
  }),
  computed: {
    keyRules: function() {
      const locale = "$vuetify.validations";
      return [
        v => !!v || this.$vuetify.lang.t(`${locale}.required`),
        v => (v && v.length <= 10) || this.$vuetify.lang.t(`${locale}.less`, 10)
      ];
    },
    valueRules: function() {
      const locale = "$vuetify.validations";
      return [
        v => !!v || this.$vuetify.lang.t(`${locale}.required`),
        v => (v && v.length <= 50) || this.$vuetify.lang.t(`${locale}.less`, 50)
      ];
    }
  },
  methods: {
    add: function() {
      this.$refs.itemForm.validate();
      if (this.item.valid) {
        if (this.item.key && this.item.value) {
          this.metaData[this.item.key] = this.item.value;
          this.keys.push(this.item.key);
          this.item = {
            key: null,
            value: null,
            valid: false
          };
        }
      }
    },
    destroy: function(e, key) {
      const idx = this.keys.findIndex(x => x == key);
      this.keys.splice(idx, 1);
    },
    edit: function(e, key) {
      this.metaData[key] = e;
    },
    validate() {
      if (this.item.key && this.item.value) {
        this.add();
      }
      this.$refs.form.validate();
      const item = {};
      for (const key of this.keys) {
        item[key] = this.metaData[key];
      }
      this.$emit("validated", item);
    },
    reset() {
      this.$refs.form.reset();
      this.keys = [];
      this.metaData = {};
      this.item.key = null;
      this.item.value = null;
      this.$refs.itemForm.reset();
      this.item = {
        key: null,
        value: null,
        valid: false
      };
      this.$emit("validated", null);
    }
  }
};
</script>

<style scoped></style>
