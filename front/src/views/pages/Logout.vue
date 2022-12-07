<template></template>

<script>
export default {
  name: "logout",
  data: () => ({}),
  created() {
    this.$store.dispatch("user/logout").then((_) => {
      this.$router.push("/login");
    });
  },
  methods: {},
};
</script>

<style scoped>
</style>
