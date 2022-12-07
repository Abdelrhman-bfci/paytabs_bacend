<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader v-if="frame">
          <div
            :class="
              $i18n.locale === 'ar' ? 'custom_float card-header-actions' : ''
            "
            style="display: inline-block; font-weight: bold"
          >
            <i :class="icon" style="font-size: 18px"></i>
            <CIcon :name="fontIcon" v-if="fontIcon" color="bg-primary"></CIcon>
            {{ name }}
            <slot name="table-option"></slot>
          </div>
          <slot name="print-option"></slot>
          <div
            :class="$i18n.locale === 'en' ? 'card-header-actions' : ''"
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
            "
          >
            <CDropdown
              v-if="!hidden_action"
              color="success"
              placement="bottom-end"
              size="sm"
              class="customDrop"
            >
              <template #toggler-content>
                <CIcon name="cil-settings" />
                <span style="font-weight: bold">{{ $t("Global.action") }}</span>
                <CBadge color="info" v-if="archive_select_item > 0"
                  >{{ archive_select_item }}
                  {{ $t("Global.items") }}
                </CBadge>
              </template>
              <slot name="action_table"></slot>
            </CDropdown>
          </div>
        </CCardHeader>
        <CCardBody
          :dir="$i18n.locale === 'ar' ? 'rtl' : ''"
          style="text-align: initial"
        >
          <CRow v-if="frame" class="flex_small_screen flexGrow_3">
            <div class="ml-2 mr-2 mb-2 fullWidth order-9 print_hide">
              <el-input
                :placeholder="$t('Global.search')"
                clearable
                prepend="@"
                v-model="search"
                @keyup.enter.native="Refresh(true)"
              >
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-search"
                  @click="Refresh(true)"
                ></i>
              </el-input>
            </div>
            <div
              class="ml-2 mr-2 mb-2 fullWidth order-8"
              v-if="hasPermission(permission)"
            >
              <el-select
                class="fullWidth"
                ref="status"
                v-model="status"
                :label="$t('Global.active')"
                :placeholder="$t('Global.active')"
              >
                <el-option
                  class="el-input"
                  :value="0"
                  :label="$t('Global.active')"
                >
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    {{ $t("Global.active") }}
                    <i class="el-icon-check"></i>
                  </span>
                </el-option>
                <el-option
                  class="el-input"
                  :value="1"
                  :label="$t('Global.remove')"
                >
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    {{ $t("Global.remove") }}
                    <i class="el-icon-close"></i>
                  </span>
                </el-option>
              </el-select>
            </div>
            <slot
              name="filter_table"
              class=""
              style="margin-bottom: 10px"
            ></slot>
            <!--            </form>-->
            <div v-if="!hidden_reset" class="resetButton mb-2 order-10">
              <button
                class="el-button el-button--default is-round base_color"
                @click="RefreshAll"
                type="reset"
                style="padding: 0.6rem 1rem"
              >
                <i class="el-icon-refresh"></i>
                Reset
              </button>
            </div>
          </CRow>

          <el-table stripe style="width: 100%" :data="queriedData" border>
            <slot name="cols"></slot>
            <template slot="empty">
              <strong> {{ $t("Global.noItem") }} </strong>
            </template>
          </el-table>
          <div
            class="resetHeader flex-wrap print_hide"
            v-if="!hidden_pagination"
          >
            <div style="margin-top: 10px">
              <CPagination
                v-if="pages !== 0"
                :activePage.sync="page"
                :pages="pages"
                align="end"
              />
            </div>
            <div
              class="
                w-auto
                align-items-center
                d-flex
                justify-content-sm-end
                direction
              "
            >
              <label class="text-nowrap mr-2">{{
                paginationSelect.label
              }}</label>
              <select class="form-control" v-model="itemsPerPage">
                <option
                  v-for="(value, key) in paginationSelect.values"
                  :val="value"
                  :key="key"
                >
                  {{ value }}
                </option>
              </select>
              <label class="text-nowrap mr-2">{{ $t("Global.total") }}</label>
              <span class="text-nowrap">{{ total }}</span>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
