<template>
  <div class="project">
    <div class="project__container custom_container custom_container_xxl">
      <DashboardPageHeader title="Breeding">
        <template #items> .</template>
      </DashboardPageHeader>

      <form @submit.prevent="getAxies" class="mb_6">
        <v-row>
          <v-col cols="12" class="py_0 my_0"> Axies </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-text-field
              v-model="form.fatherIds"
              label="Padres ids"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-text-field
              v-model="form.motherIds"
              label="Madres ids"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb_6">
          <v-col cols="12" class="py_0 my_0"> Filtros </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-select
              :items="sortBy"
              label="Ordenamiento"
              v-model="form.sortBy"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-text-field
              v-model="form.partScore"
              label="Partes puntaje"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-switch
              v-model="form.openParts"
              label="Mostrar detalle de las partes"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>

        <v-btn color="primary" type="submit">Buscar</v-btn>
      </form>

      <div class="breeding" v-if="breedingSelectedFounded.length !== 0">
        <BreedingItem
          v-for="breedingItem in breedingSelectedFounded"
          :breedingItem="breedingItem"
          :key="breedingItem.id"
          :options="form"
          @toggle="toggleBreeding(breedingItem)"
        />
      </div>

      <v-divider class="my_6"></v-divider>

      <span v-if="isLoading">
        Cargando... ({{ axiesFounded }} / {{ totalAxies }})
      </span>

      <template v-else>
        <div v-if="breedingFounded.length === 0">No se encontraron axies</div>

        <template v-else>
          <div class="breeding">
            <BreedingItem
              v-for="breedingItem in breedingFounded"
              :breedingItem="breedingItem"
              :key="breedingItem.id"
              @toggle="toggleBreeding(breedingItem)"
              :options="form"
            />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import BreedingItem from "@/components/Shared/BreedingItem";

import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import BigNumber from "bignumber.js";
import { get } from "lodash";

import {
  classGeneMap,
  regionGeneMap,
  binarytraits,
  geneColorMap,
  PROBABILITIES,
} from "@/consts";

