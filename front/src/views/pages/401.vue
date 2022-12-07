<template>
  <v-container class="fill-heigh d-flex align-items-center justify-content-center" id="user-profile" fluid tag="section">
    <div class="row fill-heigh d-flex align-items-center justify-content-center">
      <div class="img-container text-center">
        <img src="@/assets/401.png" alt="">
        <v-btn class="mt-5" rounded color="teal" dark to="/">Home</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>

  export default {
    name: 'Page401',
  };
</script>

<style scoped>
  img{
    width: 100%;
    height: auto !important;
  }
  .fill-heigh{
    height: 100%;
  }
  .img-container {
    margin: auto;
  }
</style>
