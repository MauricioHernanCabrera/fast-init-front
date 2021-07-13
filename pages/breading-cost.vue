<template>
  <div class="breading_cost mb_15">
    <div class="breading_cost__container custom_container custom_container_xxl">
      <div class="currency_section mb_15">
        <DashboardPageHeader title="Crypto prices">
          <template #items> .</template>
        </DashboardPageHeader>

        <div class="currencies mb_6">
          <div
            class="currency_item"
            v-for="currencyItem in currencies"
            :key="currencyItem.name"
          >
            <div class="currency_item__left">
              <div class="currency_item__name">{{ currencyItem.name }}</div>
              <div class="currency_item__price">
                {{ currencyItem.price }}

                <v-img width="16px" src="/images/currencies/usdt.png"></v-img>
              </div>
            </div>

            <div class="currency_item__right">
              <img
                class="currency_item__image"
                :src="currencyItem.image"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="cost_section mb_15">
        <DashboardPageHeader title="Cost table">
          <template #items> .</template>
        </DashboardPageHeader>

        <div class="costs_responsive">
          <div class="costs">
            <div
              v-for="costItem in costs"
              class="cost_item"
              :class="{
                'cost_item--hover': itemsSelected.includes(costItem._id),
                'cost_item--header_top':
                  costItem._id.includes('t') && !costItem._id.includes('l'),
                'cost_item--header_left':
                  costItem._id.includes('l') && !costItem._id.includes('t'),
              }"
              :key="costItem._id"
              @mouseover="hoverCostItem(costItem)"
              @mouseleave="leaveCostItem(costItem)"
              @click="addBreading(costItem)"
            >
              <template v-if="costItem.type === 'price'">
                {{ parseFloat(costItem.usdtPrice).toFixed(2) }}

                <div class="ml_1">
                  <v-img width="16px" src="/images/currencies/usdt.png"></v-img>
                </div>
              </template>

              <template v-if="costItem.type === 'header'">
                <div class="cost_item__number">
                  {{ costItem.number }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="breeding_selected_section">
        <DashboardPageHeader title="Breeding selected">
          <template #items> .</template>
        </DashboardPageHeader>

        <span v-if="breedingSelected.length === 0">
          No breeding selecteds
        </span>

        <div class="breeding_selected" v-else>
          <div
            class="breeding_selected_item"
            v-for="(
              breedingSelectedItem, breedingSelectedItemIndex
            ) in breedingSelected"
            :key="breedingSelectedItem._id"
          >
            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--axie
              "
            >
              <span class="breeding_selected_item__value">{{
                breedingSelectedItem.motherIndex
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/mother.png"
              ></v-img>
            </v-chip>

            <v-icon color="error" class="breeding_selected_item__axie"
              >mdi-heart</v-icon
            >

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--axie
              "
            >
              <span class="breeding_selected_item__value">{{
                breedingSelectedItem.fatherIndex
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/father.png"
              ></v-img>
            </v-chip>

            <v-icon>mdi-equal</v-icon>

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--slp
              "
            >
              <span class="breeding_selected_item__value">{{
                breedingSelectedItem.slpAmount
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/slp.webp"
              ></v-img>
            </v-chip>

            <v-icon>mdi-plus</v-icon>

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--axs
              "
            >
              <span class="breeding_selected_item__value">{{
                breedingSelectedItem.axsAmount
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/axs.webp"
              ></v-img>
            </v-chip>

            <v-icon>mdi-equal</v-icon>

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--usdt
              "
            >
              <span class="breeding_selected_item__value">{{
                parseFloat(breedingSelectedItem.usdtPrice).toFixed(2)
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/usdt.png"
              ></v-img>
            </v-chip>

            <v-chip
              class="
                breeding_selected_item__chip
                breeding_selected_item__chip--action
              "
              @click="removeBreading(breedingSelectedItemIndex)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-chip>
          </div>

          <div
            class="breeding_selected_item"
            v-if="breadingSelectedSlpItem && breadingSelectedAxsItem"
          >
            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--slp
              "
            >
              <span class="breeding_selected_item__value">{{
                breadingSelectedSlpItem.amount
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/slp.webp"
              ></v-img>

              <v-icon class="mx_2">mdi-equal</v-icon>

              <span class="breeding_selected_item__value">{{
                parseFloat(breadingSelectedSlpItem.usdtPrice).toFixed(2)
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/usdt.png"
              ></v-img>
            </v-chip>

            <v-icon>mdi-plus</v-icon>

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--axs
              "
            >
              <span class="breeding_selected_item__value">{{
                breadingSelectedAxsItem.amount
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/axs.webp"
              ></v-img>

              <v-icon class="mx_2">mdi-equal</v-icon>

              <span class="breeding_selected_item__value">{{
                parseFloat(breadingSelectedAxsItem.usdtPrice).toFixed(2)
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/usdt.png"
              ></v-img>
            </v-chip>

            <v-icon>mdi-equal</v-icon>

            <v-chip
              class="
                breeding_selected_item__chip breeding_selected_item__chip--usdt
              "
            >
              <span class="breeding_selected_item__value">{{
                parseFloat(
                  breadingSelectedSlpItem.usdtPrice +
                    breadingSelectedAxsItem.usdtPrice
                ).toFixed(2)
              }}</span>

              <v-img
                class="breeding_selected_item__text"
                width="20px"
                src="/images/currencies/usdt.png"
              ></v-img>
            </v-chip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BREAD_COST_SLP = [150, 300, 450, 750, 1200, 1950, 3150];

const BREAD_COST_AXS = 4;

import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";

export default {
  name: "BreadingCostPage",

  layout: "dashboard",

  components: {
    DashboardPageHeader,
  },

  data() {
    return {
      slpPrice: null,

      axsPrice: null,

      headers: [
        {
          text: "Nombre",
          value: "name",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
        },
      ],

      itemsSelected: [],

      breedingSelected: [],
    };
  },

  async mounted() {
    try {
      const [slpPrice, axsPrice, slpEth] = await Promise.all([
        this.getPrice("SLP"),
        this.getPrice("AXS"),
        this.getPrice("ETH"),
      ]);

      this.slpPrice = slpPrice;
      this.axsPrice = axsPrice;
      this.slpEth = slpEth;
    } catch (error) {}
  },

  computed: {
    breadingSelectedSlpItem() {
      if (this.breedingSelected.length === 0) {
        return null;
      }

      const amount = this.breedingSelected.reduce(
        (prev, { slpAmount }) => prev + slpAmount,
        0
      );

      return {
        amount,
        usdtPrice: amount * this.slpPrice,
      };
    },

    breadingSelectedAxsItem() {
      if (this.breedingSelected.length === 0) {
        return null;
      }

      const amount = this.breedingSelected.reduce(
        (prev, { axsAmount }) => prev + axsAmount,
        0
      );

      return {
        amount,
        usdtPrice: amount * this.axsPrice,
      };
    },

    currencies() {
      return [
        {
          name: "AXS",
          image: "/images/currencies/axs.webp",
          price: this.axsPrice,
        },
        {
          name: "SLP",
          image: "/images/currencies/slp.webp",
          price: this.slpPrice,
        },
        {
          name: "ETH",
          image: "/images/currencies/eth.webp",
          price: this.slpEth,
        },
      ];
    },

    costs() {
      const costsPrices = BREAD_COST_SLP.map((fatherCostSlp, fatherIndex) => {
        const items = BREAD_COST_SLP.map((motherCostSlp, motherIndex) => {
          const slpAmount = fatherCostSlp + motherCostSlp;
          const axsAmount = BREAD_COST_AXS;
          const usdtPrice = (slpAmount * this.slpPrice) + (axsAmount * this.axsPrice); // prettier-ignore

          return {
            _id: `l${fatherIndex}-t${motherIndex}`,
            fatherIndex,
            motherIndex,
            slpAmount,
            axsAmount,
            usdtPrice,
            type: "price",
          };
        });

        const headerLeft = {
          type: "header",
          number: fatherIndex,
          _id: `l${fatherIndex}`,
        };

        return [headerLeft, ...items];
      });

      const headerTop = [
        {
          _id: `-`,
          type: "header",
          number: "",
        },
        ...BREAD_COST_SLP.map((_, number) => ({
          _id: `t${number}`,
          type: "header",
          number,
        })),
      ];

      return [...headerTop, ...costsPrices.flat()];
    },
  },

  methods: {
    async getPrice(from, to = "USDT") {
      const data = await this.$axios.$get(
        `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
      );

      return data[to];
    },

    hoverCostItem(costItem) {
      if (costItem.type !== "price") {
        return;
      }
      const [headerLeft, headerTop] = costItem._id.split("-");
      this.itemsSelected = [headerLeft, headerTop, costItem._id];
    },

    leaveCostItem(costItem) {
      if (costItem.type !== "price") {
        return;
      }

      this.itemsSelected = [];
    },

    addBreading(costItem) {
      if (costItem.type !== "price") {
        return;
      }

      this.breedingSelected.push({
        ...costItem,
        _id: Date.now(),
      });
    },

    removeBreading(breedingSelectedIndex) {
      this.breedingSelected.splice(breedingSelectedIndex, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.currency_section {
}

//

.currencies {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include breakpoint(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include breakpoint(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include breakpoint(xl) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.currency_item {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
  padding: 24px;
  background-color: $color_light;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
}

.currency_item__left {
}

.currency_item__name {
  font-size: 14px;
  line-height: 21px;
  color: #67748e;
  font-weight: 600;
}

.currency_item__price {
  font-size: 20px;
  line-height: 28px;
  color: #344767;
  font-weight: 700;
}

.currency_item__right {
}

.currency_item__image {
}

//

.costs_responsive {
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;

  /* @include breakpoint(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  } */

  @include breakpoint(lg) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.costs {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 12px;

  overflow: hidden;
  min-width: 650px;

  @include breakpoint(lg) {
    grid-column: span 2;
  }
}

.cost_item {
  background-color: $color_light;
  border-radius: 16px;
  font-size: 12px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  transition: 0.15s;
  z-index: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    font-weight: 600;
    box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
  }
}

.cost_item__number {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: relative;
  background-color: $color_light;
  color: $color_primary;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  font-weight: 600;
}

.cost_item--hover {
  background-color: $color_primary;
  color: $color_light;
  position: relative;

  &:before {
    position: absolute;
    left: 0;
    content: "";
    display: block;
    transition: 0.3s;
  }
}

.cost_item--header_left {
  &:before {
    bottom: 50%;
    transform: translateY(calc(-50% + 1px));
    left: 0;
    width: 100vw;
    height: 2px;
    background-color: $color_primary;
  }
}

.cost_item--header_top {
  &:before {
    top: 0;
    left: 50%;
    transform: translateX(calc(-50% + 1px));
    width: 2px;
    height: 100vh;
    background-color: $color_primary;
  }
}

//
.breeding_selected {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
}

.breeding_selected_item {
}

.breeding_selected_item__chip.breeding_selected_item__chip {
  background-color: $color_light;
}

.breeding_selected_item__chip--axie {
  min-width: 60px;
}

.breeding_selected_item__chip--slp {
  min-width: 86px;
}

.breeding_selected_item__chip--axs {
}

.breeding_selected_item__chip--usdt {
}

.breeding_selected_item__chip--action.breeding_selected_item__chip--action {
  cursor: pointer;
}

.breeding_selected_item__value {
  font-weight: 600;
}

.breeding_selected_item__text {
  margin-left: 6px;
}
</style>