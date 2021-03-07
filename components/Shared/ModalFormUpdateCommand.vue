<template>
  <ModalForm
    v-model="dialog"
    @submit="submitForm"
    :isLoading="isLoading"
    :isDisabled="$v.$invalid"
    title="Actualizar comando"
  >
    <v-select
      label="Programa (*)"
      required
      :items="programs"
      item-text="name"
      item-value="_id"
      v-model="form.program"
      :error-messages="programErrors"
      @input="$v.form.program.$touch()"
      @blur="$v.form.program.$touch()"
    ></v-select>

    <v-text-field
      label="Parametros"
      v-model="form.params"
      @input="$v.form.params.$touch()"
      @blur="$v.form.params.$touch()"
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
      params: {},
      program: { required },
    },
  },

  async mounted() {
    try {
      const resPrograms = await this.$repositories.program.getAll({
        "paginator.limit": 100000,
      });

      this.programs = resPrograms.body.docs;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      fieldsPick: ["name", "program", "_id"],
      programs: [],
    };
  },

  computed: {
    programErrors() {
      return this.vuelidateErrors(this.$v.form.program, "program");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>