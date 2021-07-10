<template>
  <div class="part_item">
    <slot>
      <template v-if="part">
        <AxieClass
          class="part_item__class"
          :name="part.class.toLowerCase()"
          size="16"
          v-if="part.class"
        />

        <div class="part_item__part">{{ part.part }}</div>

        <v-spacer></v-spacer>

        <div class="part_item__value" v-if="part.value">{{ part.value }}</div>
      </template>
    </slot>
  </div>
</template>

<script>
import AxieClass from "@/components/Shared/Class/Index";

export default {
  props: {
    part: {
      type: Object,
      default: null,
    },
  },

  components: {
    AxieClass,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.part_item {
  display: flex;
  background-color: $color_light;
  padding: 4px;
}

.part_item__class {
  margin-right: 4px;
}

.part_item__part {
  font-size: 12px;
  margin-right: 4px;
}

.part_item__value {
  font-size: 12px;
}
</style>