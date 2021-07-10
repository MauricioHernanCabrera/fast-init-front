<template>
  <a
    class="axie"
    :href="`https://marketplace.axieinfinity.com/axie/${axie.id}`"
    target="_blank"
  >
    <div class="axie__header">
      <AxieClass
        class="axie__class"
        :name="axie.class.toLowerCase()"
        size="20"
      />

      <span class="axie__id">#{{ axie.id }}</span>
    </div>

    <div class="axie__body">
      <v-img :src="axie.image" :aspect-ratio="4 / 2" contain></v-img>
    </div>

    <div class="axie__footer">
      <div class="axie__breed_count">{{ axie.breedCount }} hijos</div>

      <div class="axie__price_usd">
        {{ get(axie, "auction.currentPriceUSD", "-") }} USD
      </div>
    </div>
  </a>
</template>

<script>
import AxieClass from "@/components/Shared/Class/Index";
import { get } from "lodash";

export default {
  props: {
    axie: {
      type: Object,
      required: true,
    },
  },

  components: {
    AxieClass,
  },

  methods: {
    get,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.axie {
  /* border: 1px solid rgba(0, 0, 0, 0.05); */
  border-radius: 5px;
  padding: 16px;
  background-color: $color_light;
  display: block;
  text-decoration: none;
  color: $color_dark;
}

.axie__header {
  display: flex;
  align-items: center;
}

.axie__class {
  margin-right: 6px;
}

.axie__id {
  font-size: 12px;
}

.axie__breed_count {
  font-size: 12px;
  margin-bottom: 4px;
}

.axie__body {
}

.axie__footer {
  text-align: center;
}

.axie__price_usd {
  font-size: 10px;
}
</style>