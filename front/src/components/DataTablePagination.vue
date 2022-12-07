<template>
  <!-- :title="title" -->
  <card v-if="is_local">
    <!-- For Languages Table  -->
    <div class="col-12 d-flex justify-content-end pb-2">
      <slot name="action"></slot>
    </div>
    <el-table
      odd
      stripe
      style="width: 100%"
      @sort-change="setLocalSort"
      :data="pagedData"
      :row-class-name="class_name"
      :cell-class-name="class_name"
      v-loading="loading"
    >
      <slot name="columns"></slot>
    </el-table>
    <div
      slot="footer"
      class="
        col-12
        d-flex
        align-items-center
        justify-content-center justify-content-sm-between
        flex-wrap
        pt-2
      "
    >
      <div class="d-flex">
        <div class="d-flex">
               <!-- <span style="color: #9a9a9a; font-size: 0.75rem" class="mr-1"
            >SHOW</span

          > -->
          <span style="color: #9a9a9a; font-size: 0.75rem" class="mr-1"
            ></span

          >
          <el-select
            class="select-default mb-3"
            style="width: 100px"
            label="SHOW"
            v-model="pagination.perPage"
            placeholder="Per page"
          >
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <span
            style="
              color: #9a9a9a;
              font-size: 0.75rem;
              margin-right: 10px;
              line-height: 2rem;
            "
            class="ml-1"
            ></span
          >
              <!-- <span
            style="
              color: #9a9a9a;
              font-size: 0.75rem;
              margin-right: 10px;
              line-height: 2rem;
            "
            class="ml-1"
            >ENTRIES</span
          > -->
          <!-- <p style="line-height: 2.5" class="card-category">
            Showing {{ from + 1 }} to {{ to }} of {{ count }} entries
          </p> -->
        </div>
      </div>

      <l-pagination
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="count"
      >
      </l-pagination>
    </div>
  </card>
  <card v-else>
    <!-- for tables other than languages table  -->
    <div>
      <div class="d-flex justify-content-between pb-2">
        <h1 class="h2 m-0">{{ title }}</h1>
        <el-dropdown @command="handleCommand" v-if="action">
          <l-button type="info" style="font-size: 1rem">
            <!-- Normal Import  -->
            {{
              progress_count && progress_count != 100
                ? `${Math.ceil(progress_count)} %`
                : ""
            }}

            {{$t('options')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </l-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="Export" v-if="enable_export">
              <el-icon class="el-icon-download"></el-icon>
              {{$t('export')}}
            </el-dropdown-item>

            <el-dropdown-item>
              <slot name="action"></slot>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-collapse class="w-100 p-4" v-if="useFilter">
        <el-collapse-item name="1">
          <template #title>
            <div
              class="d-flex justify-content-between align-items-center w-100"
            >
              <p class="mb-0">{{$t("Search_and_filter")}}</p>
              <l-button type="info" class="p-2 mr-3 mb-0" @click="resetFunction"
                >{{$t("Reset")}}</l-button
              >
            </div>
          </template>
          <el-row :gutter="10" class="w-100 m-0">
            <el-col :md="12">
              <el-select
                v-if="!hidden_status"
                v-model="removed"
                :placeholder="$t('Global.status')"
                class="select-default mt-2 w-100"
              >
                <el-option
                  v-for="(state, i) in status"
                  :key="i"
                  :label="state.label"
                  :value="state.value"
                  class="text-right mr-3"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :md="12">
              <el-input
                ref="searchInput"
                class="mt-2 d-block d-lg-inline-block w-100"
                :placeholder="$t('search')"
                v-model="search"
                @keyup.enter.native="Refresh(true)"
              />
            </el-col>
            <!-- take full width at all tables but not tasks table  -->
            <el-col :md="!hidden_status ? 24 : 12">
              <slot name="filter"></slot>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-col :span="4" class="justify-content-end d-flex">
          <l-button type="info" class="p-2 mt-2" @click="resetFunction"
            ><i class="el-icon el-icon-refresh"></i
          ></l-button>
        </el-col> -->
      <el-table
        odd
        stripe
        fit
        @sort-change="sortChange"
        @selection-change="selection_change"
        :cell-class-name="class_name"
        style="width: 100%"
        :data="is_local ? pagedData : DataItems"
      >
        <slot name="columns"></slot>
        <!-- <slot name="columns" v-if="!isMediumScreen"></slot>

        <slot name="columnsSmallScreens" v-else></slot> -->
      </el-table>
    </div>
    <div
      slot="footer"
      class="
        col-12
        d-flex
        align-items-center
        justify-content-center justify-content-sm-between
        flex-wrap
        pt-2
      "
    >
      <div>
        <span
          style="color: #9a9a9a; font-size: 0.75rem"
          class="mr-1 mt-1 text-right"
          >{{$t('show')}} &nbsp;</span
        >
        <el-select
          class="select-default mb-3"
          style="width: 100px"
          label="SHOW"
          v-model="pagination.perPage"
          placeholder="Per page"
        >
          <el-option
            class="select-default"
            v-for="item in pagination.perPageOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <span
          style="color: #9a9a9a; font-size: 0.75rem; margin-right: 10px"
          class="ml-1 mt-1"
          >  {{$t('item_per_page')}}</span
        >
      </div>
      <div class="d-flex">
        <!-- <p style="line-height: 2.7" class="card-category">
           {{$t("show_from")}} {{ from + 1 }} {{$t("to")}} {{ to }} {{$t("from_count")}}  {{ count }}{{$t("from_items")}}
        </p> -->

        <l-pagination
          class="pagination-no-border"
          v-model="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="count"
        >
        </l-pagination>
      </div>
    </div>
  </card>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";

import { Pagination as LPagination } from "src/components/index";

export default {
  components: {
    LPagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  name: "DataTable",
  props: {
    hidden_pagination: { default: false, type: Boolean },
    DataItems: Array,
    import_url: String,
    filter: Object,
    class_name: String,
    action: {
      default: true,
      type: Boolean,
    },
    useFilter: {
      default: true,
      type: Boolean,
    },
    enable_export: {
      default: true,
      type: Boolean,
    },
    title: String,
    name: String,
    loading: Boolean,
    count: Number,
    is_local: {
      default: false,
      type: Boolean,
    },
    hidden_status: {
      default: false,
      type: Boolean,
    },

    fileLoading: Boolean,
    allow_bulk_process: Boolean,
    admin_permission: String,
    edit_permission: String,
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        // perPageOptions: [5, 10, 25, 50],
         perPageOptions: [10,20],
      },
      sort: { column: "id", asc: true },
      locallySortedData: [],
      locallySorted: false,
      progress_count: null,
      status: [
        { value: 3, label: this.$t("hidden") },
        { value: 2, label: this.$t("non-active") },
        { value: 1, label: this.$t("active")},
      ],
      search: null,
      removed: null,
      isLoading: true,
    };
  },
  computed: {
    import_src() {
      return `${process.env.VUE_APP_BASE_URL}/${this.import_url}`;
    },
    pagedData() {
      return this.DataItems.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.count;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
  },
  mounted() {
    let query = {
      limit: this.pagination.perPage - 1,
      offset: 0,
      // order_by: this.sort.column ? this.sort.column : "id",
      // order_direction: this.sort.asc ? "ASC" : "DESC",
    };
    this.$emit("Refresh", query);

    // set isMediumScreen to false if screen is large size or more
    // this.isMediumScreen = window.innerWidth <= 768;

    // this.$refs["searchInput"].addEventListener("keyup", (e) => {
    //   if (e.key == "Enter" && this.search.length > 0) {
    //     this.Refresh(true);
    //   }
    // });
  },

  watch: {
    "pagination.currentPage": function () {
      if (!this.is_local) this.Refresh();
    },
    "pagination.perPage": function () {
      this.Refresh();
    },
    "filter.type": function () {
      this.Refresh();
    },
    "filter.age_group_id": function () {
      this.Refresh();
    },
    "filter.gender": function () {
      this.Refresh();
    },
    "filter.age_group": function () {
      this.Refresh();
    },
    "filter.category": function () {
      this.Refresh();
    },
    "filter.priority": function () {
      this.Refresh();
    },
    removed: function () {
      this.Refresh();
    },
    // search: function () {
    //   this.Refresh(true);
    // },

    DataItems: function () {
      this.isLoading = false;
    },
    filter: function () {
      this.isLoading = true;
    },
  },
  methods: {
    Refresh(search = false) {
      this.isLoading = true;
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter((key) => predicate(obj[key]))
          .reduce((res, key) => ((res[key] = obj[key]), res), {});

      let query = this.is_local
        ? {
            limit: this.pagination.perPage - 1,
            offset: (this.pagination.currentPage - 1) * this.pagination.perPage,
          }
        : {
            limit: this.pagination.perPage - 1,
            offset: search
              ? 0
              : (this.pagination.currentPage - 1) * this.pagination.perPage,
            search_text: this.search,
            order_by: this.sort.column ? this.sort.column : "id",
            order_direction: this.sort.asc ? "ASC" : "DESC",
            status: this.removed,
            ...Object.filter(this.filter ? this.filter : {}, (el) => el != ""),
          };
      this.$store.commit("SET_FILTER", this.filter);

      this.$emit("Refresh", query);
      this.progress_count = null;
      // this.isLoading = false;
    },
    handleCommand(command) {
      if (command) command();
    },
    progress(e, file, list) {
      this.isLoading = true;
      this.progress_count = e.percent;
      console.log(this.progress_count);
    },
    selection_change(selections) {
      this.$emit("selection", selections);
    },
    sortChange(val) {
      // console.log(val);
      this.sort.column = val.prop;
      this.sort.asc = val.order == "ascending" ? true : false;
      this.Refresh();
    },
    setLocalSort(val) {
      // console.log(val.prop, val.order);
      this.sort.column = val.prop;
      this.locallySortedData = [...this.pagedData].sort((a, b) => {
        if (val.order == "ascending") a[val.prop] - b[val.prop];
        if (val.order == "descending") b[val.prop] - a[val.prop];
      });
      // console.log(this.locallySortedData);
      this.Refresh();
    },
    Export() {
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter((key) => predicate(obj[key]))
          .reduce((res, key) => ((res[key] = obj[key]), res), {});
      // if no filter, ignore it while export since it will cause error if filter object is empty
      let query = this.useFilter
        ? {
            search_text: this.search,
            ...Object.filter(this.filter, (el) => el != ""),
            removed: this.removed,
          }
        : {
            search_text: this.search,
            removed: this.removed,
          };
      this.$emit("export", query);
    },
    Export_Bulk() {
      this.$emit("Export_Bulk");
    },
    emitImportBulk() {
      this.$emit("addBulk");
    },
    resetFunction() {
      this.search = "";
      this.removed = null;
      this.$emit("reset");
      this.Refresh(false);
    },
  },
};
</script>

<style lang="scss">
.custom_expand {
  cursor: pointer !important;
}

.resetButton .el-button.is-round:focus,
.resetButton .el-button.is-round:hover,
.resetButton .el-button.is-round:active {
  border-color: #173f5f;
  color: #173f5f;
  color: #fff;
  background-color: #173f5f;
  opacity: 1;
}

.base_color {
  opacity: 0.9;
  color: #fff;
  background-color: #173f5f;
}

.resetHeader {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  margin: 0.5rem 0rem;

  .el-button {
    margin: 0rem 0.7rem;
  }

  div label {
    margin: 0rem 0.3rem;
  }
}

.resetButton {
  color: #fff;
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  margin-left: 1rem;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.el-table__row--striped {
  background-color: #fff !important;
}

.el-table--border,
.el-table--group {
  border: unset !important;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #e9ecef;
}

thead tr th .cell {
  border-bottom-width: 1px !important;
  font-size: 0.75rem !important;
  text-transform: uppercase !important;
  color: #9a9a9a !important;
  font-weight: 400 !important;
  padding-bottom: 5px !important;
}

.el-icon-arrow-right {
  color: #23ccef;
}

/* form select inputs  */
.el-dropdown-menu__item {
  text-align: center;
}
</style>
