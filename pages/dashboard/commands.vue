<template>
  <div class="command">
    <div class="command__container custom_container custom_container_fluid">
      <DashboardPageHeader
        :title="`Comandos de ${get(project, 'name', '...')}`"
        hasBack
      >
        <template v-slot:items>
          <v-btn
            color="#ffffff"
            depressed
            class="v-btn--btn_action mr-2 my-1"
            @click="
              setModal({
                active: 'command_new',
                data: { params: '', project: project._id, program: null },
              })
            "
          >
            Crear un comando
          </v-btn>

          <v-btn
            color="#ffffff"
            depressed
            class="v-btn--btn_action my-1"
            @click="copy(getDataToCopyClipboardCommands(commands))"
          >
            Copiar comandos
          </v-btn>
        </template>
      </DashboardPageHeader>

      <v-data-table
        :headers="headers"
        :items="commands"
        hide-default-footer
        mobile-breakpoint="0"
        class="v-data-table--custom"
        loading-text="Cargando comandos"
        no-data-text="No hay comandos cargados"
        :loading="isFirstLoading"
      >
        <template v-slot:item.program.name="{ item }">
          {{
            get(item, "program.isActive", false)
              ? get(item, "program.name", "-")
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
              <v-list-item @click="copy(getDataToCopyClipboardCommand(item))">
                <v-list-item-content>
                  <v-list-item-title>Copiar comando</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="
                  setModal({
                    active: 'command_update',
                    data: {
                      ...item,
                      program: item.program._id,
                    },
                  })
                "
              >
                <v-list-item-content>
                  <v-list-item-title>Editar comando</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                @click="submitDeleteCommand(item)"
                :disabled="item.isLoading"
              >
                <v-list-item-content>
                  <v-list-item-title>Eliminar comando</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>

    <ModalFormNewCommand
      :active="modal.active === 'command_new'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitNewCommand"
    ></ModalFormNewCommand>

    <ModalFormUpdateCommand
      :active="modal.active === 'command_update'"
      :data="modal.data"
      :isLoading="modal.isLoading"
      @close="closeModal"
      @submit="submitUpdateCommand"
    ></ModalFormUpdateCommand>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import DashboardList from "@/components/Shared/DashboardList";
import DashboardItem from "@/components/Shared/DashboardItem";
import DashboardItemAction from "@/components/Shared/DashboardItemAction";
import DashboardItemActionCopyClipboard from "@/components/Shared/DashboardItemActionCopyClipboard";

import ModalFormNewCommand from "@/components/Shared/ModalFormNewCommand";
import ModalFormUpdateCommand from "@/components/Shared/ModalFormUpdateCommand";

import modalFormMixin from "@/mixins/modal-form";

import copy from "copy-to-clipboard";
import { get } from "lodash";

export default {
  middleware: ["has-not-auth"],

  mixins: [modalFormMixin],

  layout: "dashboard",

  head: {
    title: "Fast Init - Comandos",
  },

  components: {
    DashboardPageHeader,
    DashboardCard,
    DashboardList,
    DashboardItem,
    DashboardItemAction,
    DashboardItemActionCopyClipboard,

    ModalFormNewCommand,
    ModalFormUpdateCommand,
  },

  data() {
    return {
      isFirstLoading: true,
      commands: [],
      project: null,
      headers: [
        {
          text: "Programa",
          value: "program.name",
        },
        {
          text: "Parametros",
          value: "params",
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
      const [resProject, resCommands] = await Promise.all([
        this.$repositories.project.getOne(this.$route.query.projectId),
        this.$repositories.command.getAll({
          "paginator.limit": 100000,
          "filter.projectId": this.$route.query.projectId,
        }),
      ]);

      this.project = resProject.body;
      this.commands = resCommands.body.docs;
    } catch (error) {
      return this.$router.push("/dashboard/");
    } finally {
      this.isFirstLoading = false;
    }
  },

  methods: {
    copy,
    get,

    async submitNewCommand(data) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.command.createOne(data);

        this.addItem(this.commands, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitUpdateCommand({ _id, ...data }) {
      try {
        this.loadingModal();

        const { body } = await this.$repositories.command.updateOne(_id, data);

        this.updateItem(this.commands, _id, body);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModal();
      }
    },

    async submitDeleteCommand(data) {
      this.updateItemIsLoadingProp(this.commands, data._id, true);

      try {
        await this.$repositories.command.deleteOne(data._id);

        this.deleteItem(this.commands, data._id);
      } catch (error) {
        this.updateItemIsLoadingProp(this.commands, data._id, false);
      }
    },

    getDataToCopyClipboardCommand(commandItem) {
      return `"${commandItem.program.url}" ${commandItem.params}`;
    },

    getDataToCopyClipboardCommands(commands) {
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