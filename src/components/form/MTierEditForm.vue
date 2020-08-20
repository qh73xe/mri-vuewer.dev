<template>
  <v-form ref="form" v-model="valid">
    <v-autocomplete
      :rules="nameRule"
      v-model="oldName"
      :items="tiers"
      label="Tier Name"
    />
    <v-text-field :rules="newNameRUle" v-model="name" label="Tier Name" />
    <v-select :rules="required" v-model="type" :items="['interval', 'point']" />
  </v-form>
</template>
<script>
export default {
  name: "WTierEditFrom",
  data: () => ({
    valid: false,
    oldName: "",
    name: "",
    type: ""
  }),
  props: {
    tiers: {
      type: Array
    }
  },
  computed: {
    nameRule: function() {
      const rules = [
        v => !!v || this.$vuetify.lang.t("$vuetify.validations.required"),
        v => this.checkNameNotExist(v)
      ];
      return rules;
    },
    newNameRUle: function() {
      const rules = [
        v => !!v || this.$vuetify.lang.t("$vuetify.validations.required"),
        v => this.checkName(v)
      ];
      return rules;
    },
    required: function() {
      if (this.$vuetify) {
        return [
          v => !!v || this.$vuetify.lang.t("$vuetify.validations.required")
        ];
      }
      return [];
    }
  },
  methods: {
    checkNameNotExist: function(v) {
      if (v) {
        if (this.tiers.indexOf(v) == -1) {
          return this.$vuetify.lang.t("$vuetify.validations.notExist");
        }
        return true;
      }
      return this.$vuetify.lang.t("$vuetify.validations.required");
    },
    checkName: function(v) {
      if (v) {
        if (this.tiers.indexOf(v) > -1) {
          return this.$vuetify.lang.t("$vuetify.validations.alreadyExists");
        }
        return true;
      }
      return this.$vuetify.lang.t("$vuetify.validations.required");
    },
    validate: function() {
      this.$refs.form.validate();
      if (this.valid) {
        const payload = {
          key: this.oldName,
          item: {
            name: this.name,
            tyle: this.type
          }
        };
        this.$emit("validated", payload);
      }
    },
    reset: function() {
      this.resetValidation();
    },
    resetValidation: function() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style scoped></style>
