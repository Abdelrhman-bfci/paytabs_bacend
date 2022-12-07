<template>
  <!-- <div
    v-else
    class="col"
    v-loading="
      $store.getters['dashboard/load']
    "
  > -->
  <div
    v-if="hasRole('admin')"
    class="col"
    v-loading="
      $store.getters['dashboard/load'] || $store.getters['role/rolesLoad']
    "
  >

    <!-- 4 top cards  -->
    <div class="row">
      <div v-for="(item, i) in countsData" class="col-xl-3 col-md-6">
        <stats-card
          :title="`${item.val}`"
          style="min-height: 160px; text-transform: uppercase"
          :subTitle="item.txt"
        >
          <div slot="header" class="icon-danger">
            <i :class="item.icon"></i>
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row">
      <!-- عدد الأنشطة الشهرية في كل مجموعة -->
      <div
        class="col-md-6"
        v-if="!$store.getters['dashboard/load'] && pieChart.labels.length > 0"
      >
        <chart-card
          :chart-data="pieChart"
          :chart-options="barChart.options"
          chart-type="Pie"
        >
          <template slot="header">
            <div class="d-flex" dir="rtl">
              <i
                class="el-icon px-2 el-icon-pie-chart"
                style="font-size: 30px"
              ></i>
              <h4 class="card-title">{{$t("number_of_activities_in_each_group")}}</h4>
            </div>
          </template>
          <template slot="footer"> </template>
        </chart-card>
      </div>
      <!-- احصائيات الأنشطة الشهرية -->
      <div
        class="col-md-6"
        v-if="
          !$store.getters['dashboard/load'] && activityChart.labels.length > 0
        "
      >
        <chart-card
          :chart-data="evaluationChart"
          :chart-options="barChart.options"
          :chart-responsive-options="barChart.responsiveOptions"
        >
          <template slot="header">
            <div class="d-flex" dir="rtl">
              <i
                class="el-icon px-2 el-icon-data-analysis"
                style="font-size: 30px"
              ></i>
              <h4 class="card-title">{{$t("Monthly_activity_stats")}}</h4>
            </div>
          </template>
        </chart-card>
      </div>
      <!-- التفاعل اليومي في النظام -->
      <div
        class="col-md-12"
        v-if="
          !$store.getters['dashboard/load'] && evaluationChart.labels.length > 0
        "
      >
        <chart-card
          :chart-data="activityChart"
          :chart-options="lineChart.options"
          :responsive-options="lineChart.responsiveOptions"
        >
          <template slot="header">
            <div class="d-flex" dir="rtl">
              <i
                class="el-icon px-2 el-icon-data-line"
                style="font-size: 30px"
              ></i>
              <h4 class="card-title">{{$t("daily_interaction_in_the_system")}}</h4>
            </div>
          </template>
        </chart-card>
      </div>
    </div>
  </div>

  <profile v-else></profile>
</template>
<script>
import { ChartCard, StatsCard } from "src/components/index";
import profile from "../../../views/users/show";

export default {
  components: {
    ChartCard,
    StatsCard,
    profile,
  },
  data() {
    return {
      student_activities : this.$t("student_activities"),
      logscount: [],
      indivedualCount: null,
      institutionCount: null,
      userCount: null,
      logsdate: [],
      lineChart: {
        options: {
          low: 0,
          showArea: true,
          height: "350px",
          axisX: {
            showGrid: true,
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      barChart: {
        options: {
          seriesBarDistance: 20,
          showPoint: true,
          donut: true,
          labelDirection: "explode",
          chartPadding: 0,
          labelOffset: 20,
          labelInterpolationFnc: function (value) {
            return `${value.split(" ")[0]}...`;
          },
          height: "245px",
          width: "87%",
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 20,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },

  computed: {
    countsData() {
      return [
        {
          txt: this.$t("student_activities"),
          val: this.$store.getters["dashboard/getEvaluationsCounts"],
          icon: "fa fa-book text-info",
          link: "/groups",
        },
        {
          txt: this.$t("study_groups"),
          val: this.$store.getters["dashboard/getGroupsCounts"],
          icon: "fa fa-users text-info",
          link: "/groups",
        },
        {
          txt: this.$t("educational_courses"),
          val: this.$store.getters["dashboard/getCoursesCounts"],
          icon: "fa fa-book text-info",
          link: "/courses",
        },
        {
          txt: this.$t("Registered_students") ,
          val: this.$store.getters["dashboard/getStudentsCounts"],
          icon: "fa fa-users text-info",
          link: "/users",
        },
      ];
    },
    pieChart() {
      return {
        labels: this.$store.getters["dashboard/grouplable"],
        series: this.$store.getters["dashboard/groupdata"],
      };
    },
    activityChart() {
      let data = {};
      data.labels = this.$store.getters["dashboard/logsdate"];
      data.series = [this.$store.getters["dashboard/logscount"]];
      return data;
    },
    evaluationChart() {
      return {
        labels: this.$store.getters["dashboard/evaluationslable"],
        series: [this.$store.getters["dashboard/evaluationsdata"]],
      };
    },
  },
  mounted() {
    // get counts
    this.$store.dispatch("dashboard/get_counts").then(_=>{
      console.log('lables => ', this.$store.getters["dashboard/grouplable"]);
      console.log('count => ', this.$store.getters["dashboard/groupdata"]);
    });
    this.$store.dispatch("dashboard/get_logs_data");
    this.$store.dispatch("dashboard/get_groups_data");
    this.$store.dispatch("dashboard/get_evaluations_data");
 console.log(this.$t("student_activities"))
  },

};
</script>
<style scope>
.fa {
  width: auto;
}
</style>
