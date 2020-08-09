<template>
  <m-view-layout :heading="heading" :desc="desc">
    <v-col>
      <section class="text-center">
        <div class="font-weight-light subtitle-1" v-html="lisence" />
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
    },
    lisence: function() {
      return `
      <span>Released under the MIT license</span>
      </br>
      </br>
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      </br></br>
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
      </br></br>
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
      </br></br>
      IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      `;
    }
  }
};
</script>
