<template>
  <div>Hola mundo</div>
</template>

<script>
export default {
  async asyncData({
    query: { refreshToken = null, token = null } = {},
    store,
    redirect,
  }) {
    try {
      await Promise.all([
        store.dispatch("setToken", token),
        store.dispatch("setRefreshToken", refreshToken),
      ]);

      await store.dispatch("loadUserData");
      redirect("/dashboard");
    } catch (error) {
      redirect("/");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>