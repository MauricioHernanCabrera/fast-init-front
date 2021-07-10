function loadVuelidateErrors(field, name) {
  const errors = [];

  const { $dirty, required } = field;

  if (!$dirty) return errors;

  !required && errors.push(this.$t(`validations.required`));

  return errors;
}

export default loadVuelidateErrors;
