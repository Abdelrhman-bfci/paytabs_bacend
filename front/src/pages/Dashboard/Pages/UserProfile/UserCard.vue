<template>
  <div class="col-lg-12 col-md-12 p-0 px-md-3">
    <card
      class="card-user position-relative"
      v-loading="$store.getters['user/usersLoad']"
    >
      <div slot="image" style=''>
        <!-- <img
          src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
          alt="..."
        /> -->
             <!-- <img

             style='height: 290; width: 100%; '
          src="https://www.britishcouncil.my/sites/default/files/learn-english-help-your-child-learn-english.jpg"
          alt="..."
        /> -->
      </div>
      <div>
        <div class="author">
          <!-- user image  -->
          <img
            class="avatar border-dark"
            :src="image(user.image, user.gender)"
            :alt="user.name"
          />
          <!-- name  -->
          <p class="h2 title">{{ user.name }}</p>

          <!-- edit profile  -->
          <el-button
            type="info"
            @click="open_edit_dialog"
            class="mb-3"
            style="font-size: 1.2rem"
          >
            {{ $t("Edit_profile") }}
          </el-button>

          <br />
          <!-- add child button  -->
          <!-- show only for parent to add children which has role student  -->
          <el-button
            type="info"
            @click="openDialog"
            class="mb-3"
            style="font-size: 1.2rem"
            v-if="hasRole('student')"
          >
            {{ $t("add_child") }}
          </el-button>
          <br />
          <!-- status  -->
          <el-badge
            class="ml-3"
            :type="user.removed == 0 ? 'success' : 'danger'"
            :value="user.removed == 0 ? 'فعال' : 'غير فعال'"
            round
          >
          </el-badge>

          <!-- type  -->
          <el-badge
            type="primary"
            :value="user.type == 0 ? 'اسرة' : 'معلم'"
            round
          >
          </el-badge>
          <!-- Title  -->
          <p class="text-secondary h4">
            {{ user.job_title }}
          </p>
          <!-- About me  -->
          <p>{{ user.about_me ? user.about : "" }}</p>
        </div>
      </div>

      <!-- Children  -->
      <!-- show only for student or when admin view student profile  -->
      <server-table
        v-if="user.type == 0"
        :count="childrenCount"
        :DataItems="children"
        :title="$t('children')"
        :useFilter="false"
        :enable_export="false"
        :action="false"
      >
        <template #columns>
          <el-table-column type="expand">
            <!-- Child Activities  -->
            <template slot-scope="scope">
              <el-table :data="scope.row.child_task">
                <el-table-column
                  prop="course"
                  sortable
                  :label="$t('courses')"
                  min-width="120"
                >
                </el-table-column>

                <el-table-column
                  prop="title"
                  sortable
                  :label="$t('activity')"
                  min-width="120"
                >
                </el-table-column>

                <el-table-column
                  prop="teacher_name"
                  sortable
                  :label="$t('teacher_name')"
                  min-width="120"
                >
                </el-table-column>

                <el-table-column
                  prop="created_at"
                  sortable
                  :label="$t('submission_date')"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    {{ toLocalDatetime(scope.row.created_at) }}
                  </template>
                </el-table-column>

                <el-table-column
                  prop="grade"
                  sortable
                  :label="$t('evaluation')"
                  min-width="180"
                >
                  <template slot-scope="scope">
                    <el-rate
                      v-model="scope.row.grade"
                      disabled
                      text-color="#ff9900"
                    >
                    </el-rate>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="badge_id"
                  sortable
                  label="badges"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.badge_id > 1" class="text-left pt-3">
                      <p class="ml-1" v-if="scope.row.badge_id > 1">
                        {{ labels[scope.row.badge_id - 1] }}
                      </p>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="status"
                  sortable
                  :label="$t('Global.status')"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <el-badge
                      :value="activityStatus(scope.row.status).status"
                      :type="activityStatus(scope.row.status).type"
                    ></el-badge>
                  </template>
                </el-table-column>

                <el-table-column prop="" label="_" width="180">
                  <template slot-scope="scope">
                    <div class="td-actions">
                      <!-- Comment for the developer:
                      According to client request, their are a set of actions user can perform depending on activity status:
                        - Pending: user can edit or delete
                        - Accepted: user can view only
                        - Resubmit: user can view only
                      and according to this requirements, we display buttons -->

                      <!-- show if activity is accepted or resubmit  -->
                      <el-button
                        v-if="scope.row.status == 1 || scope.row.status == 3"
                        v-tooltip.top-center="$t('show_child_activity')"
                        @click="open_activity_dialog(scope.row)"
                        class="btn text-primary btn-link btn-xs px-2"
                      >
                        <i class="fa fa-eye"></i>
                      </el-button>

                      <!-- show if activity is pending -->

                      <el-button
                        v-if="scope.row.status == 0"
                        class="border-0 px-2"
                        v-tooltip.top-center="$t('edit_child_activity')"
                        @click="open_activity_dialog(scope.row)"
                        ><i class="fa fa-edit text-warning"></i>
                      </el-button>

                      <!-- show if activity is pending only -->
                      <el-button
                        v-if="scope.row.status == 0"
                        v-tooltip.top-center="$t('delete_child_activity')"
                        @click="removeActivity(scope.row.id)"
                        class="btn btn-danger btn-link btn-xs px-2"
                      >
                        <i class="fa fa-trash"></i>
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            sortable
            :label="$t('child_name')"
            min-width="120"
          >
            <template slot-scope="scope">
              <!-- <router-link :to="`/user-profile/${scope.row.id}`">{{
                  scope.row.name
                }}</router-link> -->
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column prop="" label="_" width="180">
            <template slot-scope="scope">
              <!-- both parent which has role student and admin can view and edit children data  -->
              <div class="td-actions">
                <el-button
                  v-tooltip.top-center="$t('show_child_info')"
                  @click="open_show_child_dialog(scope.row)"
                  class="btn text-primary btn-link btn-xs px-2"
                >
                  <i class="fa fa-eye"></i>
                </el-button>
                <el-button
                  class="border-0 px-2"
                  v-tooltip.top-center="$t('edit_child_info')"
                  @click="open_edit_child_dialog(scope.row)"
                  ><i class="fa fa-edit text-warning"></i>
                </el-button>

                <el-button
                  v-tooltip.top-center="$t('delete_child_info')"
                  @click="removeChild(scope.row.id)"
                  class="btn btn-danger btn-link btn-xs px-2"
                >
                  <i class="fa fa-trash"></i>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </template>
      </server-table>

      <!-- Groups table -->
      <server-table
        v-if="hasRole('teacher')"
        v-loading="$store.getters['groups/load']"
        :count="count"
        :DataItems="groupsData"
        @Refresh="$emit('refresh')"
        :title="$t('groups')"
        :action="false"
        is_local
        :enable_export="false"
        :useFilter="false"
      >
        <template #columns>
          <!-- <el-table-column
            prop="name"
            sortable
            :label="$t('Group_name')"
            min-width="120"openDialog
          >
          </el-table-column> -->
      <el-table-column
            prop="name"
            :label="$t('Group_name')"
            min-width="100"
          >
            <template slot-scope="scope">
              <span
                class="d-block text-right"

              >
                    <router-link   :to="`/groups/group/students/${scope.row.id}`" >
                        {{ scope.row.name }}
                    </router-link>

              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="days"
            :label="$t('Global.days')"
            min-width="100"
          >
            <template slot-scope="scope">
              <span
                class="border-bottom border-secondary d-block text-right"
                v-for="day in scope.row.days"
                :key="day.id"
              >
                {{ day }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="course_name"
            sortable
            :label="$t('Global.course_name')"
            min-width="120"
          >
          </el-table-column>

          <el-table-column
            prop="start_from"
            sortable
            :label="$t('Global.start_from')"
            width="130"
          >
            <template slot-scope="scope">
              {{
                scope.row.start_from
                  ? toLocalDatetime(scope.row.start_from, "en")
                  : "_"
              }}
            </template>
          </el-table-column>

          <el-table-column
            prop="end_at"
            sortable
            :label="$t('Global.end_at')"
            width="130"
          >
            <template slot-scope="scope">
              {{
                scope.row.end_at ? toLocalDatetime(scope.row.end_at, "en") : "_"
              }}
            </template>
          </el-table-column>

          <el-table-column
            prop="age_group"
            sortable
            :label="$t('Global.age_group')"
            width="130"
          >
            <template slot-scope="scope">
              {{ getAgeGroup(scope.row.age_group) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="zoom_link"
            sortable
            :label="$t('Global.zoom_link')"
            min-width="120"
          >
          </el-table-column>

          <el-table-column
            prop="promo_code"
            sortable
            :label="$t('Global.promo_code')"
            min-width="100"
          >
          </el-table-column>

          <el-table-column prop="" label="_" width="80">
            <template slot-scope="scope">
              <div class="d-flex justify-content-between">
                <!-- edit group  -->
                <i
                  class="fa fa-edit text-info"
                  style="cursor: pointer"
                  @click="open_edit_group_dialog(scope.row)"
                  v-tooltip.top-center="$t('Edit_Group')"
                ></i>
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->
                <!-- activate & deactivate  -->

                <i

                  v-tooltip.top-center="$t('Delete_Group')"
                  class="fa fa-trash text-danger"
                  @click="deleteGroup(scope.row.id)"
                ></i>
              </div>
            </template>
          </el-table-column>
        </template>
      </server-table>
    </card>

    <!-- add child Dialog  -->
    <el-dialog
      :title="$t('add_child')"
      width="70%"
      :visible.sync="add_child_dialog"
      top="4vh"
      class="text-right"
    >
      <el-form
        v-loading="$store.getters['user/usersLoad']"
        :model="addChildData"
        ref="addChildRef"
        :rules="addChildRules"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="24" :md="12">
            <el-form-item :label="$t('image')" prop="image" class="file_input">
              <i class="fa fa-file-image-o fa-2x"></i>
              <input
                type="file"
                @change="upload_add_child_file"
                ref="new_child_file"
              />
              <div class="el-input__inner input_file_placeholder">
                <!-- this to show file name to user since we hide original input for styling -->
                {{ this.add_child_file_name }}
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('third_name')" prop="name">
              <el-input
                v-model="addChildData.name"
                style="width: 100%"
                :placeholder="$t('Global.name')"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('gender')" prop="">
              <el-radio-group v-model="addChildData.gender">

                <el-radio :label="0">{{ $t("Global.gender_1") }}</el-radio>
                <el-radio :label="2">{{ $t("Global.gender_2") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

                <el-col :span="12">
            <el-form-item :label="$t('Global.birthdate')" prop="">
              <el-date-picker
                v-model="addChildData.birthdate"
                type="date"
                :placeholder="$t('Global.birthdate')"
                :picker-options="datePickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
       <el-col :span="24" :md="12">
            <el-form-item label="المدينة " prop="city">
              <el-input
                v-model="addChildData.city"
                style="width: 100%"
                placeholder="المدينة"
              ></el-input>
            </el-form-item>

          </el-col>



          <el-col :span="24" :md="12">
            <el-form-item label="اللغة الأم " prop="language">
              <select class="language_select" v-model="addChildData.language">
                <option v-for="item in language_options">
                  {{ item }}
                </option>
              </select>
            </el-form-item>
          </el-col>



   

  <el-col :span="24" :md="12">
            <el-form-item label=" اللغة الأخرى" prop="second_language">
              <select
                v-model="addChildData.second_language"
                class="language_select_two"
                :disabled="sec_lang==0 || sec_lang==null"
              >
                <option v-for="item in language_options2">
                  {{ item }}
                </option>
              </select>
            </el-form-item>

          </el-col>

   
               <el-col :span="24" :md="12">
            <el-form-item label="هل يجيد الطفل لغة ثانية تحدث وكتابة؟" prop="check_lang">
              <el-radio-group v-model="sec_lang">
                <el-radio :label="0">لا</el-radio>
                <el-radio :label="1">نعم</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
               <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.my_info')" >
              <el-input
              class="w-100"
                type="textarea"
                v-model="addChildData.about_me"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :md="12">
            <el-form-item label="البلد " prop="country">
              <el-input
                v-model="addChildData.country"
                style="width: 100%"
                placeholder="البلد"
              ></el-input>
            </el-form-item>
          </el-col>
     
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="
          dialog-footer
          w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto
        "
        dir="ltr"
      >
        <el-button
          class="text-center ml-lg-2 mx-auto d-block w-100 my-1"
          @click="add_child_dialog = false"
          >{{ $t("cancel") }}
        </el-button>
        <el-button
          class="
            text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1
          "
          type="primary"
          @click="add_child"
          >{{ $t("add_child") }}</el-button
        >
      </span>
    </el-dialog>

    <!-- Show User Dialog  -->
    <el-dialog
      :title="$t('show_child_info')"
      width="70%"
      :visible.sync="show_child_dialog"
      top="4vh"
      class="text-right"
    >
      <el-row :gutter="20">
        <el-col :span="24" :md="15">
          <!-- Info table  -->
          <Info :items="this.shown_child_data" dir="rtl"></Info>
        </el-col>
        <el-col :span="24" :md="9">
          <img
            class="w-100"
            :src="image(this.child_image, this.shown_child_data.gender)"
            :alt="this.shown_child_data.name"
          />
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="
          dialog-footer
          w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto
        "
        dir="ltr"
      >
        <el-button
          class="text-center ml-lg-2 mx-auto d-block w-100 my-1"
          @click="show_child_dialog = false"
          >اغلاق
        </el-button>
      </span>
    </el-dialog>

    <!-- Edit User Dialog  -->
    <el-dialog
      :title="$t('edit_child_info')"
      width="70%"
      :visible.sync="edit_user_dialog"
      top="4vh"
      class="text-right"
    >
      <el-form
        v-loading="$store.getters['user/usersLoad']"
        :model="editUser"
        ref="editedUserRef"
        :rules="editedUserRules"
        label-position="top"
      >
        <el-row :gutter="20">
          <!-- child does not have an email so hide if editing child not the signed in user -->
          <!-- <el-col :span="24" :md="12" v-if="user.email == editUser.email">
            <el-form-item label="البريد الالكتروني" prop="email">
              <el-input
                v-model="editUser.email"
                style="width: 100%"
                placeholder="البريد الالكتروني"
              ></el-input>
            </el-form-item>
          </el-col> -->

       

          <!-- <el-col :span="24" :md="12">
<label for="" class="mt-5">الجنس</label>
            <p v-if=" editUser.gender == 0"> {{
                  $t("Global.gender_1")
                }}</p>
            <p v-if="editUser.gender == 2 || editUser.gender == 1">{{
                  $t("Global.gender_2")
                }}</p> -->
   <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.gender')" prop="gender">
            
                <el-input v-if=" editUser.gender == 0"  placeholder="ذكر" readonly/>
                <el-input  v-if="editUser.gender == 2 || editUser.gender == 1" placeholder="انثى" readonly />

            </el-form-item>
            <!-- <label for="" class="mt-4">{{$t('Global.gender')}}</label>
            <p v-if="editUser.gender == 1 || editUser.gender == 2" >{{$t('Global.gender_2')}}</p>
            <p v-if="editUser.gender == 0"> {{$t('Global.gender_1')}}</p> -->

          </el-col>
          <!-- take full width if editing child not the signed in user since email field is hidden -->
          <!-- <el-col :span="24" :md="user.email == editUser.email ? 12 : 24"> -->
          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.name')" prop="name">
              <el-input
                v-model="editUser.name"
                style="width: 100%"
                :placeholder="$t('Global.name')"
              ></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="24" :md="12">
            <el-form-item label="المسمي الوظيفي" prop="job_title">
              <el-input
                v-model="editUser.job_title"
                style="width: 100%"
                placeholder="المسمي الوظيفي"
              ></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="24" :md="12">

            <el-form-item :label="$t('Global.country')" prop="country">
              <el-input
                v-model="editUser.country"
                style="width: 100%"
                :placeholder="$t('Global.country')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :md="12">
            <el-form-item label="رقم التليفون" prop="country">
              <el-input
                v-model="editUser.mobile_no"
                style="width: 100%"
                placeholder="رقم التليفون"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item label="المدينة " prop="city">
              <el-input
                v-model="editUser.city"
                style="width: 100%"
                placeholder="المدينة"
              ></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.my_info')">
              <el-input type="textarea" v-model="editUser.about_me"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="
          dialog-footer
          w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto
        "
        dir="ltr"
      >
        <el-button
          class="text-center ml-lg-2 mx-auto d-block w-100 my-1"
          @click="edit_user_dialog = false"
          >{{ $t("cancel") }}
        </el-button>
        <el-button
          class="
            text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1
          "
          type="primary"
          @click="editedUserType == 'childUser' ? editChild() : save()"
          >{{ $t("save") }}
        </el-button>
      </span>
    </el-dialog>

    <!-- Edit Group Dialog  -->
    <el-dialog
      :title="$t('Edit_Group')"
      width="70%"
      :visible.sync="edit_group_dialog"
      top="4vh"
      class="text-right"
    >
      <el-form
        :model="editedGroup"
        ref="editedGroupRef"
        :rules="editedGroupRules"
        label-position="top"
        v-loading="$store.getters['groups/load']"
      >
        <el-row :gutter="20">
          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.days')" prop="days">
              <el-select
                v-model="editedGroup.days"
                clearable
                :placeholder="$t('Global.days')"
                style="width: 100%"
                multiple
              >
                <el-option
                  v-for="(item, index) in days"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Group_name')" prop="name">
              <el-input
                v-model="editedGroup.name"
                style="width: 100%"
                :placeholder="$t('Group_name')"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.age_group')" prop="age_group">
              <el-select
                v-model="editedGroup.age_group"
                clearable
                :placeholder="$t('Global.age_group')"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in ageList"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12" prop="course_id">
            <el-form-item :label="$t('courses')" prop="course_id">
              <el-select
                v-model="editedGroup.course_id"
                clearable
                :placeholder="$t('courses')"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in $store.getters['courses/courses']"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.start_from')" prop="start_from">
              <el-date-picker
                v-model="editedGroup.start_from"
                type="date"
                :placeholder="$t('Global.start_from')"
                format="DD/MM/yy"
                :picker-options="datePickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24" :md="12">
            <el-form-item :label="$t('Global.end_at')" prop="end_at">
              <el-date-picker
                v-model="editedGroup.end_at"
                type="date"
                :placeholder="$t('Global.end_at')"
                format="DD/MM/yy"
                :picker-options="datePickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item :label="$t('Global.zoom_link')">
              <el-input
                v-model="editedGroup.zoom_link"
                style="width: 100%"
                :placeholder="$t('Global.zoom_link')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="
          dialog-footer
          w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto
        "
        dir="ltr"
      >
        <el-button
          class="text-center ml-lg-2 mx-auto d-block w-100 my-1"
          @click="edit_group_dialog = false"
          >{{ $t("cancel") }}
        </el-button>
        <el-button
          class="
            text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1
          "
          type="primary"
          @click="edit"
        >
          {{ $t("save") }}</el-button
        >
      </span>
    </el-dialog>

    <!-- student activity Dialog  -->
    <!--
      Comment to the Developer:
      According to client requirment, depending on Activity Status a different view will be rendered in this dialog:

      - Accpeted: show image, parent comments (message), teacher notes (feedback) without ability to edit + teacher_rate and activity evaluation with abilty to edit to evaluate the activity and the teacher

      - Pending: show image and parent comments with ability to edit to allow parent to edit the child activity before teacher evaluation

      - Resubmit: show image and parent with ability to edit

      - need to know from the client whta to do with "accepted with modificaiton" status
     -->
    <el-dialog
      :title="$t('show_child_activity')"
      width="70%"
      :visible.sync="activity_dialog"
      top="4vh"
      class="text-right p-5"
    >
      <el-row :gutter="20" v-loading="$store.getters['courses/load']">
        <!-- take full width unless activity status is accepted  -->
        <el-col
          :lg="studentActivity.status == 1 ? 12 : 24"
          class="d-flex align-items-center flex-column"
        >
          <!-- activity image  -->
          <img
            :lazy-src="child_activity_image_source"
            :src="child_activity_image_source"
            :alt="studentActivity.name"
            style="max-height: 30rem; max-width: 100%"
            class="mb-2"
          />
          <!-- enable editing if activity status is pending, if not disable editing  -->
          <div class="file_input w-100 my-3" v-if="studentActivity.status == 0">
            <i class="fa fa-file-image-o fa-2x"></i>
            <input
              type="file"
              @change="upload_child_activity_file"
              ref="child_activity_file"
            />
            <div class="el-input__inner input_file_placeholder">
              <!-- this to show file name to user since we hide original input for styling -->
              {{ this.child_activity_file_name }}
            </div>
          </div>

          <!-- message  -->
          <div class="w-100">
            <p class="h3">{{ $t("parent_notes") }}</p>
            <!-- enable editing if activity status is pending, if not disable editing  -->
            <el-input
              v-if="studentActivity.status == 0"
              class="p-2 bg-light"
              type="textarea"
              v-model="studentActivity.message"
            ></el-input>
            <p v-else>{{ studentActivity.message }}</p>
          </div>
          <!-- feedback  -->
          <!-- show if activity status is accpeted  -->
          <div v-if="studentActivity.status == 1" class="w-100">
            <p class="h3">{{ $t("teacher_comment") }}</p>
            <p>
              {{ studentActivity.feedback }}
            </p>
          </div>
        </el-col>
        <!-- show only if activity status is accepted  -->
        <el-col
          :lg="12"
          v-if="studentActivity.status == 1"
          class="d-flex align-items-center flex-column"
        >
          <!-- course name  -->
          <p class="h3">
            {{ $t("Global.course_name") }}

            <router-link :to="`/course/${studentActivity.parent_id}`">
              {{ studentActivity.course }}</router-link
            >
          </p>

          <!-- status  -->

          <el-badge
            :value="activityStatus(studentActivity.status).value"
            :type="activityStatus(studentActivity.status).type"
            class="mb-3"
          >
          </el-badge>

          <i class="fa fa-shield text-warning"></i>
          <p class="h3 m-0">
            {{ labels[studentActivity.badge_id - 1] }}
          </p>

          <!-- rate  -->
          <div class="d-flex flex-column">
            <!-- activity evaluation  -->
            <div class="mb-5">
              <p class="h3">{{ $t("my_evaluation") }}</p>
              <!-- disable editing for admin  -->
              <el-rate
                :disabled="!hasRole('student')"
                class="activity-rate d-block"
                v-model="studentActivity.rate"
                :colors="['#f00', '#ffd400', '#0f0']"
              >
              </el-rate>
              <span
                class="d-flex justify-content-between"
                style="font-size: 2rem; margin-top: 2rem; position: relative"
              >
                <span style="position: absolute; right: -3rem">{{
                  $t("boring")
                }}</span>
                <span style="position: absolute; left: -3rem">{{
                  $t("very_interesting")
                }}</span>
              </span>
            </div>

            <!-- teacher evaluation  -->
            <div class="mb-5">
              <p class="h3">{{ $t("teacher_advice") }}</p>
              <el-rate
                :disabled="!hasRole('student')"
                class="activity-rate d-block"
                v-model="studentActivity.teacher_rate"
                :colors="['#f00', '#ffd400', '#0f0']"
              >
              </el-rate>
              <span
                class="d-flex justify-content-between"
                style="font-size: 2rem; margin-top: 2rem; position: relative"
              >
                <span style="position: absolute; right: -3rem"
                  >{{ $t("not_useful") }}
                </span>
                <span style="position: absolute; left: -3rem">
                  {{ $t("very_useful") }}</span
                >
              </span>
            </div>
          </div>
        </el-col>
      </el-row>

      <span
        slot="footer"
        class="
          dialog-footer
          w-50
          flex-column flex-lg-row
          d-md-flex
          my-3
          mr-auto
        "
        dir="ltr"
      >
        <el-button
          class="text-center ml-lg-2 mx-auto d-block w-100 my-1"
          @click="activity_dialog = false"
          >{{ $t("close") }}
        </el-button>
        <!-- hide for admin to prevent modifying or sending unauthorized requests to server   -->
        <el-button
          v-if="studentActivity.status != 3"
          class="
            text-center
            px-4 px-lg-3
            ml-lg-2
            mx-auto
            d-block
            text-capitalize
            w-100
            my-1
          "
          type="primary"
          @click="saveStudentActivityChanges"
          >{{ $t("save_eval") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Info from "../../../../components/Cards/Info.vue";
import ServerTable from "../../../../components/DataTablePagination.vue";
import Button from "../../../../pages/Dashboard/Components/Buttons.vue";
import Swal from "sweetalert2";
import { Auth } from "../../../../utils/auth";

export default {
  name: "show",

  components: {
    Info,
    Button,
    ServerTable
  },
  data() {
    return {
      // show uchild data
      sec_lang:null,
      second_language: null,
      mother_language: null,

      active: `$t('active')`,
      show_child_dialog: false,
      child_image: null, // this used to show child profile but no need to be viewed at Info table. To view open show child dialog
      shown_child_data: {},
      // edit user dialog data
      editUser: {},
      // used to set which API to use on editing data. Values: childUSer where user editing his own data || noChildUser when parent editing child or admin editing other user
      editedUserType: "",
      edit_user_dialog: false,

      editedUserRules: {
        name: [
          {
            required: true,
            message: this.$t("name_required"),
            trigger: "blur"
          }
        ],
        // email: [
        //   {
        //     required: true,
        //     message: "يجب ادخال البريد الالكتروني",
        //     trigger: "blur",
        //   },
        // ],
        country: [
          {
            required: true,
            message: this.$t("country_required"),
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: this.$t("gender_required"),
            trigger: "change"
          }
        ],
        // type: [
        //   {
        //     required: true,
        //     message: "يجب اختيار المهنة",
        //     trigger: "change",
        //   },
        // ],
        // job_title: [
        //   {
        //     required: true,
        //     message: "يجب ادخال المسمي الوظيفي",
        //     trigger: "change",
        //   },
        // ],
      
      },
      datePickerOptions: {
        disabledDate(date) {
          return date > new Date();
        }
      },

      // add child data
      add_child_dialog: false,
      addChildData: {},
      // this to show file name to user since we hide original input for styling
      add_child_file_name: "",
      addChildRules: {
        name: [
          {
            required: true,
            message: this.$t("name_required"),
            trigger: "blur"
          }
        ],

        gender: [
          {
            required: true,
            message: this.$t("gender_required"),
            trigger: "change"
          }
        ],

        birthdate: [
          {
            required: true,
            message: this.$t("birthdate_required"),
            trigger: "change"
          }
        ]
      },

      // children activities table data
      labels: [
        this.$t("no_eval"),
        this.$t("speed"),
        this.$t("perfection"),
        this.$t("quality"),
        this.$t("excellence")
      ],

      // edit group for edit dialog
      edit_group_dialog: false,
      editedGroup: {},
      datePickerOptions: {
        disabledDate(date) {
          return date > new Date();
        }
      },
      days: [
        this.$t("sunday"),
        this.$t("monday"),
        this.$t("tuesday"),
        this.$t("wednesday"),
        this.$t("thursday"),
        this.$t("friday"),
        this.$t("saturday")
      ],
      language_options: [
        "Egnlish",
        "عربى",
        "español",
        "中國人",
        "русский",
        "français"
      ],
      language_options2: [
        "Egnlish",
        "عربى",
        "español",
        "中國人",
        "русский",
        "français",
        "Duitse"
      ],

      ageList: [
        { id: 1, title: this.$t("less_than_6") },
        { id: 2, title: this.$t("from_6_to_8") },
        { id: 3, title: this.$t("from_9_to_12") },
        { id: 4, title: this.$t("more_than_13") },
        { id: 5, title: this.$t("all_ages") }
      ],
      editedGroupRules: {
        name: [
          {
            required: true,
            message: this.$t("course_name_required"),
            trigger: "blur"
          }
        ],
        days: [
          {
            required: true,
            message: this.$t("days_required"),
            trigger: "change"
          }
        ],
        course_id: [
          {
            required: true,
            message: this.$t("course_required"),
            trigger: "change"
          }
        ]
      },

      // show children activities data
      activity_dialog: false,
      studentActivity: {},
      child_activity_file_name: "",
      child_activity_image_source: "",
      labels: [
        this.$t("no_eval"),
        this.$t("speed"),
        this.$t("perfection"),
        this.$t("quality"),
        this.$t("excellence")
      ]
    };
  },
  mounted() {
    /* comment for developer:
  - this refresh method is used to fetch data of user.
  - We have already 2 servertables firing Refresh on render, but if user
  does not have children nor children activites then, it may not fetch data user
  */
    this.$emit("refresh");
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },

    // chidl activities table computed
    // childActivities() {
    //   return this.$store.getters["user/tasks"];
    // },
    // childActivitiesCount() {
    //   return this.$store.getters["user/tasks"].length;
    // },

    // children table computed
    children() {
      // console.log( this.$store.getters["user/child"]);
      return this.$store.getters["user/child"];
    },
    childrenCount() {
      return this.$store.getters["user/child"].length;
    },

    // groups table computed
    groupsData() {
      return this.$store.getters["groups/groups"];
    },
    count() {
      return this.$store.getters["groups/count"];
    }
  },
  methods: {
    openDialog()
    {
      this.add_child_dialog = true; 
      this.addChildData = {}
    },
    image(image, gender) {
      if (image) {
        return `https://edufunz.com/api/users/cover/${image}`;
      } else if (gender == "1") {
        return "/static/img/avater.png";
      } else {
        return "/static/img/avatar-female.png";
      }
    },
    // Show child methods
    open_show_child_dialog(items) {
      // console.log(items);
      this.show_child_dialog = true;
      // for child profile pic
      this.child_image = items.image;
      this.shown_child_data = Object.entries(items)
        .map(([key, value]) => {
          return { key, value };
        })
        .filter(
          item =>
            item.key !== "id" &&
            item.key !== "parent_id" &&
            item.key !== "job_title" &&
            item.key !== "type" &&
            item.key !== "image" &&
            item.key !== "class" &&
            item.key !== "removed" &&
            item.key !== "skills" &&
            item.key !== "email" &&
            item.key !== "child_task" &&
            item.key !== "language"
        );
    },
    // edit user methods
    open_edit_dialog() {
      // set edited user type to determine which API to use
      this.editedUserType = "noChildUser";
      // copy data to prevent save data temporarly if user close dialog without saving
      this.editUser = { ...this.user };
      this.edit_user_dialog = true;
    },

    save() {
      this.$refs["editedUserRef"].validate(valid => {
        if (valid) {
          // delete this.editUser.child_task;
          this.$store
            .dispatch("user/save", {
              query: this.editUser
            })
            .then(() => {
              this.$emit("refresh");

              // if user is editing his own data
              if (!this.$route.params.id) {
                Auth(JSON.stringify(this.editUser));
                // force reload to apply name chnages to the sidebar name
                this.$router.go("/profile");
              }

              this.edit_user_dialog = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // add new child methods
    upload_add_child_file() {
      // this to show file name to user since we hide original input for styling
      this.add_child_file_name = this.$refs["new_child_file"].files[0].name;

      // console.log(formData.getAll("file"));
    },

    add_child() {
      this.$refs["addChildRef"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (let key in this.addChildData) {
            formData.append(`${key}`, this.addChildData[key]);
          }
          // adding image
          formData.append("image", this.$refs["new_child_file"].files[0]);
          this.$store.dispatch("user/addChild", formData).then(_ => {
            this.$emit("refresh");
            this.add_child_dialog = false;
           
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },

    // children table methods
    activityStatus(status) {
      switch (status) {
        case 1:
          return {
            value: "Accepted",
            type: "success"
          };
        case 2:
          return {
            value: "Accepted With Modification",
            type: "warning"
          };
        case 3:
          return {
            value: "Resubmit",
            type: "danger"
          };
        default:
          return {
            value: "Pending",
            type: "warning"
          };
      }
    },

    // edit child
    open_edit_child_dialog(item) {
      // set edited user type to determine which API to use
      this.editedUserType = "childUser";
      // copy data to prevent save data temporarly if user close dialog without saving
      this.editUser = {
        id: item.id,
        name: item.name,
        country: item.country,
        birthdate: item.birthdate,
        gender: item.gender,
        about_me: item.about_me,
        pre_exam: item.pre_exam,
        mobile_no: item.mobile_no,
        city: item.city
        // language : this.mother_language,
        // second_language : this.second_language,

        // country : item.country
      };
      this.edit_user_dialog = true;
    },
    editChild() {
      this.$refs["editedUserRef"].validate(valid => {
        if (valid) {
          delete this.editUser.child_task;
          this.$store
            .dispatch("user/editChild", {
              query: this.editUser
            })
            .then(() => {
              this.$emit("refresh");
              this.edit_user_dialog = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // remove child
    removeChild(id) {
      Swal.fire({
        title: this.$t("confirm_child_delete"),
        text: this.$t("ask_for_delete"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        buttonsStyling: false
      }).then(date => {
        if (date.isConfirmed) {
          this.$store.dispatch("user/delete", id).then(_ => {
            this.$emit("refresh");
            Swal.fire({
              title: this.$t("deleted"),
              text: this.$t("child_deleted"),
              icon: "success",
              confirmButtonClass: "btn btn-success btn-fill",
              buttonsStyling: false
            });
          });
        }
      });
    },

    saveStudentActivityChanges() {
      // console.log(this.studentActivity);
      this.$store
        .dispatch("courses/evaluation", {
          id: this.studentActivity.id,
          query: {
            feedback: this.studentActivity.feedback,
            status: this.studentActivity.status,
            rate: this.studentActivity.rate,
            teacher_rate: this.studentActivity.teacher_rate
          }
        })
        .then(_ => {
          this.$emit("refresh");
          this.activity_dialog = false;
        });
    },

    // show student activities methods
    open_activity_dialog(item) {
      this.activity_dialog = true;
      // pass only data needed for the dialog
      this.studentActivity = {
        id: item.id,
        name: item.name,
        message: item.message,
        feedback: item.feedback,
        parent_id: item.parent_id,
        course: item.course,
        status: item.status,
        rate: item.rate,
        grade: item.grade
      };

      this.child_activity_image_source = `https://edufunz.com/api/evaluation/content/${item.id}`;
    },

    upload_child_activity_file() {
      // this to show file name to user since we hide original input for styling
      this.child_activity_file_name = this.$refs[
        "child_activity_file"
      ].files[0].name;
      // console.log(this.$refs["child_activity_file"].files[0]);

      // preview image
      // source : https://codepen.io/chenuin/pen/MdvyjG?editors=1011
      let reader = new FileReader();
      reader.onload = e => (this.child_activity_image_source = e.target.result);
      reader.readAsDataURL(this.$refs["child_activity_file"].files[0]);
    },

    // remove child activity
    removeActivity(id) {
      Swal.fire({
        title: this.$t("confirm_delete_activity"),
        text: this.$t("ask_delete_activity"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        buttonsStyling: false
      }).then(date => {
        if (date.isConfirmed) {
          this.$store.dispatch("courses/evaluationDelete", id).then(_ => {
            this.$emit("refresh");
            Swal.fire({
              title: this.$t("deleted"),
              text: this.$t("activity_deleted"),
              icon: "success",
              confirmButtonClass: "btn btn-success btn-fill",
              buttonsStyling: false
            });
          });
        }
      });
    },

    // Groups table methods

    getAgeGroup(id) {
      switch (id) {
        case 1:
          return this.$t("less_than_6");
        case 2:
          return this.$t("from_6_to_8");
        case 3:
          return this.$t("from_9_to_12");
        case 4:
          return this.$t("more_than_13");
        default:
          return this.$t("all_ages");
      }
    },

    open_edit_group_dialog(item) {
      this.editedGroup = item;
      this.edit_group_dialog = true;
    },
    edit() {
      this.$refs["editedGroupRef"].validate(valid => {
        if (valid) {
          // remove unused properties since it is need at the database and will cause error
          delete this.editedGroup.course_name;
          delete this.editedGroup.course_image;
          this.$store
            .dispatch("groups/updateGroup", {
              data: this.editedGroup,
              id: this.editedGroup.id
            })
            .then(_ => {
              this.$emit("refresh");
              this.edit_group_dialog = false;
            });
        } else {
          console.log("erorr");
          return false;
        }
      });
    },

    deleteGroup(id) {
      Swal.fire({
        title: this.$t("confirm_group_delete"),
        text: this.$t("ask_for_delete_group"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        buttonsStyling: false
      }).then(date => {
        if (date.isConfirmed) {
          this.$store.dispatch("groups/deleteGroup", id).then(_ => {
            this.$emit("refresh");
            Swal.fire({
              title: this.$t("deleted"),
              text: this.$t("group_deleted"),
              icon: "success",
              confirmButtonClass: "btn btn-success btn-fill",
              buttonsStyling: false
            });
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.cover
{
   max-width: 100%;
    max-height: 100%;
}
.label {
  border-radius: 50%;
  margin: 0.5rem;
  width: 5rem;
  height: 5rem;
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.8;
  color: white;
}

.letter {
  font-size: 40px;
}

.border {
  border: 2px solid white !important;
}

.number {
  line-height: 1;
}

.card.score .card-body {
  padding: 0.7rem 0 !important;
}

.card label {
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: unset;
}

.el-collapse {
  border-top: 1px solid #ebeef5;
  border-bottom: 0px;
}

i {
  cursor: pointer;
}

.fa {
  font-size: 1rem;
}

::v-deep .el-icon-arrow-right:before {
  content: "\e6de";
}

::v-deep .cell {
  text-align: right;
  word-break: break-word;
}

::v-deep sup {
  top: 0;
}

::v-deep sup.el-badge__content {
  height: unset;
  padding: 5px 20px;
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

/* form select inputs  */
.el-select-dropdown__item {
  padding: 5px 40px;
  text-align: right;
}

/* style for file input  */
.file_input {
  position: relative;
}
.input_file_placeholder {
  position: absolute;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  width: calc(100% - 2em);
}

.input_file_placeholder::before {
  content: "";
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: 10;
  right: 0;
}

.fa-shield {
  font-size: 5rem;
}

/* rate icons  */
::v-deep .activity-rate .el-icon-star-on:before {
  font-size: 3rem;
}
/* ::v-deep .activity-rate .fa-frown-o:before {
  font-size: 3rem;
}
::v-deep .activity-rate .fa-meh-o:before {
  font-size: 3rem;
}
::v-deep .activity-rate .fa-smile-o:before {
  font-size: 3rem;
}
::v-deep .activity-rate .fa-meh-o:before {
  font-size: 3rem;
} */

::v-deep .activity-rate .el-icon-star-off:before {
  font-size: 3rem;
}

::v-deep .el-rate__text {
  margin-right: 1rem;
  font-size: 2rem;
  min-width: 10rem;
}

/* style for file input  */
.file_input {
  position: relative;
}
.input_file_placeholder {
  position: absolute;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  width: calc(100% - 2em);
}

.input_file_placeholder::before {
  content: "";
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: 10;
  right: 0;
}
.language_select  {
    width: 100%;
    border: 1px solid #dcdfe6;
    background-color: white;
    padding: 10px 0px;
    border-radius: 5px;
}
.language_select_two
{  
    border: 1px solid #dcdfe6;
    background-color: white;
padding: 5px;
width:100%;
    border-radius: 5px;

}
</style>
