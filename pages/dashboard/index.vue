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

      <v-data-table
        :headers="headers"
        :items="projects"
        hide-default-footer
        mobile-breakpoint="0"
        class="v-data-table--custom"
        loading-text="Cargando proyecto"
        no-data-text="No hay proyecto cargados"
        :loading="isFirstLoading"
        @click:row="handleClick"
      >
        <template v-slot:item.commands="{ item }">
          {{
            item.commands.length > 0
              ? item.commands.map(({ program }) => program.name).join(" | ")
              : "-"
          }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item :to="`/dashboard/commands?projectId=${item._id}`">
                <v-list-item-content>
                  <v-list-item-title>Ver comandos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="copy(getDataToCopyClipboard(item.commands))">
                <v-list-item-content>
                  <v-list-item-title>Copiar comandos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="setModal({ active: 'project_update', data: item })"
              >
                <v-list-item-content>
                  <v-list-item-title>Editar proyecto</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="submitDeleteProject(item)"
                :disabled="item.isLoading"
              >
                <v-list-item-content>
                  <v-list-item-title>Eliminar proyecto</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
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

import copy from "copy-to-clipboard";

export default {
  middleware: ["has-not-auth"],

  mixins: [modalFormMixin],

  layout: "dashboard",

  head: {
    title: "Fast Init - Proyectos",
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

  data() {
    return {
      isFirstLoading: true,
      projects: [],
      headers: [
        {
          text: "Nombre",
          value: "name",
        },
        {
          text: "Comandos",
          value: "commands",
          sortable: false,
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
      const { body } = await this.$repositories.project.getAll({
        "paginator.limit": 100000,
      });

      this.projects = body.docs;
    } catch (error) {
      console.log(error);
    } finally {
      this.isFirstLoading = false;
    }
  },

  methods: {
    copy,

    handleClick(item) {
      this.$router.push(`/dashboard/commands?projectId=${item._id}`);
    },

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