<template>
  <div class="main_charts_wrapper">
    <div class="part">
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
            <h4 class="card-title" v-if="title">{{ title }}</h4>
          </div>
        </template>
        <template slot="footer"> </template>
      </chart-card>
    </div>
    <!-- //? bar chart  -->
    <div class="part">
      <chart-card
        :chart-data="bar_Chart"
        :chart-options="barChart.options"
        :chart-responsive-options="barChart.responsiveOptions"
      >
        <template slot="header">
          <div class="d-flex" dir="rtl">
            <i
              class="el-icon px-2 el-icon-data-analysis"
              style="font-size: 30px"
            ></i>
            <h4 class="card-title" v-if="title">{{ title }}</h4>
          </div>
        </template>
      </chart-card>
    </div>
  </div>
</template>

<script>
import { ChartCard } from "src/components/index";
export default {
  name: "circleChart",
  props: {
    label: {
      type: Array,
      default: []
    },
    series: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      barChart: {
        options: {
          seriesBarDistance: 20,
          showPoint: true,
          donut: true,
          labelDirection: "explode",
          chartPadding: 0,
          labelOffset: 20,
          labelInterpolationFnc: function(value) {
            return `${value.split(" ")[0]}...`;
          },
          height: "245px",
          width: "87%"
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  components: {
    ChartCard
  },
  computed: {
    pieChart() {
      return {
        labels: this.label,
        series: this.series
      };
    },
    bar_Chart() {
      return {
        labels: this.label,
        series: [this.series]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.main_charts_wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%;
  padding: 10px;
  .part {
    width: 48%;
  }
}
</style>
