<template>
  <div class="parts">
    <PartItem
      class="parts__header"
      :style="partHeaderStyles"
      :part="{
        part: title,
        value: `${bestPart.value} / ${purity.value}`,
        class: purity.value > bestPart.value ? purity.class : bestPart.class,
      }"
    ></PartItem>

    <template v-if="openParts">
      <PartItem
        v-for="partItem in cardParts"
        :key="`eyes_${partItem.class}_${partItem.part}`"
        :part="partItem"
      />
    </template>
  </div>
</template>

<script>
import PartItem from "@/components/Shared/PartItem";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    parts: {
      type: Array,
      required: true,
    },

    openParts: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    PartItem,
  },

  computed: {
    cardParts() {
      return this.parts.slice(0, -2);
    },

    bestPart() {
      return this.parts[this.parts.length - 1];
    },

    purity() {
      return this.parts[this.parts.length - 2];
    },

    partHeaderStyles() {
      if (this.purity.value == this.bestPart.value) {
        return { border: "2px solid green" };
      } else if (Math.abs(this.purity.value - this.bestPart.value) <= 15) {
        return { border: "2px solid red" };
      } else {
        return {};
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.parts__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.parts__title {
  font-size: 12px;
}
</style>