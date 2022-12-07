<template>
  <div class="container-login100">
    <div class="wrap-login100 shadow-lg p-4">
      <el-row style="width: 100%">
        <!-- Brand Logo -->
        <el-col :span="24" :md="9" class="mb-3">
          <div
            class="
              login100-pic
              js-tilt
              d-flex
              justify-content-center
              align-items-center
              mb-5
            "
            data-tilt
            style="position: relative; top: 50px"
          >
            <img src="@/assets/images/vue-logo.jpg" alt="IMG" class="w-100" />
          </div>
        </el-col>
        <!-- Resetpassword Form  -->
        <el-col :span="24" :md="15" class="mb-3">
          <fade-render-transition :duration="500">
            <el-form
              v-model="resetPassword"
              :model="resetPassword"
              ref="resetPassRef"
              :rules="resetPassRules"
              style="width: 95%; text-align: right"
              @submit.prevent="submit"
            >
              <div class="mb-2">
                <h2 class="card-title text-center mb-3">
                  ادخل كلمة المرور الجديدة
                </h2>
              </div>
              <el-form-item
                prop="password"
                style="width: 100%; margin-bottom: 2.5rem"
                class="position-relative"
              >
                <!-- Show Password Icon  -->
                <i
                  v-if="passwordType == 'password'"
                  class="
                    fa fa-eye
                    position-absolute
                    togglePassword
                    text-secondary
                  "
                  @click="toggleShowPassword"
                  v-tooltip.top-center="'اظهار كلمة المرور'"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="passwordType == 'text'"
                  class="
                    fa fa-eye-slash
                    position-absolute
                    togglePassword
                    text-secondary
                  "
                  @click="toggleShowPassword"
                  v-tooltip.top-center="'اخفاء كلمة المرور'"
                  aria-hidden="true"
                ></i>
                <el-input
                  :type="passwordType"
                  v-model="resetPassword.password"
                  placeholder="كلمة المرور"
                  style="width: 100%"
                >
                  <template slot="prepend">
                    <i class="fa fa-lock text-danger fa-2x" aria-hidden="true">
                    </i> </template
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="confirmPassword"
                style="width: 100%; margin-bottom: 2.5rem"
                class="position-relative"
              >
                <i
                  v-if="confirmPasswordType == 'password'"
                  class="
                    fa fa-eye
                    position-absolute
                    togglePassword
                    text-secondary
                  "
                  @click="toggleShowConfirmPassword"
                  v-tooltip.top-center="'اظهار كلمة المرور'"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="confirmPasswordType == 'text'"
                  class="
                    fa fa-eye-slash
                    position-absolute
                    togglePassword
                    text-secondary
                  "
                  @click="toggleShowConfirmPassword"
                  v-tooltip.top-center="'اخفاء كلمة المرور'"
                  aria-hidden="true"
                ></i>
                <el-input
                  :type="confirmPasswordType"
                  v-model="resetPassword.confirmPassword"
                  placeholder="تأكيد كلمة المرور"
                  style="width: 100%"
                >
                  <template slot="prepend">
                    <i class="fa fa-lock text-danger fa-2x" aria-hidden="true">
                    </i>
                  </template>
                </el-input>
              </el-form-item>

              <div style="width: 100%" class="mb-3 mt-3">
                <el-button
                  @click="submit"
                  type="info"
                  class="pl-5 pr-5 m-auto d-block"
                >
                  ارسال
                </el-button>
              </div>
            </el-form>
          </fade-render-transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { FadeRenderTransition } from "src/components/index";
import Swal from "sweetalert2";
import Button from "../../../components/Button.vue";

export default {
  name: "ResetPassword",
  data() {
    return {
      passwordType: "password",
      confirmPasswordType: "password",
      resetPassword: {},
      resetPassRules: {
        password: [
          {
            required: true,
            message: "يجب ادخال كلمة المرور",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "يجب ادخال كلمة المرور متطابقة",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    FadeRenderTransition,
    Button,
  },
  mounted() {
    // window.addEventListener("keypress", (e) => {
    //   if (e.key == "Enter") {
    //     this.submit();
    //   }
    // });
  },
  methods: {
    toggleShowPassword() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    toggleShowConfirmPassword() {
      this.confirmPasswordType =
        this.confirmPasswordType == "password" ? "text" : "password";
    },
    submit() {
      this.$refs["resetPassRef"].validate((valid) => {
        if (valid) {
          //  If passwords does not match
          if (
            this.resetPassword.password !== this.resetPassword.confirmPassword
          ) {
            Swal.fire({
              icon: "error",
              text: "كلمتي المرور غير متطابقتان",
              confirmButtonClass: "btn btn-info btn-fill",
              showConfirmButton: false,
              showCloseButton: true,
            });
          } else {
            // call reset password on store
            this.$store.dispatch("user/resetPassword", {
              password: this.resetPassword.password,
              confirm_password: this.resetPassword.confirmPassword,
              token: this.$route.params.token,
            });
            // only redirect to login if enter 2 matching passwords
            this.$router.push("/login");
          }
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
