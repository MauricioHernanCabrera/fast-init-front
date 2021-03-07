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
            v-for="(projectItem, projectItemIndex) in projects"
            :key="projectItem._id"
            :isVariant="projectItemIndex % 2 === 0"
            :title="projectItem.name"
            :description="
              projectItem.commands
                .map(({ program }) => program.name)
                .join(' | ')
            "
            :to="`/dashboard/commands?projectId=${projectItem._id}`"
          >
            <DashboardItemActionCopyClipboard
              :data="getDataToCopyClipboard(projectItem.commands)"
            />

            <DashboardItemAction
              icon="pencil-outline"
              tip="Editar proyecto"
              @click="setModal({ active: 'project_update', data: projectItem })"
            />

            <DashboardItemAction
              icon="delete-outline"
              tip="Eliminar proyecto"
              @click="submitDeleteProject(projectItem)"
              :isLoading="projectItem.isLoading"
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
      @submit="submitNewProject"
    ></ModalFormNewProject>

    <ModalFormUpdateProject
      :active="modal.active === 'project_update'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitUpdateProject"
    ></ModalFormUpdateProject>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import DashboardList from "@/components/Shared/DashboardList";
import DashboardItem from "@/components/Shared/DashboardItem";
import DashboardItemAction from "@/components/Shared/DashboardItemAction";
import DashboardItemActionCopyClipboard from "@/components/Shared/DashboardItemActionCopyClipboard";

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
    DashboardItemActionCopyClipboard,

    ModalFormNewProject,
    ModalFormUpdateProject,
  },

  methods: {
    async submitNewProject(data) {
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

    async submitUpdateProject({ _id, ...data }) {
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

    async submitDeleteProject(data) {
      this.updateItemIsLoadingProp(this.projects, data._id, true);

      try {
        await this.$repositories.project.deleteOne(data._id);

        this.deleteItem(this.projects, data._id);
      } catch (error) {
        this.updateItemIsLoadingProp(this.projects, data._id, false);
      }
    },

    getDataToCopyClipboard(commands) {
      const commandsFiltered = commands.filter(
        (command) => command.program && command.program._id
      );

      const str = commandsFiltered
        .reduce(
          (acum, { program, params = "" }) =>
            `${acum} "${program.url}" ${params} &&`,
          ""
        )
        .slice(1, -3);

      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";
</style>