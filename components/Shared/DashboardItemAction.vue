<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        small
        color="primary"
        @click="$emit('click')"
        :loading="isLoading"
      >
        <v-icon small> mdi-{{ icon }} </v-icon>
      </v-btn>
    </template>
    <span>{{ tip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },

    tip: {
      type: String,
      required: true,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>