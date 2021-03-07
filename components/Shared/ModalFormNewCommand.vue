<template>
  <ModalForm
    v-model="dialog"
    @submit="submitForm"
    :isLoading="isLoading"
    :isDisabled="$v.$invalid"
    title="Nuevo comando"
  >
    <v-select
      label="Proyecto (*)"
      required
      :items="projects"
      item-text="name"
      item-value="_id"
      v-model="form.project"
      :error-messages="projectErrors"
      @input="$v.form.project.$touch()"
      @blur="$v.form.project.$touch()"
      disabled
    ></v-select>

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
      project: { required },
      program: { required },
    },
  },

  async mounted() {
    try {
      const [resProjects, resPrograms] = await Promise.all([
        this.$repositories.project.getAll({
          "paginator.limit": 100000,
        }),
        this.$repositories.program.getAll({
          "paginator.limit": 100000,
        }),
      ]);

      this.projects = resProjects.body.docs;
      this.programs = resPrograms.body.docs;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      fieldsPick: ["params", "project", "program"],
      projects: [],
      programs: [],
    };
  },

  computed: {
    // paramsErrors() {
    //   return this.vuelidateErrors(this.$v.form.params, "params");
    // },

    projectErrors() {
      return this.vuelidateErrors(this.$v.form.project, "project");
    },

    programErrors() {
      return this.vuelidateErrors(this.$v.form.program, "program");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>