// import {Pagination as LPagination} from 'src/components/index'

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  name: "DataTable",
  props: {
    hidden_pagination: { default: false, type: Boolean },
    items: Array,
    hidden_reset: Boolean,
    frame: {
      default: true,
      type: Boolean,
    },
    name: String,
    user_id: [Number, String],
    loading: Boolean,
    count: Number,
    total: Number,
    fontIcon: String,
    icon: String,
    hidden_action: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      expand_keys: [],
      search: this.$store.state.search_all ? this.$store.state.search_all : "",
      page: 1,
      itemsPerPageSelect: { Boolean, Object },
      itemsPerPage: 10,
      status: null,
      sort: { column: "id", asc: false },
    };
  },
  computed: {
    pages: function () {
      return Math.ceil(this.total / this.itemsPerPage);
    },
    paginationSelect: function () {
      return {
        label: this.$t("Global.items"),
        values: [10, 20, 25, 50],
      };
    },
  },
  mounted() {
    let obj = {};
    let query = {
      limit: this.itemsPerPage,
      offset: 0,
      user_id: this.user_id,
      order_by: this.sort.column ? this.sort.column : "id",
      search_text: this.$store.state.search_all
        ? this.$store.state.search_all
        : "",
      removed: 0,
      order_direction: this.sort.asc ? "ASC" : "DESC",
    };
    this.$emit("Refresh", query);
  },
  watch: {
    search: function (val) {
      EventBus.$emit("getSearch", val);
      this.$store.commit("set", ["search_all", val]);
      if (!val || val == "") {
        this.search = "";
        this.Refresh();
      }
    },
    resetSearch: function () {
      this.search = "";
    },
    page: function () {
      this.Refresh();
    },
    user_id: function (value) {
      this.Refresh();
    },
  },

  methods: {
    emitSelection(val) {
      this.$emit("selection-change", val);
    },
    RefreshAll() {
      this.search = "";
      this.status = 0;
      this.$emit("reset");
      let query = {
        limit: this.itemsPerPage,
        offset: (this.page - 1) * this.itemsPerPage,
        system: this.system,
      };
      this.$emit("Refresh", query);
    },

    Refresh(search = false) {
      let obj = {};
      let query = {
        user_id: this.user_id,
        limit: this.itemsPerPage,
        offset: search ? 0 : (this.page - 1) * this.itemsPerPage,
        search_text: this.search,
        order_by: this.sort.column ? this.sort.column : "id",
        order_direction: this.sort.asc ? "ASC" : "DESC",
        removed: this.status,
      };
      this.$emit("Refresh", query);
    },
    show(id) {
      this.$emit("show", id);
    },
    sortChange(val) {
      this.sort.column = val.prop;
      this.sort.asc = val.order == "ascending" ? true : false;
      this.Refresh();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    expandChange(row) {
      this.$emit("expand-change", row);
      this.expand_id = row.evaluation_id ? row.evaluation_id : row.id;
      if (this.expand_keys.length == 1) {
        if (this.expand_id == this.expand_keys[0]) {
          this.expand_keys = [];
        } else {
          this.expand_keys = [];
          this.expand_keys.push(row.evaluation_id ? row.evaluation_id : row.id);
        }
      } else {
        this.expand_keys = [];
        this.expand_keys.push(row.evaluation_id ? row.evaluation_id : row.id);
      }
    },
    getrowkeys(row) {
      return row.evaluation_id ? row.evaluation_id : row.id;
    },
    getRowClassName(row) {
      if (!row.row.program && !row.row.users) {
        return "hidden";
      } else {
        return "custom_expand";
      }
    },
    Drag(e) {
      this.$emit("Drag", e);
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
</style>
