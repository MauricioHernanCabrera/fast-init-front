<template>
  <LayoutAuthApp>
    <LayoutAuthHeader />

    <v-main>
      <nuxt />
    </v-main>
  </LayoutAuthApp>
</template>

<script>
import LayoutAuthApp from "@/components/Layouts/Auth/LayoutAuthApp";
import LayoutAuthHeader from "@/components/Layouts/Auth/LayoutAuthHeader";

export default {
  components: {
    LayoutAuthApp,
    LayoutAuthHeader,
  },
};
</script>
