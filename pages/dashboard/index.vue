<template>
  <div class="dashboard">
    <div class="dashboard__container custom_container custom_container_fluid">
      hola mundo
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["has-not-auth"],
  layout: "dashboard",
};
</script>

<style lang="scss" scoped>
</style>