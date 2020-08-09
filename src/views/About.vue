<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col>
      <section class="text-center">
        <div class="font-weight-light subtitle-1" v-html="license" />
      </section>
    </v-col>
  </m-view-layout>
</template>

<script>
import MViewLayout from "@/components/base/MViewLayout";
export default {
  name: "About",
  components: {
    MViewLayout
  },
  data: () => ({
    license: ""
  }),
  methods: {
    setLicense: function() {
      const url =
        "https://raw.githubusercontent.com/qh73xe/mri-vuewer.dev/master/LICENSE";
      fetch(url, { mode: "cors", method: "GET" })
        .then(response => response.text())
        .then(data => {
          const body = data.split("\n").map(x => {
            if (x) {
              return `<p class="ma-0">${x}</p>`;
            } else {
              return "</br>";
            }
          });
          console.log(body.join(""));
          this.license = body.join("");
        });
    }
  },
  computed: {
    name: function() {
      return this.$store.state.appName;
    },
    version: function() {
      return this.$store.state.appVersion;
    },
    heading: function() {
      return `${this.name} ver.${this.version}`;
    },
    desc: function() {
      return `
      <span>Copyright &copy; ${this.$store.state.devYear} by ${this.$store.state.author}</span>
      </br>
      <a href="${this.$store.state.github}" rel="noopener noreferrer" target="_blank">
        ${this.$store.state.github}
      </a>
      `;
    }
  },
  mounted: function() {
    this.setLicense();
  }
};
</script>
