<template>
  <div class="container-login100">
    <div class="wrap-login100 shadow-lg">
      <el-row style="width: 100%">

        <!-- pick account type  -->

        <el-col :span="24" :md="15" class="mb-3">
          <!-- <fade-render-transition :duration="500"> -->
          <!-- Registration Form  -->
          <div v-loading="$store.getters['user/usersLoad']">
            <!-- sign up as a family  -->

            <el-form

              :model="register"
              ref="registerRef"
              label-position="top"
              @submit.prevent="signUp"
              style="text-align: right"
            >
              <el-container>

                <el-row :gutter="40">
                  <!-- gender -->
                  <el-col>

                    <el-form-item
                      prop="gender"
                      label="النوع"
                      style="width: 100%; margin-bottom: 1rem"
                    >
                      <el-radio-group v-model="register.gender">
                        <el-radio :label="2" @click="register.gender = 2">انثى</el-radio>
                        <el-radio :label="1" @click="register.gender = 1">ذكر</el-radio>

                      </el-radio-group>

                    </el-form-item>
                  </el-col>
                  <!-- Parent Name  -->
                  <el-col>
                    <el-form-item
                      prop="name"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <label>الاسم</label>
                      <el-input
                        type="text"
                        v-model="register.name"
                        style="width: 100%"
                        placeholder="الاسم"
                      >
                        <template slot="prepend"
                        ><i
                          class="fa fa-user text-danger fa-2x"
                          aria-hidden="true"
                        ></i></template
                        >
                      </el-input>
                    </el-form-item>
                  </el-col>


                  <el-col>
                    <el-form-item

                      prop="confirm_country"

                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <label> البلد</label>
                      <el-input
                        type="text"
                        v-model="register.country"
                        style="width: 100%"
                        placeholder="  ادخال البلد"

                      >
                        <template slot="prepend"
                        ><i
                          class="fa fa-flag text-danger fa-2x"
                          aria-hidden="true"
                        ></i></template
                        >
                      </el-input>

                    </el-form-item>

                  </el-col>
                  <el-col>
                    <el-form-item

                      prop="confirm_country"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <!--                      <p>-->
                      <i class='fa fa-child '></i>
                      السن :
                      <el-select
                        style="width: 100%;"
                        class="sel"
                        v-model="register.age_group"
                        clearable
                        placeholder="Select"
                      >
                        <el-option
                          v-for="option in this.age_group"
                          :value="option.value"
                          :key="option.value"
                          :label="option.type"
                        />
                      </el-select>
                    </el-form-item>

                  </el-col>

                  <el-col>
                    <el-form-item
                      prop="email"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <label>البريد الالكترونى</label>
                      <el-input
                        type="text"
                        v-model="register.email"
                        style="width: 100%"
                        placeholder="البريد الالكترونى"
                      >
                        <template slot="prepend"
                        ><i
                          class="fa fa-envelope text-danger fa-2x"
                          aria-hidden="true"
                        ></i></template
                        ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item
                      prop="academic_number"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <label>الرقم الاكاديمى</label>
                      <el-input
                        type="text"
                        v-model="register.academic_number"
                        style="width: 100%"
                        placeholder="الرقم الاكاديمى"
                      >
                        <template slot="prepend"
                        ><i
                          class="fa fa-star text-danger fa-2x"
                          aria-hidden="true"
                        ></i></template
                        ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item

                      prop="mobile_no"

                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <label> رقم الهاتف</label>
                      <el-input
                        type="text"
                        v-model="register.mobile_no"
                        style="width: 100%"
                        placeholder="  ادخال رقم الهاتف"

                      >
                        <template slot="prepend"
                        ><i
                          class="fa fa-flag text-danger fa-2x"
                          aria-hidden="true"
                        ></i></template
                        >
                      </el-input>

                    </el-form-item>

                  </el-col>


                </el-row>
              </el-container>
              <!-- Action Buttons  -->
              <div class="my-3 d-flex justify-content-center">
                <el-button type="success" @click="signUp">
                  بدأ الاختبار
                </el-button>
              </div>
            </el-form>

            <!-- sign up as a teacher  -->

          </div>
          <!-- </fade-render-transition> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {FadeRenderTransition} from "src/components/index";
  // import VueRecaptcha from "vue-recaptcha";
  export default {
    name: "login",
    data() {
      return {
        showCountry1: true,
        showCountry2: false,
        age_group: [
          {value: 1, type: this.$t("less_than_6")},
          {value: 2, type: this.$t("from_6_to_8")},
          {value: 3, type: this.$t("from_9_to_12")},
          {value: 4, type: this.$t("more_than_13")},
          {value: 5, type: this.$t("all_ages")},
        ],
        register: {
          type: null,
          gender: null,
          age_group: null
        },
        countries: [
          "مصر",
          "السعودية",
          "العراق",
          "الأردن",
          "فلسطين",
          "الجزائر",
          "سوريا",
          "الإمارات العربية",
          "ألمانيا",
          "فرنسا",
          "الولايات المتحدة",
          "إنجلترا",
          "غير ذلك"
        ],
        // teacher registration data
        grades: [
          {
            val: "0",
            label: "ما قبل الدراسة",
          },
          {
            val: "1",
            label: "رياض الأطفال",
          },
          {
            val: "2",
            label: "ابتدائي",
          },
          {
            val: "3",
            label: "إعدادي",
          },
          {
            val: "4",
            label: "ثانوي ",
          },
          {
            val: "5",
            label: "تعليم كبار",
          },
        ],
        specializations: [
          {
            val: "0",
            label: "فنون",
          },
          {
            val: "1",
            label: "الحاسب اللآلي",
          },
          {
            val: "2",
            label: "علم النفس",
          },
          {
            val: "3",
            label: "تنمية مهارات",
          },
          {
            val: "4",
            label: "رياضيات",
          },
          {
            val: "5",
            label: "غير ذلك",
          },
        ],
        yearsOfExp: [
          {
            val: "0",
            label: "سنة فأقل",
          },
          {
            val: "1",
            label: "سنتان",
          },
          {
            val: "2",
            label: "3 سنوات",
          },
          {
            val: "3",
            label: "4 سنوات",
          },
          {
            val: "4",
            label: "5 إلى 10 سنوات",
          },
          {
            val: "5",
            label: "10 سنوات فأكثر",
          },
        ],
        degrees: [
          {
            val: "0",
            label: "بكالوريوس",
          },
          {
            val: "1",
            label: "ماجستير",
          },
          {
            val: "2",
            label: "دكتوراه",
          },
        ],
        employStatus: [
          {
            val: "0",
            label: "أعمل حاليًا بدوام كامل",
          },
          {
            val: "1",
            label: "أعمل لبعض الوقت",
          },
          {
            val: "2",
            label: "متفرغ تماما",
          },
        ],
        employment_placeOptions: [
          {
            val: "0",
            label: "مدرسة",
          },
          {
            val: "1",
            label: "جامعة",
          },
          {
            val: "2",
            label: "مركز تدريب",
          },
          {
            val: "3",
            label: "مدرب حر",
          },
          {
            val: "4",
            label: "أعمل خارج قطاع التدريب والتدريس",
          },
        ],
        available_hours: [
          {
            label: "4",
          },
          {
            label: "8",
          },
          {
            label: "12",
          },
          {
            label: "16",
          },
          {
            label: "20",
          },
        ],
      };
    },
    components: {
      FadeRenderTransition,
      // VueRecaptcha,
    },
    mounted() {
    },
    methods: {

      setAgeGroup(age_group) {
        if (age_group == 5) {
          delete this.selected_filters.age_group;
        } else {
          Object.assign(this.selected_filters, {age_group: age_group});
        }
      },
      signUp() {
        this.$refs["registerRef"].validate((valid) => {

          if (valid) {
            this.register.type = 3;
            this.$store
              .dispatch("user/register", {
                query: {...this.register},
              })
              .then(response =>

                this.$router.push(`start-exam/1/${response.user.id}`));


          } else {
            console.log("error submitting");
            return false;
          }
        });
      },


    },
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
