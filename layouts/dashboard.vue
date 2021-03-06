<template>
  <LayoutDashboardApp>
    <LayoutDashboardHeader class="d_lg_none" />

    <LayoutDashboardDrawer />

    <LayoutDashboardMain>
      <nuxt />
    </LayoutDashboardMain>
  </LayoutDashboardApp>
</template>

<script>
import LayoutDashboardApp from "@/components/Layouts/Dashboard/LayoutDashboardApp";
import LayoutDashboardHeader from "@/components/Layouts/Dashboard/LayoutDashboardHeader";
import LayoutDashboardDrawer from "@/components/Layouts/Dashboard/LayoutDashboardDrawer";
import LayoutDashboardMain from "@/components/Layouts/Dashboard/LayoutDashboardMain";

export default {
  components: {
    LayoutDashboardApp,
    LayoutDashboardHeader,
    LayoutDashboardDrawer,
    LayoutDashboardMain,
  },
};
</script>
