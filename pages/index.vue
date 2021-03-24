<template></template>

<script>
export default {
  middleware({ redirect }) {
    redirect("/dashboard");
  },
};
</script>
