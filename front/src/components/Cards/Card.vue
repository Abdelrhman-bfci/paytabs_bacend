<template>
  <div class="card" :style="`height: ${height}`">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-category">{{ subTitle }}</p>
      </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <hr />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    title: String,
    subTitle: String,
    height: String,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    image(img, gender) {
      if (img) {
        return `https://edufunz.com/api/users/cover/${img}`;
      } else if (gender == 1) {
        return "static/img/avater.png";
      } else {
        return "static/img/female-avater.png";
      }
    },
    // صفحة المدرسين الجدد
    activate(id) {
      this.$emit("activateTeacher", id);
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
