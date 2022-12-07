
<template>
  <!-- comment for the developer:
make sure to convert data to be key,value format before passing to this component.
How to convert? >>>
  this.groupInfo = Object.entries(
    object or your data
  ).map(([key, value]) => {return { key, value }})

  -->
  <card>
    <table class="table table-striped text_nobreak w-100">
      <tbody style="text-align: initial">
        <slot name="other_data"></slot>
        <tr v-for="(item, key) in items" :key="key" class="w-100">
          <th scope="row" :width="'30%'">
            {{ $t(`Global.${item.key}`) }}
          </th>
          <td>
            <span>
              <slot name="custom_show"></slot>
            </span>
            <!--            <span v-if="typeof item.value === 'string' && item.value.search(/\n/g) > 0"-->
            <!--                  v-html="ntBr(item.value)"></span>-->
            <span
              v-if="
                item.key.includes('date') ||
                item.key.includes('close_at') ||
                item.key.includes('end_at') ||
                item.key.includes('starts') ||
                item.key.includes('expiration') ||
                item.key.includes('start') ||
                item.key.includes('created_at') ||
                item.key.includes('updated_at') ||
                item.key === 'from' ||
                item.key === 'to'
              "
              ><i class="el-icon-time"></i>
              {{ toLocalDatetime(item.value, "en") }}</span
            >

            <span class="text-break" v-else-if="item.key === 'gender'">
              {{ item.value == "1" ? "ذكر" : "أنثى" }}
            </span>
            <!-- group students view  -->
            <span class="text-break" v-else-if="item.key === 'age_group'">
              {{ getAgeGroup(item.value) }}
            </span>
            <span class="text-break" v-else-if="item.key === 'status'">
              {{ getStatus(item.value) }}
            </span>
            <span class="text-break" v-else-if="item.key === 'days'">
              <span
                class="badge badge-success h6 mx-2 p-2 rounded-pill"
                v-for="(day, i) in item.value"
                :key="i"
              >
                {{ day }}
              </span>
            </span>
            <span class="text-break" v-else>
              {{ item.value }}
            </span>
          </td>
        </tr>
        <slot name="bottom_other_data"></slot>
      </tbody>
    </table>
  </card>
</template>
<script>
export default {
  name: "info",
  props: {
    items: null,
  },
  methods: {
    getAgeGroup(id) {
      switch (id) {
        case 1:
          return "اقل من 6 سنين";
        case 2:
          return "من 6 ل 8 سنين";
        case 3:
          return "من 9 ل 12 سنة";
        case 4:
          return "اكبر من 13 سنة";
        default:
          return "كل الأعمار";
      }
    },
    getStatus(id) {
      switch (id) {
        case 0:
          return "غير فعال";
        case 1:
          return "فعال";
        case 3:
          return "مخفي";
      }
    },
  },
};
</script>
<style>
</style>
