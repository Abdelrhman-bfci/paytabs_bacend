<template>
  <div class="">
 


  <div class="container-login100">
    <div class="wrap-login100 shadow-lg">
      <el-row style="width: 100%">
    <el-col :span="24" :md="9" class="mb-3">
          <div
            class="
              login100-pic
              js-tilt
              d-flex
              justify-content-center
              align-items-center
              flex-column
            "
            data-tilt
          >
            <img src="static/img/vue-logo.jpg" alt="IMG" class="w-100" />
            <h1 class="text-center mb-1 mt-0">مرحبا بكم</h1>
            <p class="text-center h4 m-0">
              مرحبا بكم في دورات تنمية مهارات التفكير الإبداعي أكاديمية " فقط
              لنتعلم "
            </p>
            <el-button type="info" @click="$router.push('/login')">
              تسجيل الدخول
            </el-button>
          </div>
        </el-col> 
        <!-- pick account type  -->
        <div
        
          class="d-flex justify-content-around align-items-center flex-column"
          style="height: 100%"
        >
            
        <el-button
      @click="$router.push('/exam/guests')"
          type="info"
          class="px-4 py-5 m-auto d-block h5 "
        >
     تقارير الطلاب
        </el-button>

            <el-button
      @click="$router.push('/guest-register')"

     
          type="info"
          class="px-5 py-5 m-auto d-block h5 btn btn-primary"
        >
         ادخال اختبار
        </el-button>
        </div>

        
      </el-row>
    </div>
  </div>

  </div>














</template>

<script>
export default {
  data() {
    return {
  
    };
  },
  mounted() {
 
  },
  methods: {

  
  },

  computed: {
 
  }
};
</script>


<style scoped>
.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: url("/static/img/full-screen-image-4.jpg") no-repeat center;
  background-size: cover;
}

.wrap-login100 {
  width: 960px;
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 20px;
}
/*
::v-deep .el-tabs__nav {
  float: right;
}

::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #909399;
  font-size: 1.2rem;
  font-weight: bold;
} */

/* required star style  */
::v-deep .el-form--label-top .el-form-item__label {
  position: relative;
}

::v-deep .el-form-item__label:before {
  position: absolute;
  left: -12px;
}

::v-deep
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #909399;
}

::v-deep .el-form-item__label {
  font-size: 1.2rem;
}

/* radio input style  */
::v-deep .el-radio {
  margin-left: 30px;
  margin-right: 0;
}

::v-deep .el-radio__input {
  margin-left: 10px;
}

::v-deep .el-radio--medium.is-bordered .el-radio__label {
  font-size: 1.2rem;
}

::v-deep .el-radio--medium.is-bordered {
  height: 45px;
}

::v-deep .el-form-item__error {
  left: unset;
  right: 0;
  font-size: 0.9rem;
}

::v-deep .el-input-group__prepend {
  border-left: 0;
  border-right: 1px solid #dcdfe6;
  width: 5rem;
}

/* form select inputs  */
.el-select-dropdown__item {
  padding: 5px 40px;
  text-align: right;
}

/* checkbox style  */
::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
  border: 2px solid #bfbfbf;
}
::v-deep .el-checkbox__inner::after {
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 9px;
  left: 5px;
  width: 4px;
}
</style>
