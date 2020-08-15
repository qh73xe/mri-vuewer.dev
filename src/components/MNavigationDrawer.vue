<template>
  <v-navigation-drawer app v-model="drawer" temporary style="top: 60px">
    <v-list dense nav>
      <v-list-item v-if="isLoading">
        <v-list-item-content class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="primary"
          />
          <div class="text-center">
            now loading db ...
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-subheader v-else>Files</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="item in files" :key="item.id" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    isLoading: function() {
      return this.$store.state.files.isLoading;
    },
    files: function() {
      if (this.isLoading) return [];
      return this.$store.state.files.files.map(x => {
        return { id: x.id, name: x.name };
      });
    },
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
