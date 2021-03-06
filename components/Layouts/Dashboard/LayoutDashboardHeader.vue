<template>
  <v-app-bar app flat class="v-app-bar--layout_dashboard_header">
    <nuxt-link to="/">
      <v-img
        src="/images/placeholder-gray.png"
        height="36px"
        max-height="36px"
        width="104px"
        max-width="104px"
      ></v-img>
    </nuxt-link>

    <v-spacer></v-spacer>

    <v-btn icon @click="setDashboardDrawerOpen(!dashboardDrawerOpen)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["dashboardDrawerOpen"]),
  },

  methods: {
    ...mapActions(["setDashboardDrawerOpen"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/scss/utils.scss";
</style>