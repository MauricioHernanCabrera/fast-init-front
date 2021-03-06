<template>
  <div class="login">
    <div class="login__container">
      <h1 class="login__title">Iniciar sesión</h1>

      <v-btn
        block
        class="v-btn--social_login"
        x-large
        @click="redirectToSocialProvider('google')"
      >
        <v-icon>mdi-google</v-icon>
        <v-spacer></v-spacer>
        Iniciar sesión con google
        <v-spacer></v-spacer>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async redirectToSocialProvider(provider) {
      window.location = process.env.socialProviderUrl.replace(
        "provider",
        provider
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.login {
  padding-top: 32px;
  padding-bottom: 32px;
}

.login__container {
  margin: 0 auto;
  max-width: 450px;
  width: 100%;
  padding: 0 15px;
}

.login__title {
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 24px;
  color: map-get($theme_colors, color_dark);
  text-align: center;
}
</style>