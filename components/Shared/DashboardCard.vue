<template>
  <div class="dashboard_card">
    <div class="dashboard_card__header">
      <h3 class="dashboard_card__title">{{ title }}</h3>

      <slot name="items" />
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.dashboard_card {
  border: 1px solid $layout_dashboard_border_color;
  padding: 24px 32px;
  background-color: $color_light;
  border-radius: 8px;
}

.dashboard_card__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dashboard_card__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
}
</style>