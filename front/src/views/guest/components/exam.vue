<template>
  <div class="col">
    <el-card>
      <div class="container">
        <div class="text-right">
          <div class="py-4">
            <div class="row">
              <div class="col-12" v-if="active === 0">
                <p>
                  عزيزي ولي الأمر، قم بتصوير ورقة الاختبار الأول (الدوائر) تحت
                  إضاءة جيدة وبشكل رأسي وتجنب وجود ظلال ... كما تأكد من أن كل
                  دائرة مرسومة لها اسم. قم باختيارالأشكال التي قام الطفل برسمها
                  من خلال القائمة التالية في حال وجود أشكال قام الطفل برسمها ولم
                  تجدها في الخيارات التالية أرجو إضافتهم أسفل القائمة - في حال
                  رسم الطفل أكثر من شكل (مثلا أربع أوجه) لا تعيد كتابته أو
                  تكراره بل اكتفي بخيار أو أسم واحد فقط
                </p>
              </div>
              <div class="col-12" v-if="active === 1">
                <p>
                  عزيزي ولي الأمر، قم باختيارالأشكال التي قام الطفل برسمها من
                  خلال القائمة الموجودة تحت كل شكل. في حال وجود أشكال قام الطفل
                  برسمها ولم تجدها في الخيارات، أرجو إضافتهم في الجزء المخصص تحت
                  خيارات كل شكل.
                </p>
              </div>
              <div class="col-12" v-if="active === 2">
                <p>
                  عزيزي ولي الأمر، قم باختيار الشكل الذي قام الطفل برسمه من خلال
                  المجموعة التالية، في حال قيام الطفل بتحويل الشكل إلى رسمة غير
                  متواجدة في الخيارات، أرجو إضافته في الجزء المخصص له أسفل
                  الخيارات. كما يجب وضع اسم للقصة كما قام الطفل باختياها
                </p>
              </div>
            </div>

            <el-steps
              direction="horizontal"
              :active="active"
              finish-status="success"
            >
              <el-step
                :title="'الأختبار ' + index"
                v-for="(exam, index) in allExams"
                :key="index"
              ></el-step>
            </el-steps>
          </div>
          <div class="card  p-md-5">
            <!-- //? Start First Exam  -->
            <el-form v-if="active === 0" :model="payload" ref="firstExam">
              <div class="image_upload d-flex mb-5">
                <div class="d-flex justify-content-between w-100 image-wrapper">
                  <label
                    class="custom-file-upload  d-block text-white text-center pt-3 px-2"
                    style="height:50px"
                  >
                    <input
                      type="file"
                      name="image"
                      @input="selectImgFile"
                      ref="fileInput"
                      accept="image/*"
                    />
                    رفع الصورة
                  </label>

                  <div>
                    <img
                      :src="filePreview"
                      alt=""
                      ref="myimg"
                      id="im"
                      style="width: 100% ; max-width : 700px;"
                    />
                  </div>
                </div>
              </div>

              <hr />
              <div class="question my-5">
                <div
                  class="card p-4 shadow"
                  v-for="(examData, index) in firstExam"
                  :key="index"
                >
                  <h5 class="font-weight-bold">
                    {{ $t(`${examData.key}`) }}
                  </h5>
                  <hr />

                  <el-checkbox-group v-model="payload.answer">
                    <div class="row">
                      <div
                        class="col-md-4"
                        v-for="(option, index) in examData.key_value"
                        :key="index"
                      >
                        <el-checkbox
                          :label="$t(`${option}`)"
                          v-bind:disabled="disabled && required"
                          name="type"
                        ></el-checkbox>
                      </div>
                    </div>
                  </el-checkbox-group>
                  <hr />
                  <div class="row">
                    <div class="col-md-6">
                      <p>

                        أكتب هنا أي أشكال أخرى قام الطفل برسمها ولم تجدها في
                        المجموعات السابقة مع وضع (-) بين الكلمات
                        ولا تقم بكتابة أسماء الأشكال المكررة
                      </p>
                      <el-select
                        class="multii"
                        v-model="value"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="اكتب هنا"
                        @change="prints(value)"
                      >
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="submit mt-5">
                <el-button
                  v-bind:disabled="disabled"
                  type="primary"
                  style="margin-top: 12px;"
                  @click="firstExamFun()"
                  :class="{
                    'is-disabled': check_answer_for_disabled == ''
                  }"
                >
                  الأختبار التالى</el-button
                >
              </div>
            </el-form>
            <!-- //? End First Exam  -->

            <!-- //? Start Second Exam  -->
            <el-form v-if="active === 1" :model="payload" ref="secondExam">
              <div class="image_upload d-flex mb-5">
                <div class="d-flex justify-content-between w-100 image-wrapper">
                  <label
                    class="custom-file-upload  d-block text-white text-center pt-3 px-2"
                    style="height:50px"
                  >
                    <input
                      type="file"
                      name="image"
                      @input="selectImgFile2"
                      ref="fileInput2"
                      accept="image/*"
                    />
                    رفع الصورة
                  </label>

                  <div>
                    <img
                      :src="filePreview2"
                      alt=""
                      ref="myimg2"
                      id="im2"
                      style="width: 100% ; max-width : 700px;"
                    />
                  </div>
                </div>
              </div>
              <div class="question my-5">
                <div
                  class="card p-4 shadow"
                  v-for="(examData, index) in secondExam"
                  :key="index"
                >
                  <div class="image mb-4 text-center">
                    <img
                      :src="
                        require('../../../public/static/img/graph_' +
                          (index + 1) +
                          '.jpg')
                      "
                      alt=""
                    />
                  </div>

                  <h5 class="font-weight-bold">{{ $t(`${examData.key}`) }}</h5>
                  <hr />

                  <el-radio-group v-model="payload.answer">
                    <div class="row">
                      <div
                        class="col-md-4 d-flex align-items-center"
                        v-for="(option, index) in examData.key_value"
                        :key="index"
                      >
                        <input
                          type="radio"
                          :id="option"
                          :name="examData.id"
                          v-bind:disabled="disabled4"
                          :value="$t(`${option}`)"
                          @change="
                            printIds(examData.id, $t(`${option}`), index)
                          "
                        />
                        <label class="mr-1" :for="option">{{
                          $t(`${option}`)
                          }}</label>
                      </div>
                    </div>
                  </el-radio-group>
                  <div class="row">
                    <div class="col-md-6">
                      <el-input
                        placeholder="Your answer"
                        v-model="othr[index]"
                        @change="printother(othr[index], examData.id)"
                        size="medium"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="submit d-flex justify-content-between">
                <el-button
                  type="primary"
                  style="margin-top: 12px;"
                  @click="secondExamFun()"
                  :class="{
                    'is-disabled': result.length < secondExam.length
                  }"
                >الاختبار التالي</el-button
                >

                <!--  -->
                <!-- 'is-disabled': secondExam.length !== result.length -->
                <!-- v-bind:disabled="disabled2" -->
                <!-- :class="{
                    'is-disabled': result.length < secondExam.length
                  }" -->
                <el-button
                  type="primary"
                  style="margin-top: 12px;"
                  @click="prev()"
                >السابق</el-button
                >
              </div>
            </el-form>
            <!-- //? End Second Exam  -->

            <!-- //? Start Third Exam  -->
            <el-form v-if="active === 2" :model="payload" ref="thirdExam">
              <div class="image_upload d-flex mb-5">
                <div class="d-flex justify-content-between w-100 image-wrapper">
                  <label
                    class="custom-file-upload  d-block text-white text-center pt-3 px-2"
                    style="height:50px"
                  >
                    <input
                      type="file"
                      name="image"
                      @input="selectImgFile3"
                      ref="fileInput3"
                      accept="image/*"
                    />
                    رفع الصورة
                  </label>

                  <div>
                    <img
                      :src="filePreview3"
                      alt=""
                      ref="myimg3"
                      id="im3"
                      style="width: 100% ; max-width : 700px;"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div class="question">
                <div class="question my-5">
                  <div class="card p-4 shadow">
                    <h5 class="font-weight-bold">
                      {{ $t(`${thirdExam[0].key}`) }}
                      <!-- - {{ thirdExam[0].header }} -->
                    </h5>
                    <hr />

                    <el-radio-group v-model="payload.answer">
                      <div class="row">
                        <div
                          class="col-md-4"
                          v-for="(item, index) in thirdExam[0].key_value"
                          :key="index"
                        >
                          <el-radio
                            :label="$t(`${item}`)"
                            v-bind:disabled="disabled3"
                            @change="printid($t(`${item}`), thirdExam[0].id)"
                            name="type"
                          ></el-radio>
                        </div>
                      </div>
                    </el-radio-group>
                    <hr />
                    <div class="row">
                      <div class="col-md-6">
                        <p>{{ $t("other") }}</p>
                        <el-input
                          placeholder="Your answer"
                          v-model="thirdExamOne"
                          @change="
                            printthirdExamOne(thirdExamOne, thirdExam[0].id)
                          "
                          size="medium"
                        ></el-input>
                      </div>
                    </div>
                  </div>

                  <div class="card p-4 shadow">
                    <h5 class="font-weight-bold">
                      {{ $t(`${thirdExam[1].key}`) }}
                    </h5>

                    <hr />
                    <div class="row">
                      <div class="col-md-6">
                        <el-input
                          placeholder="Your answer"
                          v-model="thirdExamTwo"
                          @change="
                            printthirdExamTwo(thirdExamTwo, thirdExam[1].id)
                          "
                          size="medium"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="submit d-flex justify-content-between">
                <el-button
                  v-bind:disabled="disabled3"
                  type="primary"
                  style="margin-top: 12px;"
                  @click="thirdExamFun()"
                  :class="{
                    'is-disabled': check_answer_for_disabled3 == null
                  }"
                >{{ $t("send") }}</el-button
                >
                <el-button
                  type="primary"
                  style="margin-top: 12px;"
                  @click="prev()"
                >{{ $t("prev") }}</el-button
                >
              </div>
            </el-form>
            <el-form v-if="active==3">
              <p>تم ارسال الاجابات التى تم الطالب باختيارها , لارسال تقرير الطالب اضغط هنا :</p>
              <router-link
                :to="`/report/${stu_id}/${exam_type}`"
                style="width: 100%"
              >
                <el-button >
                  تقرير الطالب
                </el-button>
              </router-link>
            </el-form>
            <!-- //? End Third Exam  -->
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { integer } from "vee-validate/dist/rules";
  export default {
    name: "exam",
    
    data() {
      return {

        options: [
          {
            value: "HTML",
            label: "HTML"
          },
          {
            value: "CSS",
            label: "CSS"
          },
          {
            value: "JavaScript",
            label: "JavaScript"
          }
        ],
        value: [],

        send_imge: null,
        send_imge2: null,
        send_imge3: null,

        imge: null,
        filePreview: null,
        filePreview2: null,
        filePreview3: null,
        othr: [],
        answer: null,
        active: 0,
        finds: [],
        item: null,
        thirdExamOne: null,
        thirdExamTwo: null,
        allExams: null,
        firstExam: null,
        secondExam: null,
        thirdExam: null,
        result: [],
        //image upload

        dialogVisible: false,
        disabled: true,
        disabled2: true,
        disabled4: true,

        disabled3: true,

        imgFile: null,
        imgFile2: null,
        imgFile3: null,
        third: [],
        course_id: 1,
        group_id: 1,
        otherOptions: null,

        payload: {
          answer: [],
          exam_type: this.exam_type,
          student_id: this.stu_id,
          course_id: 1,
          question_id: null,
          group_id: 1
        },

        examImageUrl: "@static/img/graph_"
      };
    },
    props: {
      course_id: Number,
      id: Number,
      exam_type: null,
      stu_id: null,
      required : true
    },

    methods: {
      selectImgFile() {
        let fileInput = this.$refs.fileInput;
        let imgFile = fileInput.files;

        if (imgFile && imgFile[0]) {
          let reader = new FileReader(); //read content bt3 el file
          reader.onload = e => {
            this.filePreview = e.target.result;
          };
          reader.readAsDataURL(imgFile[0]);
          this.$emit("fileInput", imgFile[0]);
          this.disabled = false;
          this.send_imge = imgFile[0];
        }
      },
      selectImgFile2() {
        let fileInput = this.$refs.fileInput2;
        let imgFile = fileInput.files;

        if (imgFile && imgFile[0]) {
          let reader = new FileReader(); //read content bt3 el file
          reader.onload = e => {
            this.filePreview2 = e.target.result;
          };
          reader.readAsDataURL(imgFile[0]);
          this.$emit("fileInput", imgFile[0]);

          this.send_imge2 = imgFile[0];
          this.disabled4 = false;
        }
      },
      selectImgFile3() {
        let fileInput = this.$refs.fileInput3;
        let imgFile = fileInput.files;

        if (imgFile && imgFile[0]) {
          let reader = new FileReader(); //read content bt3 el file
          reader.onload = e => {
            this.filePreview3 = e.target.result;
          };
          reader.readAsDataURL(imgFile[0]);
          this.$emit("fileInput", imgFile[0]);
          this.disabled = false;
          this.send_imge3 = imgFile[0];
          this.disabled3 = false;
        }
      },

      refresh() {
        this.$store.dispatch("courses/exam").then(_ => {
          this.allExams = this.$store.getters["courses/questions"];
          this.firstExam = this.$store.getters["courses/questions"][1];
          this.secondExam = this.$store.getters["courses/questions"][2];
          this.thirdExam = this.$store.getters["courses/questions"][3];
        });
      },

      prev() {
        if (this.active-- < 0) return false;
      },
      prints(value) {
        this.value = value;
        console.log(this.value);
      },
      printtext(otherOptions) {
        // console.log("jkj" + this.payload.answer);
        console.log("hh" + otherOptions);
        console.log(this.payload.answer);
      },

      props: {
        course_id: Number
      },
      toggleEnable() {
        this.inputDisable = false;
      },
      firstExamFun() {
        this.$refs["firstExam"].validate(valid => {
          if (valid) {
            this.payload.question_id = this.firstExam[0].id;
            this.payload.exam_type = this.exam_type;
            this.payload.course_id = 1;

            this.payload.group_id = this.group_id;
            if (
              this.value != null ||
              this.value == [""] ||
              this.value.length != 0
            ) {
              this.payload.answer.push(this.value);
            } else {
              console.log("err");
            }

            let formData = new FormData();
            for (let key in this.payload) {
              formData.append(`${key}`, this.payload[key]);
            }

            if (this.send_imge) {
              formData.append("img", this.send_imge);
            }

            this.$store.dispatch("courses/answers", formData).then(_ => {
              this.payload.answer = [];
              this.otherOptions = null;
              this.payload.exam_type = null;
              this.imgFile = null;
              if (this.active++ > 2) return false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },

      printIds(option, examData, index) {
        if (examData == "لا توجد اجابة") {
          // console.log("option:" + option + "examdata" + examData + index);
          this.result.push({
            answer: examData,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: option,
            img: option,
            score: 0,
            course_id: 1
          });
        } else {
          this.result.push({
            answer: examData,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: option,
            img: option,
            //  score : null,

            course_id: 1
          });
        }
        console.log(this.result);
        console.log(this.send_imge2);
      },

      printother(other, option) {
        console.log(other);
        console.log("option" + option);

        this.result.push({
          answer: other,
          group_id: this.group_id,
          exam_type: this.exam_type,
          student_id: this.stu_id,
          question_id: option,
          //  score : null,

          img: option,
          course_id: 1
        });

        if (this.result.length < 9) {
          this.disabled2 = true;
        } else {
          this.disabled2 = false;
        }
        console.log(this.result);
      },

      secondExamFun() {
        console.log(this.send_imge2);
        let res = new FormData();

        res.append("img", this.send_imge2);

        for (let i = 0; i < this.result.length; i++) {
          for (let key of Object.keys(this.result[i])) {
            res.append(`items[${i}][${key}]`, this.result[i][key]);
          }
        }
        console.log(this.result);

        this.$store.dispatch("courses/answersecond", res).then(_ => {
          if (this.active++ > 2) return false;
        });
      },

      printid(item, question_id) {
        if (item == "لا توجد اجابة") {
          this.third.push({
            answer: item,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: question_id,
            score: 0,
            course_id: 1
          });
        } else {
          this.third.push({
            answer: item,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: question_id,
            course_id: 1
          });
        }

        //   console.log(this.exam_type);
        console.log(this.third);
      },

      printthirdExamOne(thirdExamOne, question_id) {
        if (thirdExamOne) {
          //   this.third.push(thirdExamOne)
          this.third.push({
            answer: thirdExamOne,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: question_id,
            course_id: 1
          });
        }
        console.log(this.third);
        console.log(this.exam_type);
      },

      printthirdExamTwo(thirdExamTwo, question_id) {
        if (thirdExamTwo) {
          this.third.push({
            answer: thirdExamTwo,
            group_id: this.group_id,
            exam_type: this.exam_type,
            student_id: this.stu_id,
            question_id: question_id,
            course_id: 1
          });
        }
        //console.log(this.third);
        console.log(this.exam_type);
      },
      thirdExamFun() {
        this.$refs["thirdExam"].validate(valid => {
          if (this.active++ > 2) return false;
          if (valid) {

            let res = new FormData();

            res.append("img", this.send_imge3);

            for (let i = 0; i < this.third.length; i++) {
              for (let key of Object.keys(this.third[i])) {
                res.append(`items[${i}][${key}]`, this.third[i][key]);
              }
            }
            console.log(this.third);

            // this.$store.dispatch("courses/answersecond", res).then(_ => {
            //   if (this.active++ > 2) return false;
            // });
            this.$store.dispatch("courses/answersecond", res).then(_ => {
              this.payload.answer = [];
              this.otherOptions = null;
              this.payload.exam_type = null;
              this.imgFile = null;

              // (this.thirdExamOne = null), (this.thirdExamTwo = null);
              // if (this.active++ > 2) return false;
            });



            let report = {
              content : `https://edufunz.com/report/${this.stu_id}/${this.exam_type}`,
              student_id : this.stu_id

            }
            console.log(report);
            this.$store.dispatch("groups/sendReport", report).then(_ => {

              if (this.active++ > 2) return false;
            });



          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },

      next() {
        if (this.active++ > 2) return false;
      },

      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    computed: {
      getTitle: {
        get: function() {
          return "";
        },

        set: function(value) {
          this.otherOptions = value;
        }
      },
      check_answer_for_disabled() {
        return this.payload.answer;
      },
      check_answer_for_disabled3() {
        return this.thirdExamTwo;
      }
    },
    mounted() {
      this.refresh();
      console.log(`https://edufunz.com/report/${this.stu_id}/${this.exam_type}`);
    }
  };
</script>

<style>
  /* .el-dialog__wrapper {
    z-index: 9999999999 !important;
  } */

  div .el-upload-list--picture-card .el-upload-list__item {
    width: 500px !important;
    height: auto !important;
  }

  div .el-step__main {
    text-align: right;
  }

  .question .card {
    border-top: #008080 5px solid;
  }

  div .el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 12px;
    margin-right: 5px;
  }

  @media (max-width: 530px) {
    .image img {
      width: 100%;
    }

    .image-wrapper {
      display: flex;
      flex-wrap: wrap !important;
    }
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1em;
    font-weight: 700;
    color: white;
    background-color: #008080;
    display: inline-block;
    border-radius: 5px;
    padding: 0px 20px;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    background-color: #409eff;
  }

  .inputfile + label {
    cursor: pointer;
    /* "hand" cursor */
  }

  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    cursor: pointer;

    background-color: #008080;
  }
  .custom-file-upload:hover {
    background-color: #03b1b1;
  }
  .multii {
    padding: 10px;
    margin: 10px;
    color: black !important;
  }
</style>
