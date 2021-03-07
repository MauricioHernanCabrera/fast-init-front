<template>
  <div class="program">
    <div class="program__container custom_container custom_container_fluid">
      <DashboardPageHeader
        title="Programas"
        btnAddText="Crear un programa"
        @click="setModal({ active: 'program_new', data: { name: '' } })"
      >
      </DashboardPageHeader>

      <DashboardCard title="Programas">
        <DashboardList noItems="No hay programas cargados">
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
        </DashboardList>
      </DashboardCard>
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

  async asyncData({ $repositories }) {
    let programs = [];

    try {
      const { body } = await $repositories.program.getAll({
        "paginator.limit": 100000,
      });

      programs = body.docs;
    } catch (error) {
      console.log(error);
    } finally {
      return {
        programs,
      };
    }
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