export default {
  name: "Home",

  mixins: [],

  layout: "dashboard",

  components: {
    DashboardPageHeader,
    DashboardCard,
    BreedingItem,
  },

  data() {
    return {
      isLoading: false,

      sortBy: [
        { text: "Mayor puntaje", value: "best_point_score" },
        { text: "Mayor puntaje de puros", value: "best_purity_score" },
        { text: "Menor precio", value: "minor_price" },
      ],

      partsClassMap: {},

      form: {
        fatherIds: null,
        motherIds: null,
        openParts: false,
        partScore: null,
        sortBy: null,
      },

      fathers: [],
      mothers: [],

      breedingSelected: [],

      breeding: [],

      axiesFounded: 0,
    };
  },

  async mounted() {
    // try {
    //   const axies = await this.$repositories.all.getAxies({
    //     sort: "PriceAsc",
    //     auctionType: "Sale",
    //     owner: null,
    //     criteria: {
    //       region: null,
    //       parts: [
    //         "back-pumpkin",
    //         "tail-carrot",
    //         "mouth-serious",
    //         "horn-cactus",
    //         // // "back-goldfish",
    //         // "mouth-risky-fish",
    //         // // "horn-shoal-star",
    //         // "tail-nimo",
    //       ],
    //       bodyShapes: null,
    //       classes: ["Plant"],
    //       stages: null,
    //       numMystic: null,
    //       pureness: [6, 6],
    //       title: null,
    //       breedable: null,
    //       breedCount: [0, 0],
    //       hp: [],
    //       skill: [],
    //       speed: [],
    //       morale: [],
    //     },
    //   });
    //   const axiesMap = axies.map((data) => {
    //     if (data.stage < 3) {
    //       return null;
    //     }
    //     const genes = this.genesToBin(new BigNumber(data.genes));
    //     return {
    //       ...data,
    //       genes: this.getTraits(genes),
    //     };
    //   });
    //   this.breeding = this.breedingMap(
    //     JSON.parse(JSON.stringify(axiesMap)),
    //     JSON.parse(JSON.stringify(axiesMap))
    //   );
    //   console.log(this.breeding);
    // } catch (error) {
    //   console.log(error);
    // }
  },

  computed: {
    totalAxies() {
      return (
        this.form.fatherIds.split(",").length +
        this.form.motherIds.split(",").length
      );
    },

    breedingFounded() {
      // return this.breedingFiltered(this.breeding);
      return this.breedingSort(this.breedingFiltered(this.breeding));
    },

    breedingSelectedFounded() {
      // return this.breedingFiltered(this.breedingSelected);
      return this.breedingSort(this.breedingFiltered(this.breedingSelected));
    },
  },

  methods: {
    toggleBreeding(breeding) {
      const clone = JSON.parse(JSON.stringify(breeding));

      const breedingIndex = this.breedingSelected.findIndex(
        ({ id }) => clone.id == id
      );

      if (breedingIndex === -1) {
        this.breedingSelected.push(clone);
      } else {
        this.breedingSelected.splice(breedingIndex, 1);
      }
    },

    breedingSort(breeding) {
      let items = breeding.slice();

      switch (this.form.sortBy) {
        case "best_point_score": {
          items = items.sort((a, b) => b.score - a.score);
          break;
        }

        case "best_purity_score": {
          items = items.sort((a, b) => b.purityScore - a.purityScore);
          break;
        }

        case "minor_price": {
          items = items.sort((a, b) => a.totalPriceUSD - b.totalPriceUSD);
          break;
        }
      }

      return items.slice(0, 20);
    },

    breedingFiltered(breeding) {
      const { partScore } = this.form;

      const clone = JSON.parse(JSON.stringify(breeding));

      if (!partScore) {
        return clone;
      }

      return clone.filter((breedingItem) => {
        const {
          eyesProbs,
          earsProbs,
          mouthProbs,
          hornProbs,
          backProbs,
          tailProbs,
        } = breedingItem;

        return (
          eyesProbs.slice().reverse()[1].value >= partScore &&
          earsProbs.slice().reverse()[1].value >= partScore &&
          //
          mouthProbs.slice().reverse()[0].value >= partScore &&
          hornProbs.slice().reverse()[0].value >= partScore &&
          backProbs.slice().reverse()[0].value >= partScore &&
          tailProbs.slice().reverse()[0].value >= partScore
        );
      });
    },

    breedingMap(fathers, mothers) {
      if (fathers.length === 0 || mothers.length === 0) {
        return [];
      }

      return fathers
        .map((fatherItem) =>
          mothers.map((motherItem) =>
            fatherItem.id !== motherItem.id
              ? this.calc(fatherItem, motherItem)
              : null
          )
        )
        .flat()
        .filter((breeding) => breeding !== null)
        .reduce(
          (prev, current) =>
            prev.some((prevItem) => prevItem.id === current.id)
              ? prev
              : [...prev, current],
          []
        )
        .map((breeding) => {
          const eyesProbs = this.sortParts(breeding.eyesProbs);
          const earsProbs = this.sortParts(breeding.earsProbs);
          const mouthProbs = this.sortParts(breeding.mouthProbs);
          const hornProbs = this.sortParts(breeding.hornProbs);
          const backProbs = this.sortParts(breeding.backProbs);
          const tailProbs = this.sortParts(breeding.tailProbs);

          const score =
            eyesProbs[0].value +
            earsProbs[0].value +
            mouthProbs[0].value +
            hornProbs[0].value +
            backProbs[0].value +
            tailProbs[0].value;

          const purityScore =
            this.getPurity(eyesProbs).value +
            this.getPurity(earsProbs).value +
            this.getPurity(mouthProbs).value +
            this.getPurity(hornProbs).value +
            this.getPurity(backProbs).value +
            this.getPurity(tailProbs).value;

          return {
            ...breeding,
            eyesProbs: [...eyesProbs, this.getPurity(eyesProbs), eyesProbs[0]],
            earsProbs: [...earsProbs, this.getPurity(earsProbs), earsProbs[0]],
            mouthProbs: [
              ...mouthProbs,
              this.getPurity(mouthProbs),
              mouthProbs[0],
            ],
            hornProbs: [...hornProbs, this.getPurity(hornProbs), hornProbs[0]],
            backProbs: [...backProbs, this.getPurity(backProbs), backProbs[0]],
            tailProbs: [...tailProbs, this.getPurity(tailProbs), tailProbs[0]],
            score,
            purityScore,

            totalPriceUSD:
              parseFloat(get(breeding, "mother.auction.currentPriceUSD", 0)) +
              parseFloat(get(breeding, "father.auction.currentPriceUSD", 0)),
          };
        });
    },

    getPurity(parts) {
      const bestPurityPart = Object.entries(
        parts.reduce((prev, current) => {
          if (prev[current.class]) {
            prev[current.class] += current.value;
          } else {
            prev[current.class] = current.value;
          }

          return prev;
        }, {})
      )
        .map(([key, value]) => ({
          ["class"]: key,
          value,
        }))
        .slice()
        .sort((a, b) => b.value - a.value);

      return bestPurityPart[0];
    },

    sortParts(parts) {
      return JSON.parse(JSON.stringify(parts)).sort(
        (a, b) => b.value - a.value
      );
    },

    async getAxies() {
      this.isLoading = true;
      this.axiesFounded = 0;

      try {
        this.fathers = [];

        await this.form.fatherIds
          .split(",")
          .reduce(async (previousPromise, axieId, index) => {
            await previousPromise;
            const result = await this.getAxie(axieId.trim());
            this.axiesFounded++;
            this.fathers.push(result);
          }, Promise.resolve());

        this.mothers = [];

        await this.form.motherIds
          .split(",")
          .reduce(async (previousPromise, axieId, index) => {
            await previousPromise;

            this.axiesFounded++;

            const motherFounded = this.fathers.find(({ id }) => id == axieId);

            if (!motherFounded) {
              const result = await this.getAxie(axieId.trim());
              this.mothers.push(result);
            } else {
              this.mothers.push(motherFounded);
            }
          }, Promise.resolve());

        this.breeding = this.breedingMap(this.fathers, this.mothers);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    calc(father, mother) {
      const [
        patternProbs,
        colorProbs,
        eyesProbs,
        earsProbs,

        mouthProbs,
        hornProbs,
        backProbs,
        tailProbs,
      ] = [
        this.sumProbs(father.genes.pattern, mother.genes.pattern),
        this.sumProbs(father.genes.color, mother.genes.color),

        this.sumProbs(father.genes.eyes, mother.genes.eyes),
        this.sumProbs(father.genes.ears, mother.genes.ears),

        this.sumProbs(father.genes.mouth, mother.genes.mouth),
        this.sumProbs(father.genes.horn, mother.genes.horn),
        this.sumProbs(father.genes.back, mother.genes.back),
        this.sumProbs(father.genes.tail, mother.genes.tail),
      ];

      const id = [father.id, mother.id].sort().join("_");

      return {
        id,
        patternProbs,
        colorProbs,
        eyesProbs,
        earsProbs,

        mouthProbs,
        hornProbs,
        backProbs,
        tailProbs,

        father,
        mother,
      };
    },

    traitsToProb(traits) {
      let temp = {};

      temp[traits.d] = "D";

      if (traits.r1 in temp) {
        temp[traits.d] = "D, R1";
      } else {
        temp[traits.r1] = "R1";
      }

      if (traits.r2 in temp) {
        temp[traits.r2] += ", R2";
      } else {
        temp[traits.r2] = "R2";
      }

      return Object.entries(temp).map(([text, value]) => ({ text, value }));
    },

    isBreedable(axie1, axie2) {
      //self check
      if (axie1.id == axie2.id) {
        return false;
      }

      //parents check
      if (axie2.matronId == axie1.id || axie2.sireId == axie1.id) {
        return false;
      }

      if (axie1.matronId == axie2.id || axie1.sireId == axie2.id) {
        return false;
      }

      //After checking parents, skip if ether is a tagged axie
      if (axie1.matronId == 0 || axie2.matronId == 0) {
        return true;
      }

      //check siblings
      if (axie1.matronId == axie2.matronId || axie1.matronId == axie2.sireId) {
        return false;
      }

      if (axie1.sireId == axie2.matronId || axie1.sireId == axie2.sireId) {
        return false;
      }

      return true;
    },

    sumProbs(sireTraits, matronTraits) {
      let probs = sireTraits.reduce((prev, current, index) => {
        const prevIndex = prev.findIndex(
          (prevItem) => prevItem.part === current.part
        );

        if (prevIndex !== -1) {
          prev[prevIndex].value += PROBABILITIES[index];

          return prev;
        } else {
          return [
            ...prev,
            {
              class: current.class,
              part: current.part,
              value: PROBABILITIES[index],
            },
          ];
        }
      }, []);

      probs = matronTraits.reduce((prev, current, index) => {
        const prevIndex = prev.findIndex(
          (prevItem) => prevItem.part === current.part
        );

        if (prevIndex !== -1) {
          prev[prevIndex].value += PROBABILITIES[index];

          return prev;
        } else {
          return [
            ...prev,
            {
              class: current.class,
              part: current.part,
              value: PROBABILITIES[index],
            },
          ];
        }
      }, JSON.parse(JSON.stringify(probs)));

      return probs;
    },

    async getAxie(axieId) {
      const data = await this.$repositories.all.getAxieDetails(axieId);

      if (data.stage < 3) {
        return null;
      }

      const genes = this.genesToBin(new BigNumber(data.genes));

      return {
        ...data,
        genes: this.getTraits(genes),
      };
    },

    genesToBin(genes) {
      let genesString = genes.toString(2);

      genesString = this.strMul("0", 256 - genesString.length) + genesString;

      return genesString;
    },

    strMul(str, num) {
      let s = "";

      for (let i = 0; i < num; i++) {
        s += str;
      }

      return s;
    },

    getTraits(genes) {
      const groups = [
        genes.slice(0, 32),
        genes.slice(32, 64),
        genes.slice(64, 96),
        genes.slice(96, 128),
        genes.slice(128, 160),
        genes.slice(160, 192),
        genes.slice(192, 224),
        genes.slice(224, 256),
      ];

      const cls = this.getClassFromGroup(groups[0]);
      const region = this.getRegionFromGroup(groups[0]);

      const pattern = this.getPatternsFromGroup(groups[1]);
      const color = this.getColorsFromGroup(groups[1], groups[0].slice(0, 4));

      const eyes = this.getPartsFromGroup("eyes", groups[2], region);
      const ears = this.getPartsFromGroup("ears", groups[4], region);

      const mouth = this.getPartsFromGroup("mouth", groups[3], region);
      const horn = this.getPartsFromGroup("horn", groups[5], region);
      const back = this.getPartsFromGroup("back", groups[6], region);
      const tail = this.getPartsFromGroup("tail", groups[7], region);

      return {
        // cls,
        // region,
        pattern,
        color,

        eyes,
        ears,

        mouth,
        horn,
        back,
        tail,
      };
    },

    getClassFromGroup(group) {
      const bin = group.slice(0, 4);

      if (!(bin in classGeneMap)) {
        return "Unknown Class";
      }

      return classGeneMap[bin];
    },

    getRegionFromGroup(group) {
      const regionBin = group.slice(8, 13);

      if (regionBin in regionGeneMap) {
        return regionGeneMap[regionBin];
      }

      return "Unknown Region";
    },

    getPatternsFromGroup(group) {
      //patterns could be 6 bits. use 4 for now

      return [
        { class: group.slice(2, 8), part: group.slice(2, 8) },
        { class: group.slice(8, 14), part: group.slice(8, 14) },
        { class: group.slice(14, 20), part: group.slice(14, 20) },
      ];
    },

    getColorsFromGroup(group, cls) {
      return [
        {
          class: this.getColor(group.slice(20, 24), cls),
          part: this.getColor(group.slice(20, 24), cls),
        },
        {
          class: this.getColor(group.slice(24, 28), cls),
          part: this.getColor(group.slice(24, 28), cls),
        },
        {
          class: this.getColor(group.slice(28, 32), cls),
          part: this.getColor(group.slice(28, 32), cls),
        },
      ];
    },

    getPartsFromGroup(part, group, region) {
      const dClass = classGeneMap[group.slice(2, 6)];
      const dBin = group.slice(6, 12);
      const dID = this.getPartName(dClass, part, region, dBin);

      const r1Class = classGeneMap[group.slice(12, 16)];
      const r1Bin = group.slice(16, 22);
      const r1ID = this.getPartName(r1Class, part, region, r1Bin);

      const r2Class = classGeneMap[group.slice(22, 26)];
      const r2Bin = group.slice(26, 32);
      const r2ID = this.getPartName(r2Class, part, region, r2Bin);

      return [
        { class: dClass, part: dID },
        { class: r1Class, part: r1ID },
        { class: r2Class, part: r2ID },
      ];
    },

    getColor(bin, cls) {
      let color;

      if (bin == "0000") {
        color = "ffffff";
      } else if (bin == "0001") {
        color = "7a6767";
      } else {
        color = geneColorMap[cls][bin];
      }

      return color;
    },

    getPartName(cls, part, region, binary) {
      let trait;

      if (binary in binarytraits[cls][part]) {
        if (region in binarytraits[cls][part][binary]) {
          trait = binarytraits[cls][part][binary][region];
        } else if ("global" in binarytraits[cls][part][binary]) {
          trait = binarytraits[cls][part][binary]["global"];
        } else {
          trait = "UNKNOWN Regional " + cls + " " + part;
        }
      } else {
        trait = "UNKNOWN " + cls + " " + part;
      }

      return trait;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";

.breeding {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include breakpoint(lg) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include breakpoint(xl) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include breakpoint(xxl) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>