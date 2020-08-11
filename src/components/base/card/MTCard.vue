<template>
  <v-card class="mx-auto" :color="color" :flat="flat" :tile="tile">
    <v-toolbar :dense="dense" :color="titleColor" dark v-if="title">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbarActions">
        <v-btn icon v-for="(item, i) in toolbarActions" :key="i">
          <v-icon @click="item.function">item.icon</v-icon>
        </v-btn>
      </slot>
    </v-toolbar>
    <slot></slot>
  </v-card>
</template>
<script>
export default {
  name: "MTCard",
  props: {
    title: {
      type: String
    },
    tile: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    titleColor: {
      type: String,
      default: "primary"
    },
    toolbarActions: {
      type: Array,
      validator: function(value) {
        if (value.length == 0) return true;
        const check = value.map(x => {
          return "icon" in x && "function" in x;
        });
        return check.every(val => val);
      },
      default: () => []
    }
  }
};
</script>

<style scoped></style>
