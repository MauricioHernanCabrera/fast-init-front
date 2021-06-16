<template>
  <div class="dashboard_page__header">
    <div class="dashboard_page__pre" v-if="hasBack">
      <div class="dashboard_page__back" @click="$router.go(-1)">
        <v-icon class="dashboard_page__back_icon">mdi-arrow-left</v-icon>
        <span class="dashboard_page__back_text"> Volver </span>
      </div>
    </div>

    <div class="dashboard_page__body">
      <h1 class="dashboard_page__title">{{ title }}</h1>

      <v-spacer></v-spacer>

      <div class="dashboard_page__items">
        <slot name="items">
          <v-btn
            color="#ffffff"
            depressed
            class="v-btn--btn_action"
            @click="$emit('click')"
          >
            {{ btnAddText }}
          </v-btn>
        </slot>
      </div>
    </div>
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
      default: "-",
    },

    hasBack: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.dashboard_page__header {
  margin-bottom: 32px;
}

.dashboard_page__pre {
  margin-bottom: 12px;
}

.dashboard_page__back {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dashboard_page__back_icon {
  font-size: 18px;
  color: $dashboard_item_description_color;
  margin-right: 12px;
}

.dashboard_page__back_text {
  font-size: 14px;
  line-height: 20px;
  color: $dashboard_item_description_color;
}

.dashboard_page__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.dashboard_page__title {
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
}

.dashboard_page__items {
}
</style>