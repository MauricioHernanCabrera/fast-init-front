<template>
  <div class="breeding_item" :key="breedingItem.id">
    <div class="breeding_item__overlay"></div>

    <div class="breeding_item__content">
      <AxieItem :axie="breedingItem.father" />

      <AxieItem :axie="breedingItem.mother" />

      <div class="breeding_item__general_info">
        <PartItem
          :part="{
            part: 'Puntaje de partes unicas',
            value: breedingItem.score,
          }"
        />

        <PartItem
          :part="{
            part: 'Puntaje puro',
            value: breedingItem.purityScore,
          }"
        />

        <PartItem
          :part="{
            part: 'Precio',
            value: `$${breedingItem.totalPriceUSD.toFixed(2)}`,
          }"
        />

        <PartItem
          :part="{
            part: 'Porcentaje de partes unicas',
            value: `${breedingItem.scorePercentage.toFixed(2)}%`,
          }"
        />

        <PartItem
          :part="{
            part: 'Porcentaje de pureza',
            value: `${breedingItem.purityScorePercentage.toFixed(2)}%`,
          }"
        />
      </div>

      <div
        class="breeding_item__parts"
        :class="{ 'breeding_item__parts--open': options.openParts }"
      >
        <Parts
          :parts="breedingItem.eyesProbs"
          title="Ojos"
          :openParts="options.openParts"
        />

        <Parts
          :parts="breedingItem.earsProbs"
          title="Orejas"
          :openParts="options.openParts"
        />

        <Parts
          :parts="breedingItem.mouthProbs"
          title="Boca"
          :openParts="options.openParts"
        />

        <Parts
          :parts="breedingItem.hornProbs"
          title="Cuerno"
          :openParts="options.openParts"
        />

        <Parts
          :parts="breedingItem.backProbs"
          title="Espalda"
          :openParts="options.openParts"
        />

        <Parts
          :parts="breedingItem.tailProbs"
          title="Cola"
          :openParts="options.openParts"
        />
      </div>

      <div class="breeding_item__footer">
        <v-btn small color="primary" @click="$emit('toggle', breedingItem)"
          >Toggle favorito</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import Parts from "@/components/Shared/Parts";
import PartItem from "@/components/Shared/PartItem";
import AxieItem from "@/components/Shared/AxieItem";

export default {
  props: {
    breedingItem: {
      type: Object,
      required: true,
    },

    options: {
      type: Object,
      default: {},
    },
  },

  components: {
    Parts,
    PartItem,
    AxieItem,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.breeding_item {
  &:hover {
    background-color: $color_light;

    .breeding_item__overlay {
      z-index: 10;
      display: block;
    }

    .breeding_item__content {
      z-index: 11;
    }
  }
}

.breeding_item__overlay {
  display: none;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;

  &:hover {
    display: none !important;
  }
}

.breeding_item__overlay::hover ~ .breeding_item__content {
  z-index: 1;
}

.breeding_item__content {
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: flex-start;
}

.breeding_item__general_info {
  grid-column: span 2;
}

.breeding_item__parts {
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 1px;

  @include breakpoint(sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.breeding_item__parts--open {
  gap: 12px;
}

.breeding_item__footer {
  grid-column: span 2;
}
</style>