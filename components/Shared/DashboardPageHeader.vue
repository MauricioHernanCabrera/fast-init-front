<template>
  <div class="dashboard_page__header">
    <h1 class="dashboard_page__title">{{ title }}</h1>

    <v-btn
      color="primary"
      depressed
      class="v-btn--btn_action"
      @click="$emit('click')"
    >
      {{ btnAddText }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    btnAddText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard_page__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.dashboard_page__title {
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
}
</style>