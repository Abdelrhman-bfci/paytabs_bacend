<template>
   <el-row>
     <el-col :span="24">

         <!-- Large Screens  -->
         <server-table
           class="mt-5"
           :count="count"
           :DataItems="usersData"
           @Refresh="Refresh"
           v-loading="$store.getters['user/usersLoad']"
           :title="$t('users')"
         >
           <template #columns>

             <!-- <el-table-column prop="id" sortable label="#" min-width="60">
             </el-table-column> -->

             <el-table-column prop="name" sortable :label="$t('Global.name')" min-width="120">
             </el-table-column>

             <!-- <el-table-column prop="email" :label="$t('Global.email')" min-width="180">
               <template slot-scope="scope">
                 <div
                   style="
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 100%;
              "
                 >
                   {{ scope.row.email }}
                 </div>
               </template>
             </el-table-column> -->


             <el-table-column prop="" label="_" width="180">
               <template slot-scope="scope">
                 <div class="td-actions">
                   <!-- View Profile  -->
                   <router-link
                     v-tooltip.top-center="$t('exam')"
                     class="btn btn-primary  btn-xs px-2"
                         :to="`/guest-report/${scope.row.id}/1`"
                   >
                     عرض التقرير
                     <!--                <i class="fa fa-user" style="font-size: 17px"></i>-->
                   </router-link>
                   <!-- Edit user  -->
                 </div>
               </template>
             </el-table-column>
           </template>

         </server-table>
     </el-col>
   </el-row>
</template>

<script>
  import ServerTable from "../../components/DataTablePagination.vue";
  import Swal from "sweetalert2";

  export default {
    name: "index",
    components: { ServerTable },
    data() {
      return {
        // filter data
        filter: {},
        // edit user dialog data
        editUser: {},
        edit_user_dialog: false,


        // send email data
        send_mail_dialog: false,
        mail: { users: [], content: "" },
      };
    },

    computed: {
      usersData() {
        return this.$store.getters["user/users"];
      },
      count() {
        return this.$store.getters["user/totalUsers"];
      },
      id() {
        return this.$route.params.id ? this.$route.params.id : this.auth().id;
      },
    },
    methods: {
      Refresh(query) {
        // console.log(query);
         this.$store.dispatch("user/users", { query: {type : 3} });
      },
    },
  };
</script>

<style scoped>
  ::v-deep .cell {
    text-align: right;
    word-break: break-word;
  }

  ::v-deep .el-form--label-top .el-form-item__label {
    position: relative;
  }

  ::v-deep .el-form-item__label:before {
    position: absolute;
    left: -12px;
  }

  ::v-deep .el-dialog__headerbtn {
    left: 20px;
    right: unset;
  }

  ::v-deep .el-form-item__error {
    left: unset;
    right: 0;
    font-size: 0.9rem;
  }

  ::v-deep .el-radio {
    margin-left: 30px;
    margin-right: 0;
  }

  ::v-deep .el-radio__input {
    margin-left: 10px;
  }
</style>
