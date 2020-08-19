<template>
  <m-card-dialog
    titleColor="grey darken-4"
    :title="$vuetify.lang.t(title)"
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <v-card>
      <v-img
        v-if="src"
        :src="src"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title class="py-0">{{ videoName }}</v-card-title>
        <v-card-title class="py-0">
          {{ duration }} sec: {{ fps }} fps [{{ originSize.width }} x
          {{ originSize.height }}]
        </v-card-title>
      </v-img>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-file-video</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ videoStream.codec_name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon />
          <v-list-item-content>
            <v-list-item-title>
              {{ videoStream.pix_fmt }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon />
          <v-list-item-content>
            <v-list-item-title>
              {{ videoStream.bitrate }} kb/s, {{ videoStream.tbr }} tbr,
              {{ videoStream.tbn }} tbn, {{ videoStream.tbc }} tbc
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider inset></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-file-music</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ audioStream.codec_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ audioStream.sample_rate }} Hz,
              {{ audioStream.channel_layout }}, {{ audioStream.sample_fmt }},
              {{ audioStream.bitrate }} kb/s
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </m-card-dialog>
</template>
<script>
import MCardDialog from "@/components/base/dialog/MCardDialog";
import MVideoMixin from "@/mixins/MVideoMixin.js";
export default {
  name: "m-detail-dialog",
  mixins: [MVideoMixin],
  components: { MCardDialog },
  data: () => ({
    title: "$vuetify.forms.detail.title"
  }),
  props: {
    value: {
      type: Boolean
    },
    src: {
      default: null
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped></style>
