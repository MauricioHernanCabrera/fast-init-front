<template>
  <ModalForm
    v-model="dialog"
    @submit="submitForm"
    :isLoading="isLoading"
    :isDisabled="$v.$invalid"
    title="Nuevo proyecto"
  >
    <v-text-field
      label="Nombre (*)"
      required
      v-model="form.name"
      :error-messages="nameErrors"
      @input="$v.form.name.$touch()"
      @blur="$v.form.name.$touch()"
      autofocus
    ></v-text-field>
  </ModalForm>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import modalFormComponentMixin from "@/mixins/modal-form-component";

export default {
  mixins: [modalFormComponentMixin],

  validations: {
    form: {
      name: { required },
    },
  },

  data() {
    return {
      fieldsPick: ["name"],
    };
  },

  computed: {
    nameErrors() {
      return this.vuelidateErrors(this.$v.form.name, "name");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>