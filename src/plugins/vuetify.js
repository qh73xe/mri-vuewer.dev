import Vue from "vue";
import Vuetify from "vuetify/lib";
import ja from "@/locale/ja.js";
import en from "@/locale/en.js";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ja, en },
    current: "ja"
  }
});
