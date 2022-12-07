<template>
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
          v-if="register.type == null"
          class="d-flex justify-content-around align-items-center flex-column"
          style="height: 100%"
        >
          <el-button type="primary" @click="register.type = 0" class="h2 p-4"
            >حساب أسرة</el-button
          >
          <el-button type="primary" @click="register.type = 1" class="h2 p-4"
            >حساب معلم</el-button
          >
        </div>

        <el-col :span="24" :md="15" class="mb-3">
          <!-- <fade-render-transition :duration="500"> -->
          <!-- Registration Form  -->
          <div v-loading="$store.getters['user/usersLoad']">
            <!-- sign up as a family  -->

            <el-form
              v-if="register.type == 0"
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
                      :rules="[
                        {
                          required: true,
                          message: 'يجب اختيار النوع',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 1rem"
                    >
                      <el-radio-group v-model="register.gender">
                        <el-radio :label="2" @click="register.gender = 2" >ام</el-radio>
                        <el-radio :label="1" @click="register.gender = 1">اب</el-radio>
                        <el-radio :label="0">غير ذلك</el-radio>
                      </el-radio-group>
                      
                    </el-form-item>
                  </el-col>
                  <!-- Parent Name  -->
                  <el-col>
                    <el-form-item
                      prop="name"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال اسم',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="text"
                        v-model="register.name"
                        style="width: 100%"
                        :placeholder="
                          register.type == 1 ? 'الأسم' : 'اسم ولي الأمر'
                        "
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-user text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Email  -->
                  <el-col>
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
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="email"
                        v-model="register.email"
                        style="width: 100%"
                        placeholder="البريد الالكتروني"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-envelope text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Email  -->
                  <el-col>
                    <el-form-item
                      prop="confirm_email"
                      :rules="[
                        {
                          required: true,
                          type: 'email',
                          message: 'يجب ادخال البريد الالكتروني',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="email"
                        v-model="register.confirm_email"
                        style="width: 100%"
                        placeholder="تأكيد البريد الالكتروني"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-envelope text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- country  -->


   <el-col>
                    <el-form-item
                    v-if="this.showCountry2 == true"
                      prop="confirm_country"
              
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="text"
                        v-model="register.country"
                        style="width: 100%"
                        placeholder="  ادخال البلد"
                        @change="changeCountry(register.country)"
                      >
                             <template slot="prepend"
                          ><i
                            class="fa fa-flag text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
              
                    </el-form-item>
                  
                  </el-col>

<!-- 
                  <el-col>
  <el-form-item>

        <el-input
v-if="this.showCountry2 == true"
                        type="text"

                        v-model="register.country"
                    
                        placeholder=" ادخل بلد اخرى"
                      ></el-input>

</el-form-item>



</el-col> -->


<!--------------------------------------------------------->
                  <el-col>
                  
                    <el-form-item
                      prop="country"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال البلد',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.country"
                        @change="changeCountry(register.country)"
                        clearable
                        placeholder="البلد"
                        style="width: 100%"
                        v-if="this.showCountry1 == true"
                      >
                        <el-option
                          v-for="(item, index) in countries"
                          :key="index"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

















                  <!-- Password  -->
                  <el-col>
                    <el-form-item
                      prop="password"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال كلمة المرور',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="password"
                        v-model="register.password"
                        style="width: 100%"
                        placeholder="كلمة المرور"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-lock text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Confirm Password  -->
                  <el-col>
                    <el-form-item
                      prop="confirm_password"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال كلمة المرور',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="password"
                        v-model="register.confirm_password"
                        style="width: 100%"
                        placeholder="تأكيد كلمة المرور"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-lock text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-container>
              <!-- Action Buttons  -->
              <div class="my-3 d-flex justify-content-center">
                <el-button type="success" @click="signUp">
                  انشاء حساب
                </el-button>
              </div>
            </el-form>

            <!-- sign up as a teacher  -->
            <el-form
              v-if="register.type == 1"
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
                      :rules="[
                        {
                          required: true,
                          message: 'يجب اختيار النوع',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 1rem"
                    >
                      <el-radio-group v-model="register.gender">
                        <el-radio :label="0">معلم</el-radio>
                        <el-radio :label="1">معلمة</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <!-- teacher Name  -->
                  <el-col>
                    <el-form-item
                      prop="name"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال اسم',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="text"
                        v-model="register.name"
                        style="width: 100%"
                        :placeholder="
                          register.type == 1 ? 'الأسم' : 'اسم ولي الأمر'
                        "
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-user text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Email  -->
                  <el-col>
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
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="email"
                        v-model="register.email"
                        style="width: 100%"
                        placeholder="البريد الالكتروني"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-envelope text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Email  -->
                  <el-col>

                    <el-form-item
                      prop="confirm_email"
                      :rules="[
                        {
                          required: true,
                          type: 'email',
                          message: 'يجب ادخال البريد الالكتروني',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="email"
                        v-model="register.confirm_email"
                        style="width: 100%"
                        placeholder="تأكيد البريد الالكتروني"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-envelope text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- country  -->
                  <el-col>

                    <el-form-item
                      prop="country"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال البلد',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.country"
                        clearable
                        placeholder="البلد"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in countries"
                          :key="index"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>



                    </el-form-item>
                  </el-col>

            <!---- countryyy ---->



















                  <!-- Password  -->
                  <el-col>
                    <el-form-item
                      prop="password"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال كلمة المرور',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="password"
                        v-model="register.password"
                        style="width: 100%"
                        placeholder="كلمة المرور"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-lock text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- Confirm Password  -->
                  <el-col>
                    <el-form-item
                      prop="confirm_password"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال كلمة المرور',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="password"
                        v-model="register.confirm_password"
                        style="width: 100%"
                        placeholder="تأكيد كلمة المرور"
                      >
                        <template slot="prepend"
                          ><i
                            class="fa fa-lock text-danger fa-2x"
                            aria-hidden="true"
                          ></i></template
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <!-- highest_degree  -->
                  <el-col>
                    <el-form-item
                      prop="degree"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال أعلى درجة علمية',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.degree"
                        clearable
                        placeholder="أعلى درجة علمية حصلت عليها"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in degrees"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- major  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="major"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال اسم القسم',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="text"
                        v-model="register.major"
                        style="width: 100%"
                        placeholder="القسم"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <!-- faculty  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="faculty"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال اسم الكلية',
                          trigger: 'blur',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-input
                        type="text"
                        v-model="register.faculty"
                        style="width: 100%"
                        placeholder="الكلية"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <!-- specialization  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="specialization"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال التخصص',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.specialization"
                        clearable
                        placeholder="التخصص"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in specializations"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- Grade -->
                  <el-col :span="12">
                    <el-form-item
                      prop="grade"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال المرحلة',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.grade"
                        clearable
                        placeholder="المرحلة"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in grades"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <!-- employment status  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="employment"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال عدد حالة العمل',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.employment"
                        clearable
                        placeholder="حالة العمل"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in employStatus"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- Experience  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="experience"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال عدد سنوات الخبرة',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.experience"
                        clearable
                        placeholder="عدد سنوات الخبرة"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in yearsOfExp"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <!-- available hours  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="available_hours"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال عدد عدد ساعات العمل المتاحة',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.available_hours"
                        clearable
                        placeholder="عدد ساعات العمل المتاحة"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in available_hours"
                          :key="index"
                          :label="item.label"
                          :value="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- employment place  -->
                  <el-col :span="12">
                    <el-form-item
                      prop="employment_place"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب ادخال عدد حالة العمل',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-select
                        v-model="register.employment_place"
                        clearable
                        placeholder="حالة العمل"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in employment_placeOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item
                      prop="agreement"
                      :rules="[
                        {
                          required: true,
                          message: 'يجب الموافقة على الشروط',
                          trigger: 'change',
                        },
                      ]"
                      style="width: 100%; margin-bottom: 2.5rem"
                    >
                      <el-checkbox v-model="register.agreement"></el-checkbox>
                      <p class="text-wrap d-inline p-3">
                        اتعهد بالالتزام بآداب التدريس والحفاظ على خصوصية الأطفال
                        وبيانتهم، وتنفيذ التدريب وفق الجدول الذي سأقوم بوضعه،
                        والتواصل مع الأطفال وأولياء الأمور والقائمين على المنصة
                        بإسلوب راق يخلو من الإساءة أو التنمر أو التمييز على أساس
                        عرقي أو ديني أو اجتماعي أو ثقافي، وتنفيذ كل ما هو في
                        مصلحة الطفل ومصلحة العمل، وفي حال عدم الالتزام بما سبق،
                        أو عدم تقديم مبرر لما قد يكون اخلالا للاتفاق، يحق للمنصة
                        حذف حسابي دون الرجوع إليّ ولا يحق لي المطالبة بأي حقوق
                        تترتب على ذلك.
                      </p>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-container>
              <!-- Action Buttons  -->
              <div class="my-3 d-flex justify-content-center">
                <el-button
                  type="success"
                  @click="signUp"
                  :disabled="!register.agreement"
                >
                  انشاء حساب
                </el-button>
              </div>
            </el-form>
          </div>
          <!-- </fade-render-transition> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { FadeRenderTransition } from "src/components/index";
// import VueRecaptcha from "vue-recaptcha";
export default {
  name: "login",
  data() {
    return {
          showCountry1: true,
        showCountry2 : false,
      register: {
        type: null,
        gender:null
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
  mounted() {},
  methods: {
    signUp() {
      this.$refs["registerRef"].validate((valid) => {
        // delete confirm_email since it is not needed for the database and causes error
        delete this.register.confirm_email;
        delete this.register.agreement;
        if (valid) {
          this.$store
            .dispatch("user/register", {
              query: { ...this.register },
            })
            .then(() => this.$router.push("/profile"));
        } else {
          console.log("error submitting");
          return false;
        }
      });
    },
    changeCountry(country)
    {
      if ( country == 'غير ذلك')
      {

        this.showCountry1 = false;
        this.showCountry2 = true;
        console.log(   this.showCountry1   ,   this.showCountry2  );
      }    



    },
    changeCountry2(country)
    {


if (country == null || country == '')
{
      this.showCountry1 == true;
        this.showCountry2 == false;
}
    }
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
