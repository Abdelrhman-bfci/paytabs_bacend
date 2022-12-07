<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" class="text-right">
      <img
        :lazy-src="image(course)"
        :src="image(course)"
        max-height="100%"
        class="image"
      />
      <div style="padding: 14px">
        <span>
          <router-link
            v-if="hasRole('teacher') || hasRole('admin')"
            :to="`/course/${id}`"
          >
            {{ title }}
          </router-link>
          <a v-else>
            {{ title }}
          </a>
        </span>
        <el-row class="pt-2">
          <el-col>
            <!-- <el-rate
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></el-rate> -->
            <!-- <div class="grey--text ms-4">4.5 (413)</div> -->
          </el-col>
          <el-col>
            {{ description }}
          </el-col>
        </el-row>
        <!-- only show for student  -->
        <div class="bottom clearfix d-flex justify-content-end">
          <el-button
            class="mx-2 mb-4"
            @click="$emit('addCourse', id)"
            style="font-size: 15px"
            dark
            medium
            type="success"
            v-if="hasRole('student')"
          >
           {{$t("add_course")}}
          </el-button>
          <!-- <el-button
            class="mx-2 mb-4"
            @click="openDialog(id)"
            style="font-size: 15px"
            dark
            medium
            type="danger"
            v-if="!hasRole('admin') && isLink"
          >
            حذف الدورة
          </el-button> -->

          <el-button
            class="mx-2 mb-2"
            @click="$emit('remove', id)"
            fab
            dark
            small
            type="danger"
            v-if="hasPermission('admin_courses')"
          >
           {{$t("delete")}}
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- <el-dialog :visible.sync="dialog" persistent max-width="55%" width="55%">
      <el-card>
        <el-card-title
          class="text-h5"
          style="font-size: 24px; font-weight: bold"
        >
          إزالة دورة
        </el-card-title>
        <div>
        هل أنت متأكد أنك تريد مسح هذه الدورة ؟
          </div>
        <div dir="ltr" class="dialog-footer  w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto">
          <el-button type="info" class="text-center ml-lg-2 mx-auto d-block w-100 my-1" text @click="dialog = false">
            الغاء
          </el-button>
          <el-button type="primary" class="text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1" text @click="add(id, 2)">تأكيد </el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      title="إزالة دورة"
      :visible.sync="remove_dialog"
      persistent
      max-width="55%"
      width="55%"
      class="text-right"
    >
      <div class="text-center">
        هل أنت متأكد أنك تريد مسح هذه الدورة ؟
      </div>
      <span slot="footer" class="dialog-footer  w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto" dir="ltr">
        <el-button class="text-center ml-lg-2 mx-auto d-block w-100 my-1" type="info" text @click="remove_dialog = false">
          الغاء
        </el-button>
        <el-button class="text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1" type="primary" text @click="remove(id)">
          تأكيد
        </el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: "Ccard",
  props: {
    id: null,
    title: null,
    description: null,
    course: null,
    isLink: true,
  },
  data() {
    return {
      load: false,
      dialog: false,
      image_src:
        "https://media.istockphoto.com/photos/back-view-of-elementary-students-raising-their-arms-on-a-class-picture-id1000887536?k=6&m=1000887536&s=612x612&w=0&h=_766UYb-oBcmrJQfIn5RU6SWLhTVMLszO9JT5USUDQ0=",
      remove_dialog: false,
      id: null,
    };
  },
  methods: {
    // add(id, status) {
    //   this.load = true;
    //   this.$store
    //     .dispatch("courses/add", { id: id, status: status })
    //     .then((_) => {
    //       this.load = false;
    //       this.$emit("refresh");
    //     });
    //   this.dialog = false;
    // },
    image(course) {
      if (course.cover) {
        return `https://edufunz.com/api/courses/cover/${course.cover}`;
      }
      return this.image_src;
    },
    // remove(id) {
    //   this.$emit("remove", id);
    //   this.remove_dialog = false;
    // },
    // openDialog(id) {
    //   this.dialog = true;
    //   this.id = id;
    // },
    // openRemoveDialog(id) {
    //   this.remove_dialog = true;
    //   this.id = id;
    // },
  },
};
</script>

<style scoped>
/* .el-card__body {
      margin: 10px !important;
  } */

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 300px;
  margin: auto;
}

span {
  font-size: 1.2rem;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* delete form style  */

::v-deep .el-form--label-top .el-form-item__label {
  position: relative;
}

::v-deep .el-form-item__label:before {
  position: absolute;
  left: -12px;
}

::v-deep .el-dialog__headerbtn {
  left: 20px;
  right: unset;
}

::v-deep .el-form-item__error {
  left: unset;
  right: 0;
  font-size: 0.9rem;
}
</style>
