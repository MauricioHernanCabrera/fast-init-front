<template>
  <div class="dashboard_modal_footer">
    <v-spacer></v-spacer>

    <v-btn
      text
      depressed
      @click="$emit('close')"
      class="v-btn--dashboard_modal_footer mr_2"
    >
      Cancelar
    </v-btn>

    <v-btn
      color="primary"
      depressed
      type="submit"
      class="v-btn--dashboard_modal_footer"
      :loading="isLoading"
      :disabled="isDisabled || isLoading"
    >
      {{ btnOkText }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    btnOkText: {
      type: String,
      required: true,
    },

    isLoading: {
      type: Boolean,
      required: true,
    },

    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.dashboard_modal_footer {
  display: flex;
}
</style>