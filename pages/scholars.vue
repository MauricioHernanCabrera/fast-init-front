<template>
  <div class="project">
    <div class="project__container custom_container custom_container_fluid">
      <DashboardPageHeader
        title="Becarios"
        btnAddText="Agregar becario"
        @click="setModal({ active: 'scholar_new', data: { ethAddress: '' } })"
      >
      </DashboardPageHeader>

      <v-data-table
        :headers="headers"
        :items="scholars"
        mobile-breakpoint="0"
        class="v-data-table--custom"
        loading-text="Cargando becarios"
        no-data-text="No hay becarios cargados"
        :loading="isFirstLoading"
      >
        <template v-slot:item.name="{ item }">
          <a
            :href="`https://marketplace.axieinfinity.com/profile/${item}/axie`"
          >
            {{ item.name }}
          </a>
        </template>

        <template v-slot:item.lastClaimDateDay="{ item }">
          {{ item.lastClaimDateDay }} días
        </template>

        <template v-slot:item.average="{ item }">
          {{ (item.total / item.lastClaimDateDay).toFixed(2) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                @click="setModal({ active: 'scholar_update', data: item })"
              >
                <v-list-item-content>
                  <v-list-item-title>Editar becarios</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- @click="submitDeleteProject(item)" -->
              <v-list-item :disabled="item.isLoading">
                <v-list-item-content>
                  <v-list-item-title>Eliminar becarios</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>

    <ModalFormNewScholar
      :active="modal.active === 'scholar_new'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="addScholar"
    ></ModalFormNewScholar>

    <!-- 

    <ModalFormUpdateProject
      :active="modal.active === 'scholar_update'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitUpdateProject"
    ></ModalFormUpdateProject> -->
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";

import ModalFormNewScholar from "@/components/Shared/ModalFormNewScholar";
import ModalFormUpdateProject from "@/components/Shared/ModalFormUpdateProject";

import modalFormMixin from "@/mixins/modal-form";

import copy from "copy-to-clipboard";
import { get } from "lodash";

export default {
  mixins: [modalFormMixin],

  layout: "dashboard",

  components: {
    DashboardPageHeader,
    DashboardCard,

    ModalFormNewScholar,
    ModalFormUpdateProject,
  },

  data() {
    return {
      isFirstLoading: true,
      scholars: [],
      headers: [
        {
          text: "Nombre",
          value: "name",
        },
        {
          text: "Promedio",
          value: "average",
        },
        {
          text: "Sin reclamar",
          value: "unclaimed",
        },
        {
          text: "Reclamado",
          value: "claimed",
        },
        {
          text: "Total",
          value: "total",
        },
        {
          text: "Ultimo reclamo",
          value: "lastClaimDateDay",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },

  mounted() {
    this.isFirstLoading = false;
  },

  methods: {
    async addScholar({ name, ethAddress }) {
      try {
        const resSlp = await this.$axios.$get(
          `https://lunacia.skymavis.com/game-api/clients/${ethAddress}/items/1`
        );

        console.log(resSlp);

        const lastClaimDateDay = new Date(resSlp.last_claimed_item_at * 1000);

        const lastClaimDateDayMoment = this.$moment(
          lastClaimDateDay,
          "DD-MM-YYYY"
        );

        const currentDate = new Date();
        currentDate.setHours(21);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);

        const currentDateMoment = this.$moment(new Date(), "DD-MM-YYYY");

        this.scholars.push({
          name,
          ethAddress,
          unclaimed: resSlp.total,
          claimed: resSlp.claimable_total,
          total: resSlp.total,
          lastClaimDateDay: currentDateMoment.diff(
            lastClaimDateDayMoment,
            "days"
          ),
        });
      } catch (error) {
        console.log({ error });
      } finally {
      }
    },

    // formatScholar(resScholar) {
    //   return {

    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";
</style>