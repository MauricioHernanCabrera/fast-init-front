<template>
  <nuxt-link to="/" class="logo">
    <img class="logo__image" src="/images/logo.png" alt="" height="28px" />
    <span class="logo__text">Fast Init</span>
  </nuxt-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.logo {
  display: flex;
  text-decoration: none;
  align-items: center;
}

.logo__image {
  margin-right: 6px;
}

.logo__text {
  color: $color_dark;
  font-weight: 700;
  font-size: 16px;
}
</style>