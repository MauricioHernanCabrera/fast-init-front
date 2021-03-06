<template>
  <div class="program">
    <div class="program__container custom_container custom_container_fluid">
      <DashboardPageHeader
        title="Programas"
        btnAddText="Crear un programa"
        @add
      >
      </DashboardPageHeader>

      <DashboardCard title="Programas">
        <DashboardList noItems="No hay programas cargados">
          <DashboardItem
            v-for="(programItem, programItemIndex) in programs"
            :key="programItem._id"
            :isOdd="programItemIndex % 2 === 1"
            :title="programItem.name"
            :description="programItem.url"
          >
            <DashboardItemAction icon="pencil-outline" tip="Editar programa" />

            <DashboardItemAction
              icon="delete-outline"
              tip="Eliminar programa"
            />
          </DashboardItem>
        </DashboardList>
      </DashboardCard>
    </div>
  </div>
</template>

<script>
import DashboardCard from "@/components/Shared/DashboardCard";
import DashboardPageHeader from "@/components/Shared/DashboardPageHeader";
import DashboardList from "@/components/Shared/DashboardList";
import DashboardItem from "@/components/Shared/DashboardItem";
import DashboardItemAction from "@/components/Shared/DashboardItemAction";

export default {
  middleware: ["has-not-auth"],

  layout: "dashboard",

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
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/utils.scss";

.dashboard_list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>