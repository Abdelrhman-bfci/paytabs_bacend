<template>
  <div class="container-login100">
    <div class="wrap-login100 shadow-lg p-4">
      <el-row style="width: 100%" v-loading="$store.getters['user/usersLoad']">
        <el-col :span="24" :lg="15">
          <fade-render-transition
            :duration="500"
            class="d-flex justify-content-center flex-column"
            style="width: 100%"
          >
            <!-- Login Form  -->
            <el-form
              :model="login"
              style="width: 95%"
              v-if="!forgot"
              @submit.prevent="submit"
            >
              <div class="mb-2">
                <h2 class="card-title text-center mb-3">
                  تسجيل الدخول فقط لنتعلم
                </h2>
              </div>

              <!-- Enter Mail Input  -->
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    type: 'email',
                    message: 'يجب ادخال البريد الالكتروني',
                    trigger: ['blur', 'change'],
                  },
                ]"
                style="width: 100%; text-align: right"
                class="mb-5"
              >
                <el-input
                  type="email"
                  v-model="login.email"
                  placeholder="البريد الالكتروني"
                  style="width: 100%"
                >
                  <template slot="prepend"
                    ><i
                      class="fa fa-envelope text-danger fa-2x"
                      aria-hidden="true"
                    ></i></template
                ></el-input>
              </el-form-item>
              <!-- Enter Password Input -->
              <el-form-item
                prop="password"
                :rules="[
                  {
                    required: true,
                    message: 'يجب ادخال كلمة السر',
                    trigger: 'blur',
                  },
                ]"
                style="width: 100%; text-align: right"
                class="position-relative"
              >
                <i
                  v-if="passwordType == 'password'"
                  class="
                    fa fa-eye
                    position-absolute
                    togglePassword
                    text-secondary
                  "
                  @click="toggleShowPassword"
                  aria-hidden="true"
                  v-tooltip.top-center="'اظهار كلمة المرور'"
                ></i>
                <i
                  v-if="passwordType == 'text'"
                  class="
                    fa fa-eye-slash
                    position-absolute
                    togglePassword
                    text-secondary
                    curoser
                  "
                  v-tooltip.top-center="'اخفاء كلمة المرور'"
                  @click="toggleShowPassword"
                  aria-hidden="true"
                ></i>
                <el-input
                  :type="passwordType"
                  v-model="login.password"
                  placeholder="كلمة السر"
                  style="width: 100%"
                >
                  <template slot="prepend"
                    ><i
                      class="fa fa-lock text-danger fa-2x"
                      aria-hidden="true"
                    ></i
                  ></template>
                </el-input>
              </el-form-item>

              <div style="width: 100%" class="mb-3 mt-3">
                <el-button
                  @click="submit"
                  type="info"
                  class="pl-5 pr-5 m-auto d-block h5"
                >
                  تسجيل دخول
                </el-button>
              </div>
              <!-- Forgot password button  -->
              <div class="text-center mb-2 h4">
                <a class="txt2" href="#" @click="forgot = true">
                  هل نسيت كلمة المرور؟
                </a>
              </div>
              <!-- Create new account button  -->
              <div class="text-center pb-3 mb-2">
                <a
                  class="txt2 text-info h4"
                  style="cursor: pointer"
                  @click="$router.push('/register')"
                >
                  إنشاء حساب جديد
                  <i class="fa fa-long-arrow-left m-l-5" aria-hidden="true"></i>
                </a>
              </div>
            </el-form>

            <!-- reset password email  -->
            <el-form
              :model="reset"
              :rules="resetRules"
              @submit.prevent="sendResetMail"
              style="width: 95%"
              ref="resetRef"
              v-else
            >
              <div class="mb-5">
                <h2 class="card-title text-center mb-3">
                  اعادة ضبط كلمة المرور
                </h2>
              </div>

              <el-form-item
                prop="email"
                class="mb-5"
                style="width: 100%; text-align: right"
              >
                <el-input
                  type="email"
                  v-model="reset.email"
                  @keyup.enter.native="sendResetMail"
                  placeholder="البريد الالكتروني"
                  style="width: 100%"
                >
                  <template slot="prepend"
                    ><i
                      class="fa fa-envelope text-danger fa-2x"
                      aria-hidden="true"
                    ></i></template
                ></el-input>
              </el-form-item>

              <div
                class="
                  w-50
                  flex-column flex-lg-row
                  d-md-flex
                  my-3
                  ml-auto
                  justify-content-between
                "
              >
                <el-button
                  @click="forgot = false"
                  type="info"
                  class="text-center ml-lg-2 mx-auto d-block w-100 my-1 h5"
                >
                  العودة لتسجيل الدخول
                </el-button>
                <el-button
                  @click="sendResetMail"
                  type="info"
                  class="
                    text-center
                    px-4 px-lg-3
                    ml-lg-2
                    mx-auto
                    d-block
                    w-100
                    my-1
                    h5
                  "
                >
                  إرسال
                </el-button>
              </div>
              <!-- Create new account button  -->
              <div class="text-center pb-3 mb-2 h4">
                <a
                  class="txt2 text-info"
                  style="cursor: pointer"
                  @click="$router.push('/register')"
                >
                  إنشاء حساب جديد
                  <i class="fa fa-long-arrow-left m-l-5" aria-hidden="true"></i>
                </a>
              </div>
            </el-form>
          </fade-render-transition>
        </el-col>
        <!-- Brand Logo -->
        <el-col :span="24" :lg="9">
          <div
            class="
              login100-pic
              js-tilt
              d-flex
              justify-content-center
              align-items-center
              mb-5
              flex-column
            "
            data-tilt
            style="position: relative"
          >
            <img src="static/img/vue-logo.jpg" alt="IMG" class="w-100" />

            <h1 class="text-center mb-1">مرحبا بكم</h1>
            <p class="text-center h4 m-0">
              مرحبا بكم في دورات تنمية مهارات التفكير الإبداعي أكاديمية " فقط
              لنتعلم "
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { FadeRenderTransition } from "src/components/index";
import Swal from "sweetalert2";

export default {
  name: "login",
  data() {
    return {
      forgot: false,
      passwordType: "password",
      login: {},
      datePickerOptions: {
        disabledDate(date) {
          return date < new Date();
        },
      },
      reset: {},
      resetRules: {
        email: [
          {
            required: true,
            message: "يجب ادخال البريد الالكتروني",
            trigger: "blur",
          },
        ],
      },
    };
  },

  components: {
    FadeRenderTransition,
  },
  methods: {
    toggleShowPassword() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    submit() {
      if (this.login.email && this.login.password) {
        this.$store.dispatch("user/login", this.login).then((_) => {
          this.$router.push("/");
        });
      }
    },
    sendResetMail() {
      this.$refs["resetRef"].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/forgotPassword", {
              email: this.reset.email,
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title:
                  "تم إرسال بريد إعادة ضبط كلمة السر إلى البريد الإلكتروني الخاص بك. برجاء مراجعة البريد الإلكتروني الخاص بك ",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 4000,
              });
            });
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
  padding: 20px 50px 20px 50px;
}

.togglePassword {
  z-index: 5;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  cursor: pointer;
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
</style>
