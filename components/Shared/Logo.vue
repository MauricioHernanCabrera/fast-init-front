<template>
  <nuxt-link to="/" class="logo">
    <img class="logo__image" src="/images/logo-axie.png" alt="" height="28px" />
    <div class="logo__text">Tools</div>
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
  flex-direction: column;
}

.logo__image {
}

.logo__text {
  color: $color_dark;
  font-weight: 700;
  font-size: 16px;
}
</style>