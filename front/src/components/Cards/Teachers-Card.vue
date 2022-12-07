<template>
  <!-- used for teachers  -->
  <div class="text-right card p-2">
    <div class="d-flex">

      <!-- <div
              class="ml-4 rounded-circle overflow-hidden"
              style="width: 10rem; height: 10rem; margin-left: 3rem"
            >
              <img
                :src="image(teacher.image, teacher.gender)"
                :alt="teacher.name"
                style="width: 10rem; height: 10rem"
              />
            </div> -->
      <div v-if="teacher" class="ml-4 rounded-circle overflow-hidden">
        <img
          :src="image"
          :alt="teacher.name"
          style="width: 10rem; height: 10rem"
        />
      </div>

      <div class="flex-grow-1 p-2">
        <router-link
          v-if="teacher"
          :to="`/user-profile/${teacher.id}`"
          class="h3 d-block"
          >{{ teacher.name }}</router-link
        >
        <!-- available  -->
        <!--        <div class="my-2">-->
        <!--          <span class="badge bg-light border border-secondary mx-1 rounded-pill"-->
        <!--            >5:30PM</span-->
        <!--          >-->
        <!--          <span class="badge bg-light border border-secondary mx-1 rounded-pill"-->
        <!--            >7:30PM</span-->
        <!--          >-->
        <!--          <span class="badge bg-light border border-secondary mx-1 rounded-pill"-->
        <!--            >9:30PM</span-->
        <!--          >-->
        <!--          <span class="badge bg-light border border-secondary mx-1 rounded-pill"-->
        <!--            >10:30PM</span-->
        <!--          >-->
        <!--        </div>-->
        <el-rate
          v-model="3.5"
          disabled
          show-score
          text-color="#ff9900"
          score-template=""
          class="my-2"
        >
        </el-rate>
        <div class="d-flex justify-content-end" v-if="teacher">
          <el-button
            v-if="hasRole('admin')"
            :type="teacher.removed ? 'success' : 'danger'"
            @click="
              teacher.removed
                ? activateTeacher(teacher.id)
                : deactivateTeacher(teacher.id)
            "
            style="font-weight: bolder; font-size: 1.2rem"
          >
            {{ teacher.removed ? 'تفعيل' : 'الغاء التفعيل' }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    teacher: null,
  },
  computed: {
    image() {
      if (this.teacher && this.teacher.image) {
        return `https://edufunz.com/api/users/cover/${this.teacher.image}`;
      } else if (this.teacher && this.teacher.gender == 1) {
        return "static/img/avater.png";
      } else {
        return "static/img/avatar-female.png";
      }
    },
  },
  methods: {
    // image(img, gender) {
    //   if (img) {
    //     return `https://edufunz.com/api/users/cover/${img}`;
    //   } else if (gender == 1) {
    //     return "static/img/avater.png";
    //   } else {
    //     return "static/img/female-avater.png";
    //   }
    // },
    // صفحة المدرسين الجدد
    activateTeacher(id) {
      this.$emit("activateTeacher", id);
    },
    deactivateTeacher(id) {
      this.$emit("deactivateTeacher", id);
    },
  },
};
</script>
<style scoped>
::v-deep .profile-image {
  width: 10rem;
  height: 10rem;
  background-position: center center;
  background-size: cover;
}

::v-deep .el-rate__decimal.el-icon-star-on {
  transform: translateX(100%);
}
</style>
