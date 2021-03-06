<template>
  <ul class="dashboard_list">
    <slot>
      <span class="dashboard_list__no_items">{{ noItems }}</span>
    </slot>
  </ul>
</template>

<script>
export default {
  props: {
    noItems: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.dashboard_list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard_list__no_items {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
}
</style>