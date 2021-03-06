import { findIndex } from "lodash";

export default {
  data() {
    return {
      modal: {
        data: {},
        active: false,
        isLoading: false
      }
    };
  },

  methods: {
    setModal({ active = "", data = {}, isLoading = false } = {}) {
      this.modal.active = active;
      this.modal.isLoading = isLoading;
      this.modal.data = data;
    },

    closeModal() {
      this.setModal({ active: "", data: {} });
    },

    loadingModal() {
      this.modal.isLoading = true;
    },

    findIndexById(array, _id) {
      return findIndex(array, ["_id", _id]);
    },

    updateItemIsLoadingProp(array, _id, value) {
      this.$set(array[this.findIndexById(array, _id)], "isLoading", value);
    },

    deleteItem(array, _id) {
      const programIndex = findIndex(array, ["_id", _id]);
      array.splice(programIndex, 1);
    },

    updateItem(array, _id, data) {
      const programIndex = findIndex(array, ["_id", _id]);
      array.splice(programIndex, 1, data);
    },

    addItem(array, data) {
      array.push(data);
    }
  }
};
