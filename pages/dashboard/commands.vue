<template>
  <div class="command">
    <div class="command__container custom_container custom_container_fluid">
      <DashboardPageHeader
        :title="`Comandos de ${project.name}`"
        btnAddText="Crear un comando"
        @click="
          setModal({
            active: 'command_new',
            data: { params: '', project: project._id, program: null },
          })
        "
      >
      </DashboardPageHeader>

      <DashboardCard title="Comandos">
        <DashboardList noItems="No hay comandos cargados">
          <DashboardItem
            v-for="(commandItem, commandItemIndex) in commands"
            :key="commandItem._id"
            :isVariant="commandItemIndex % 2 === 0"
            :title="`${commandItem.program.name}`"
            :description="commandItem.params"
          >
            <DashboardItemActionCopyClipboard
              :data="getDataToCopyClipboard(commandItem)"
            />

            <DashboardItemAction
              icon="pencil-outline"
              tip="Editar comando"
              @click="
                setModal({
                  active: 'command_update',
                  data: {
                    ...commandItem,
                    program: commandItem.program._id,
                  },
                })
              "
            />

            <DashboardItemAction
              icon="delete-outline"
              tip="Eliminar comando"
              @click="submitDeleteCommand(commandItem)"
              :isLoading="commandItem.isLoading"
            />
          </DashboardItem>
        </DashboardList>
      </DashboardCard>
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

export default {
  middleware: ["has-not-auth"],

  mixins: [modalFormMixin],

  layout: "dashboard",

  head: {
    title: "Fast Init - Comandos",
  },

  async asyncData({ $repositories, query: { projectId = null }, redirect }) {
    try {
      const [resProject, resCommands] = await Promise.all([
        $repositories.project.getOne(projectId),
        $repositories.command.getAll({
          "paginator.limit": 100000,
          "filter.projectId": projectId,
        }),
      ]);

      return {
        project: resProject.body,
        commands: resCommands.body.docs,
      };
    } catch (error) {
      console.log(error);

      return redirect("/dashboard/");
    }
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
      clipboard: "asdsa",
    };
  },

  methods: {
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

    getDataToCopyClipboard(commandItem) {
      return `"${commandItem.program.url}" ${commandItem.params}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";
</style>