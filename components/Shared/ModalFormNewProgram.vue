<template>
  <ModalForm
    v-model="dialog"
    @submit="submitForm"
    :isLoading="isLoading"
    :isDisabled="$v.$invalid"
    title="Nuevo programa"
  >
    <v-text-field
      label="Nombre (*)"
      required
      v-model="form.name"
      :error-messages="nameErrors"
      @input="$v.form.name.$touch()"
      @blur="$v.form.name.$touch()"
    ></v-text-field>

    <v-text-field
      label="Url (*)"
      required
      v-model="form.url"
      :error-messages="urlErrors"
      @input="$v.form.url.$touch()"
      @blur="$v.form.url.$touch()"
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
      url: { required },
    },
  },

  data() {
    return {
      fieldsPick: ["name", "url"],
    };
  },

  computed: {
    nameErrors() {
      return this.vuelidateErrors(this.$v.form.name, "name");
    },

    urlErrors() {
      return this.vuelidateErrors(this.$v.form.url, "url");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>