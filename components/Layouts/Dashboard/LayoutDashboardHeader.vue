<template>
  <v-app-bar app flat class="v-app-bar--layout_dashboard_header">
    <Logo />

    <v-spacer></v-spacer>

    <v-btn icon @click="setDashboardDrawerOpen(!dashboardDrawerOpen)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Logo from "@/components/Shared/Logo";

export default {
  components: {
    Logo,
  },

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