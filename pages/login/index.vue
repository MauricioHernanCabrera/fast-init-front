<template>
  <Login />
</template>

<script>
import Login from "@/components/Login/Login";
export default {
  layout: "auth",

  head: {
    title: "Fast Init - Iniciar sesión",
  },

  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
</style>