<template>
  <div class="dashboard_item_action_copy_clipboard">
    <DashboardItemAction
      icon="clipboard-outline"
      tip="Copiar comandos"
      @click="copyClipboard()"
    />

    <textarea
      style="z-index: -1; position: absolute; top: -1000vh"
      v-model="clipboard"
      ref="customNotesClipboard"
      cols="30"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
import DashboardItemAction from "@/components/Shared/DashboardItemAction";

export default {
  components: {
    DashboardItemAction,
  },

  props: {
    data: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      clipboard: "asdsa",
    };
  },

  methods: {
    copyClipboard() {
      this.clipboard = this.data;

      this.$nextTick(() => {
        this.$refs.customNotesClipboard.select();
        document.execCommand("copy");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard_item_action_copy_clipboard {
  overflow: hidden;
}
</style>