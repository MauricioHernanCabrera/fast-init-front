<template>
  <li :class="{ 'dashboard_item--variant': isVariant }" class="dashboard_item">
    <v-card
      flat
      color="transparent"
      v-bind="$attrs"
      class="dashboard_item__link"
    ></v-card>

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
  inheritAttrs: false,

  props: {
    isVariant: {
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
  position: relative;
}

.dashboard_item--variant {
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
  position: relative;
  z-index: 2;
  display: flex;
}

.dashboard_item__link {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>