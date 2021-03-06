<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    fixed
    app
    floating
    width="256px"
    class="v-navigation-drawer--layout_dashboard_drawer"
    :mobile-breakpoint="992"
  >
    <nuxt-link to="/" class="drawer__logo">
      <v-img
        src="/images/placeholder-gray.png"
        height="36px"
        max-height="36px"
        width="104px"
        max-width="104px"
      ></v-img>
    </nuxt-link>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        class="v-list-item--layout_dashboard_drawer"
        :key="item.title"
        :to="item.to"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <v-list class="v-list--layout_drashboard_avatar">
      <v-list-item>
        <v-list-item-avatar class="mr_3">
          <v-img :src="user.picture"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ user.email }}</span>
              </template>
              <span>{{ user.email }}</span>
            </v-tooltip>
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ user.role === null ? "Usuario" : user.role }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon @click="logout">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-arrow-right</v-icon>
            </template>
            <span>Cerrar sesión</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      menuOpen: false,
      items: [
        { title: "Dashboard", icon: "view-dashboard", to: "/dashboard" },
        { title: "Proyectos", icon: "clipboard", to: "/dashboard/projects" },
        { title: "Comandos", icon: "code-json", to: "/dashboard/commands" },
        {
          title: "Programas",
          icon: "format-list-bulleted-type",
          to: "/dashboard/programs",
        },
      ],
    };
  },

  computed: {
    ...mapState(["dashboardDrawerOpen", "user"]),

    drawerOpen: {
      get() {
        return this.dashboardDrawerOpen;
      },
      set(value) {
        this.setDashboardDrawerOpen(value);
      },
    },
  },

  methods: {
    ...mapActions(["setDashboardDrawerOpen", "logout"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/scss/utils.scss";

.drawer__logo {
  margin-bottom: 32px;
  display: block;
}
</style>