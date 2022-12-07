<template>
  <div class="container">
    <!-- <h1>{{ stu_id }} ..</h1>

  <p>  {{ this.$route.params.exam_type }} ..</p>
    <h1>{{ studentScore }}</h1>
  <h1>{{ studentFluency }} ..</h1>
  <h1>{{ studentGender }} ..</h1>
    <h1>{{ studentCategory }} ...</h1> -->

    <div class="card">
      <div class=" d-flex py-3 justify-content-around fs-5 border-bottom">
        <span class="px-2">
          <p>الاسم :{{ studentName }}</p>
        </span>
        <span class="px-2">
          <p>العمر :{{ studentAge }}</p>
        </span>

        <span class="px-2">
          <p v-if="studentGender == 0">النوع : ذكر</p>
          <p v-else>النوع : انثى</p>
        </span>

        <span class="px-2">
          <p> تاريخ الاختبار :{{exam_date}}</p>
        </span>
        <span class="px-2">
          <p v-if="this.$route.params.exam_type == 1">نوع الاختبار :قبلى</p>
          <p v-if="this.$route.params.exam_type == 2">نوع الاختبار :بعدى</p>
          <!-- <p>نوع الاختبار :قبلى\بعدى</p> -->

        </span>
      </div>
    </div>
    <div class="card">
      <div
        class="d-flex justify-content-around flex-wrap  pt-5 mt-5 text-right w-100"
      >
        <div class="">
          <h5 class="text-right">-الأصالة:</h5>
          <h5>التقييم العام: {{ scoreChartStudent.text }}</h5>

          <h5>الدرجة :{{ studentScore }} </h5>
        </div>
        <div class="">
          <apexchart
            width="500"
            type="bar"
            :options="scoreChartStudent.options"
            :series="scoreChartStudent.series"
          ></apexchart>
        </div>
      </div>
      <div
        v-if="this.studentScore < scoreChartStudent.Average_score"
        class="text-right px-5"
      >
        <h4 class="text-dark"><i class="fa fa-sticky-note-o"></i> ملاحظة</h4>
        <p>
          يجب تشجيع الطفل على التفكير بطرق غير تقليدية وتجنب توبيخه في حال عرض
          فكرة أو القيام بشيء غير تقليدي. يجب على ولي الأمر تقدير الأفكار وعدم
          محاولة توجيه الطفل للقيام بالأشياء بطرق تتشابه مع أقرانه. يفضل عقد
          جلسات مع الطفل نطلب منه التفكير في طرق جديدة لم يفكر فيها أحد لحل
          مشكلة ما أو ابتكار بشيء جديد (كوب - سيارة - قلم) مع تشجيعه دائمًا.
        </p>
      </div>
    </div>
    <div class="card">
      <div
        class="d-flex justify-content-around flex-wrap  pt-5 mt-5 text-right w-100"
      >
        <div>
          <h5 class="text-right">-الطلاقة:</h5>
          <h5>التقييم العام: {{ fluencyChartStudent.text }}</h5>
          <h5>الدرجة :{{ studentFluency }} </h5>
        </div>

        <div>
          <apexchart
            width="500"
            type="bar"
            :options="fluencyChartStudent.options"
            :series="fluencyChartStudent.series"
          ></apexchart>
        </div>
      </div>

      <div
        v-if="this.studentFluency< fluencyChartStudent.Average_fluency"
        class="text-right px-5"
      >
        <h4 class="text-dark"><i class="fa fa-sticky-note-o"></i> ملاحظة</h4>
        <p>
          يجب تشجيع الطفل على إيجاد أكبر عدد ممكن من البدائل والسماح له بالتعبير عنها وعدم انهاء النقاش بعد أول فكرة حتى
          لو كانت مبتكرة. يجب أن يعلم الطفل أن لكل شيء بدائل كثيرة ولا يوجد حل واحد لأي مشكلة، لكن المهم هو التفكير بعمق
          ومحاولة إعطاء استجابات متعددة في وقت قصير. يمكن لولي الأمر استخدام العبارات التالية (ممتاز، أسرع ... توجد
          أفكار أخرى كثيرة .... حاول، متأكد من أنك ستنجح! رائع، وماذا أيضًا .... )
        </p>
      </div>
    </div>
    <div class="card">
      <div
        class="d-flex justify-content-around flex-wrap  pt-5 mt-5 text-right w-100"
      >
        <div>
          <h5 class="text-right">-المرونة:</h5>
          <h5>التقييم العام:{{ categoryChartStudent.text }}</h5>
          <h5>الدرجة :{{ studentCategory }} </h5>
        </div>

        <div>
          <apexchart
            width="500"
            type="bar"
            :options="categoryChartStudent.options"
            :series="categoryChartStudent.series"
          ></apexchart>
        </div>
      </div>


      <div
        v-if="this.studentCategory< categoryChartStudent.Average_categories"
        class="text-right px-5"
      >
        <h4 class="text-dark"><i class="fa fa-sticky-note-o"></i> ملاحظة</h4>
        <p>
          لأن المشكلة في هذا المجال العقلي ترتبط بعدم قدرة الطفل على الانتقال من فئة لفئة (أي عندما يفكر في حل "مثلا"
          لرفع صندوق يكون الحبل هو دائما الأداة) نطلب منه التفكير في حلول لا تستخدم الحبل (إلكتروني مثلا) أو نسأله هل
          ممكن للهواء أن يرفع الصندوق؟

          القراءة وأفلام الخيال العلمي والتجارب والفنون بصفة عامة من أهم الأنشطة التي تساعد الطفل على الإبداع، وتنمي
          المرونة والطلاقة والأصالة في التفكير.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "report",
    props: {
   
    },
    data() {
      return {
        exam_type_1: 1,
        exam_type_2: 2,
        group_1: 1,
        group_2: 2,
        group_3: 3,
        max_category: 0,
        scores: [],
        fluency: [],
        categories: [],
        sum_score: 0,
        sum_categories: 0,
        sum_fluency: 0,
        max_fluency: 0,
        stu_id: this.$route.params.stu_id,
        exam_type: this.$route.params.exam_type,
        studentData: {
          student_id: this.stu_id,
          course_id: 1
        },
        studentScore: null,
        studentFluency: null,
        category_count: null,
        studentCategory: null,
        studentName: null,
        studentGender: null,
        studentAge: null,
        exam_date: null,
        exam_type: null
      };
    },
    computed: {
      scoreChartStudent() {
        let max_score = 0;
        let students = [];
        let text = "";
        let Average_score = 0;
        let sum_score = 0;

        max_score = Math.max(...this.scores);

        Average_score = (this.sum_score / this.scores.length).toFixed(2);
        let x = [50, 0, 0];
        if (this.studentScore > Average_score) {
          text = "درجة الطالب(فوق المتوسط) ";
        } else if (this.studentScore < Average_score) {
          text = "درجة الطالب(تحت المتوسط) ";
        } else if (this.studentScore == Average_score) {
          text = "درجة الطالب(متوسط) ";
        }
        return {
          max_score,
          Average_score,
          text,
          options: {
            annotations: {
              yaxis: [
                {
                  y: this.studentScore,
                  label: {
                    offsetX: -200,
                    borderColor: "#84898f",
                    style: {
                      color: "#fff",
                      background: "#84898f"
                    },
                    text: text
                  },
                  borderColor: "#fff",
                  borderWidth: "4px",
                  width: "80px",
                  fillColor: "#004276",
                  offsetX: 18,

                  strokeDashArray: 95
                }
              ],
              points: [
                {
                  x: 40,
                  y: Average_score,
                  marker: {
                    size: 4,
                    width: "50px"
                  },
                  label: {
                    borderColor: "#84898f",
                    text: "المتوسط"
                  }
                }
              ]
            },
            chart: {
              id: "vuechart-example"
            },
            xaxis: {
              categories: ["الاصالة", "", ""]
            },
            yaxis: {
              min: 0,
              max: max_score,
              tickAmount: 10
            }
          },
          labels: students,
          series: [
            {
              name: "series-1",
              data: x
            }
          ]
        };
      },
      fluencyChartStudent() {
        let students = [];
        let fluency = [];
        let max_fluency = 0;
        let Average_fluency = 0;
        let sum_fluency = 0;
        let text = "";
        console.log(this.fluency);
        max_fluency = this.max_fluency;
        Average_fluency = (this.sum_fluency / this.fluency.length).toFixed(2);
        console.log(max_fluency);
        let x = [max_fluency, 0, 0];
        console.log(this.studentFluency);
        console.log(Average_fluency);
        if (this.studentFluency > Average_fluency) {
          text = "درجة الطالب(فوق المتوسط) ";
        } else if (this.studentFluency < Average_fluency) {
          text = "درجة الطالب(تحت المتوسط) ";
        } else if (this.studentFluency == Average_fluency) {
          text = "درجة الطالب(متوسط) ";
        }
        return {
          max_fluency,
          Average_fluency,
          text,
          options: {
            annotations: {
              yaxis: [
                {
                  y: this.studentFluency,
                  label: {
                    offsetX: -200,
                    borderColor: "#84898f",
                    style: {
                      color: "#fff",
                      background: "#84898f"
                    },
                    text: text
                  },
                  borderColor: "#fff",
                  borderWidth: "4px",
                  width: "80px",
                  fillColor: "#004276",
                  offsetX: 18,
                  strokeDashArray: 95
                }
              ],

              points: [
                {
                  x: 40,
                  y: Average_fluency,
                  marker: {
                    size: 4,
                    width: "50px"
                  },
                  label: {
                    borderColor: "#84898f",
                    text: "المتوسط"
                  }
                }
              ]
            },
            chart: {
              id: "vuechart-example"
            },
            xaxis: {
              categories: ["الطلاقة"]
            },
            yaxis: {
              min: 0,
              max: max_fluency,
              tickAmount: 10
            }
          },
          labels: students,
          series: [
            {
              name: "series-1",
              data: x
            }
          ]
        };
      },

      categoryChartStudent() {
        let students = [];
        let categories = [];
        let max_categories = 0;
        let Average_categories = 0;
        let text = "";
        max_categories = Math.max(...this.categories);
        Average_categories = +(
          this.sum_categories / this.categories.length
        ).toFixed(2);

        let x = [this.max_category, 0, 0];
        if (this.studentCategory > Average_categories) {
          text = "درجة الطالب(فوق المتوسط) ";
        } else if (this.studentCategory < Average_categories) {
          text = "درجة الطالب(تحت المتوسط) ";
        } else if (this.studentCategory == Average_categories) {
          text = "درجة الطالب(متوسط) ";
        }
        console.log(this.studentCategory, Average_categories, max_categories);
        return {
          max_categories,
          Average_categories,
          text,
          options: {
            annotations: {
              yaxis: [
                {
                  y: this.studentCategory,
                  label: {
                    offsetX: -200,
                    borderColor: "#84898f",
                    style: {
                      color: "#fff",
                      background: "#84898f"
                    },
                    text: text
                  },
                  borderColor: "#fff",
                  borderWidth: "4px",
                  width: "80px",
                  fillColor: "#004276",
                  offsetX: 18,
                  strokeDashArray: 95
                }
              ],
              points: [
                {
                  x: 40,
                  y: Average_categories,
                  marker: {
                    size: 4,
                    width: "50px"
                  },
                  label: {
                    borderColor: "#84898f",
                    text: "المتوسط"
                  }
                }
              ]
            },
            chart: {
              id: "vuechart-example"
            },
            xaxis: {
              categories: ["المرونة"]
            },
            yaxis: {
              min: 0,
              max: this.max_category,
              tickAmount: 5
            }
          },
          labels: students,
          series: [
            {
              name: "series-1",
              data: x
            }
          ]
        };
      }
    },
    mounted() {
      // this.$store.dispatch("user/user", this.stu_id).then(res => {
      //   console.log(res);
      // });

      this.$store.dispatch("groups/studentscore", this.$route.params.exam_type).then(res => {
        let resss = res;
        console.log(resss);
        for (let i = 0; i < resss.score.length; i++) {
          this.scores.push(resss.score[i].total);
          if (resss.score[i].student_id == this.stu_id) {
            this.studentScore = resss.score[i].total;
          }
        }


        for (let i = 0; i < resss.categories.length; i++) {
          this.categories.push(resss.categories[i].count);
          if (resss.categories[i].student_id == this.stu_id) {
            this.studentCategory = resss.categories[i].count;
          }
        }


        for (let i = 0; i < resss.user_data.length; i++) {

          if (resss.user_data[i].student_id == this.stu_id) {
            this.studentName = resss.user_data[i].name;
            this.studentGender = resss.user_data[i].gender;
            this.studentAge = resss.user_data[i].age;
          }
        }

        console.log(this.studentName);
        for (let i = 0; i < resss.fluency.length; i++) {
          this.fluency.push(resss.fluency[i].score);
          if (resss.fluency[i].student_id == this.stu_id) {
            console.log(resss.fluency[i].score);
            ///////////////////////////imprtanttttttttttttttttttt//////////////////////////////////
            this.studentFluency = resss.fluency[i].score;
            this.exam_date = resss.fluency[i].exam_date;


          }
        }


        console.log(this.exam_date);
        this.max_fluency = Math.max(...this.fluency);
        this.max_category = Math.max(...this.categories);

        for (let i = 0; i < this.scores.length; i++) {
          this.sum_score += this.scores[i];
        }

        for (let i = 0; i < this.categories.length; i++) {
          this.sum_categories += this.categories[i];
        }

        for (let i = 0; i < this.fluency.length; i++) {
          this.sum_fluency += this.fluency[i];
        }
        //   console.log(this.sum_fluency, this.sum_categories, this.sum_score);
      });
    },
    methods: {}
  };
</script>

<style scoped>
  p h5 h6 {
    color: rgb(82, 78, 78);
  }
</style>
