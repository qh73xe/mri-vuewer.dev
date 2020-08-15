import store from "@/store/index.js";
const locale = "$vuetify.validations";
const rules = {
  positiveInteger: new RegExp(/^[0-9]+$/),
  positiveFloat: new RegExp(/^([1-9]\d*|0)(\.\d+)?$/)
};

const createRules = function(vm) {
  const required = v => !!v || vm.$vuetify.lang.t(`${locale}.required`);
  const maxVideoSize = store.state.setting.maxVideoSize;
  const result = {
    videoRules: [
      required,
      v =>
        !v ||
        v.size < maxVideoSize * 1000000 ||
        vm.$vuetify.lang.t(`${locale}.maxVideoSize`),
      v =>
        !v ||
        v.arrayBuffer !== undefined ||
        vm.$vuetify.lang.t(`${locale}.hasArrayBuffer`)
    ]
  };
  for (const key in rules) {
    result[`${key}Rules`] = [
      required,
      function(v) {
        return rules[key].test(v) || vm.$vuetify.lang.t(`${locale}.${key}`);
      }
    ];
  }
  return result;
};

export default createRules;
