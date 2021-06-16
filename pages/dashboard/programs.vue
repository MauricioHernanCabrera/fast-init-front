<template>
  <div class="program">
    <div class="program__container custom_container custom_container_fluid">
      <DashboardPageHeader
        title="Programas"
        btnAddText="Crear un programa"
        @click="setModal({ active: 'program_new', data: { name: '' } })"
      >
      </DashboardPageHeader>

      <v-data-table
        :headers="headers"
        :items="programs"
        hide-default-footer
        mobile-breakpoint="0"
        class="v-data-table--custom"
        loading-text="Cargando programas"
        no-data-text="No hay programas cargados"
        :loading="isFirstLoading"
      >
        <template v-slot:item.actions="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                @click="setModal({ active: 'program_update', data: item })"
              >
                <v-list-item-content>
                  <v-list-item-title>Editar programa</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="submitDeleteProgram(item)"
                :disabled="item.isLoading"
              >
                <v-list-item-content>
                  <v-list-item-title>Eliminar programa</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>

      <!-- <DashboardList noItems="No hay programas cargados">
          <DashboardItem
            v-for="(programItem, programItemIndex) in programs"
            :key="programItem._id"
            :isVariant="programItemIndex % 2 === 0"
            :title="programItem.name"
            :description="programItem.url"
          >
            <DashboardItemAction
              icon="pencil-outline"
              tip="Editar programa"
              @click="setModal({ active: 'program_update', data: programItem })"
            />

            <DashboardItemAction
              icon="delete-outline"
              tip="Eliminar programa"
              @click="submitDeleteProgram(programItem)"
              :isLoading="programItem.isLoading"
            />
          </DashboardItem>
        </DashboardList> -->
    </div>

    <ModalFormNewProgram
      :active="modal.active === 'program_new'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitNewProgram"
    ></ModalFormNewProgram>

    <ModalFormUpdateProgram
      :active="modal.active === 'program_update'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitUpdateProgram"
    ></ModalFormUpdateProgram>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import DashboardList from "@/components/Shared/DashboardList";
import DashboardItem from "@/components/Shared/DashboardItem";
import DashboardItemAction from "@/components/Shared/DashboardItemAction";

import ModalFormNewProgram from "@/components/Shared/ModalFormNewProgram";
import ModalFormUpdateProgram from "@/components/Shared/ModalFormUpdateProgram";

import modalFormMixin from "@/mixins/modal-form";

export default {
  middleware: ["has-not-auth"],

  mixins: [modalFormMixin],

  layout: "dashboard",

  head: {
    title: "Fast Init - Programas",
  },

  components: {
    DashboardPageHeader,
    DashboardCard,
    DashboardList,
    DashboardItem,
    DashboardItemAction,

    ModalFormNewProgram,
    ModalFormUpdateProgram,
  },

  data() {
    return {
      isFirstLoading: true,
      programs: [],
      headers: [
        {
          text: "Nombre",
          value: "name",
        },
        {
          text: "Path",
          value: "url",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },

  async mounted() {
    try {
      const { body } = await this.$repositories.program.getAll({
        "paginator.limit": 100000,
      });

      this.programs = body.docs;
    } catch (error) {
      console.log(error);
    } finally {
      this.isFirstLoading = false;
    }
  },

  methods: {
    async submitNewProgram(data) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.program.createOne(data);

        this.addItem(this.programs, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitUpdateProgram({ _id, ...data }) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.program.updateOne(_id, data);

        this.updateItem(this.programs, _id, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitDeleteProgram(data) {
      this.updateItemIsLoadingProp(this.programs, data._id, true);

      try {
        await this.$repositories.program.deleteOne(data._id);

        this.deleteItem(this.programs, data._id);
      } catch (error) {
        this.updateItemIsLoadingProp(this.programs, data._id, false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";
</style>