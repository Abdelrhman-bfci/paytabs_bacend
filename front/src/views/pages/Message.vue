<template>
  <div class="col text-right">
    <el-card>
      <template #header>
        <i class="fa fa-users fa-3x ml-3"></i>
        <span class="h2"> {{$t("messages")}} </span>
      </template>
      <el-card
        v-for="(notification, i) in $store.getters['user/users']"
        class="mb-4"
      >
        <el-row :gutter="20">
          <el-col :span="24" :md="18" :lg="21">
            <!-- sender name  -->
            <p class="h3">{{ notification.name }}</p>
            <!-- message body  -->
            <p class="text-break">{{ notification.message }}</p>
          </el-col>
          <el-col :span="24" :md="6" :lg="3">
            <!-- sender image  -->
            <img
              alt="Avatar"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              class="img-thumbnail rounded-circle"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "messages",

  mounted() {
    this.$store.dispatch("user/notification");
  },
};
</script>

<style scoped>
</style>
