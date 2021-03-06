function loadVuelidateErrors(field, name) {
  const errors = [];

  const { $dirty, required } = field;

  if (!$dirty) return errors;

  !required && errors.push(this.$t(`validations.${name}.required`));

  return errors;
}

export default loadVuelidateErrors;
