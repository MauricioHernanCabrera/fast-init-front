<template>
  <ModalForm
    v-model="dialog"
    @submit="submitForm"
    :isLoading="isLoading"
    :isDisabled="$v.$invalid"
    title="Nuevo becario"
  >
    <v-text-field
      label="Nombre del becario"
      v-model="form.name"
      :error-messages="nameErrors"
      @input="$v.form.name.$touch()"
      @blur="$v.form.name.$touch()"
      autofocus
    ></v-text-field>

    <v-text-field
      label="Dirección de ethereum"
      v-model="form.ethAddress"
      :error-messages="ethAddressErrors"
      @input="$v.form.ethAddress.$touch()"
      @blur="$v.form.ethAddress.$touch()"
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
      ethAddress: { required },
    },
  },

  data() {
    return {
      fieldsPick: ["name", "ethAddress"],
    };
  },

  computed: {
    nameErrors() {
      return this.vuelidateErrors(this.$v.form.name, "required");
    },
    ethAddressErrors() {
      return this.vuelidateErrors(this.$v.form.ethAddress, "required");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>