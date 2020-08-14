<template>
  <v-navigation-drawer app v-model="drawer" temporary style="top: 60px">
    <v-list dense nav>
      <v-subheader>Pages</v-subheader>
      <v-list-item-group v-model="current" color="primary">
        <v-list-item
          @click="item.to"
          v-for="item in pages"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list dense nav v-if="developPages.length > 0">
      <v-divider />
      <v-subheader>DEVELOP</v-subheader>
      <v-list-item-group v-model="current" color="primary">
        <v-list-item
          @click="item.to"
          v-for="item in developPages"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "MNavigationDrawer",
  data: () => ({
    current: null
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("setDrawer", val);
      }
    },
    developPages: function() {
      if (process.env.NODE_ENV) {
        return this.$router.options.routes
          .filter(x => {
            if (x.develop) return true;
            return false;
          })
          .map((x, i) => {
            if (x.name == this.$route.name) {
              this.current = i;
              x.current = true;
            }
            x.title = x.name;
            x.to = () => {
              this.to({ name: x.name });
            };
            return x;
          });
      }
      return [];
    },
    pages: function() {
      return this.$router.options.routes
        .filter(x => {
          if (x.develop) return false;
          return true;
        })
        .map((x, i) => {
          if (x.name == this.$route.name) {
            this.current = i;
            x.current = true;
          }
          x.title = this.$vuetify.lang.t(
            `$vuetify.pages.${x.name.toLowerCase()}`
          );
          x.to = () => {
            this.to({ name: x.name });
          };
          return x;
        });
    }
  },
  methods: {
    to: function(payload) {
      if (payload.name) {
        if (this.$route.name !== payload.name) {
          this.$router.push(payload);
        }
      }
    }
  }
};
</script>
<style scoped></style>
