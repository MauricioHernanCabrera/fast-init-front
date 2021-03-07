<template>
  <div class="project">
    <div class="project__container custom_container custom_container_fluid">
      <DashboardPageHeader
        title="Proyectos"
        btnAddText="Crear un proyecto"
        @click="
          setModal({ active: 'project_new', data: { name: '', url: '' } })
        "
      >
      </DashboardPageHeader>

      <DashboardCard title="Proyectos">
        <DashboardList noItems="No hay proyectos cargados">
          <DashboardItem
            v-for="(programItem, programItemIndex) in projects"
            :key="programItem._id"
            :isVariant="programItemIndex % 2 === 0"
            :title="programItem.name"
            :description="programItem.commands.join(',')"
            :to="`/dashboard/commands?projectId=${programItem._id}`"
          >
            <DashboardItemAction
              icon="clipboard-outline"
              tip="Copiar comandos"
              @click="copyClipboard(programItem.commands)"
            />

            <DashboardItemAction
              icon="pencil-outline"
              tip="Editar programa"
              @click="setModal({ active: 'project_update', data: programItem })"
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

    <ModalFormNewProject
      :active="modal.active === 'project_new'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitNewProgram"
    ></ModalFormNewProject>

    <ModalFormUpdateProject
      :active="modal.active === 'project_update'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitUpdateProgram"
    ></ModalFormUpdateProject>

    <textarea
      style="z-index: -1; position: absolute; top: -1000%"
      v-model="clipboard"
      ref="customNotesClipboard"
      cols="30"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import DashboardList from "@/components/Shared/DashboardList";
import DashboardItem from "@/components/Shared/DashboardItem";
import DashboardItemAction from "@/components/Shared/DashboardItemAction";

import ModalFormNewProject from "@/components/Shared/ModalFormNewProject";
import ModalFormUpdateProject from "@/components/Shared/ModalFormUpdateProject";

import modalFormMixin from "@/mixins/modal-form";

export default {
  middleware: ["has-not-auth"],

  mixins: [modalFormMixin],

  layout: "dashboard",

  async asyncData({ $repositories }) {
    let projects = [];

    try {
      const { body } = await $repositories.project.getAll({
        "paginator.limit": 100000,
      });

      projects = body.docs;
    } catch (error) {
      console.log(error);
    } finally {
      return {
        projects,
      };
    }
  },

  components: {
    DashboardPageHeader,
    DashboardCard,
    DashboardList,
    DashboardItem,
    DashboardItemAction,

    ModalFormNewProject,
    ModalFormUpdateProject,
  },

  data() {
    return {
      clipboard: "asdsa",
    };
  },

  methods: {
    async submitNewProgram(data) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.project.createOne(data);

        this.addItem(this.projects, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitUpdateProgram({ _id, ...data }) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.project.updateOne(_id, data);

        this.updateItem(this.projects, _id, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitDeleteProgram(data) {
      this.updateItemIsLoadingProp(this.projects, data._id, true);

      try {
        await this.$repositories.project.deleteOne(data._id);

        this.deleteItem(this.projects, data._id);
      } catch (error) {
        this.updateItemIsLoadingProp(this.projects, data._id, false);
      }
    },

    copyClipboard(commands) {
      const commandsFiltered = commands.filter(
        (command) => command.program && command.program._id
      );

      const str = commandsFiltered
        .reduce(
          (acum, { program, param = "" }) =>
            `${acum} "${program.url}" ${param} &&`,
          ""
        )
        .slice(1, -3);

      const json = str;
      this.clipboard = json;

      this.$nextTick(() => {
        this.$refs.customNotesClipboard.select();
        document.execCommand("copy");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";
</style>