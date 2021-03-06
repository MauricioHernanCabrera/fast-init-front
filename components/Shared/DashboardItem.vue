<template>
  <li class="dashboard_item" :class="{ 'dashboard_item--odd': isOdd }">
    <div class="dashboard_item__pre">
      <span class="dashboard_item__title">{{ title }}</span>
      <span class="dashboard_item__description">
        {{ description }}
      </span>
    </div>

    <div class="dashboard_item__append">
      <slot />
      <!-- <v-btn icon small color="primary">
        <v-icon class="dashboard_item__icon" small>
          mdi-delete-outline
        </v-icon>
      </v-btn> -->
    </div>
  </li>
</template>

<script>
export default {
  props: {
    isOdd: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.dashboard_item {
  display: flex;
  padding: 14px 16px;
  justify-content: space-between;
}

.dashboard_item--odd {
  background-color: $dashboard_item_pair_color;
}

.dashboard_item__pre {
}

.dashboard_item__title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: $color_primary;
}

.dashboard_item__description {
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: $dashboard_item_description_color;
  text-transform: uppercase;
}

.dashboard_item__append {
}
</style>