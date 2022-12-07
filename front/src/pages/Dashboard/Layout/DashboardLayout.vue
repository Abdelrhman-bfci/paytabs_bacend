<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar>
      <!--            <user-menu></user-menu>-->
      <!--            <mobile-menu></mobile-menu>-->
      <template slot="links">
        <!-- main page  -->
        <sidebar-item
          v-if="hasPermission('access_dashboard')"
          :link="{
            name: `${this.$t('main_page')}`,
            icon: 'nc-icon nc-chart-pie-35',
            path: '/overview',
          }"
        ></sidebar-item>
        <!-- profile page  -->
        <sidebar-item
          v-if="auth()"
          :link="{
            name: `${auth().name}`,
            icon: 'fa fa-user',
            path: '/profile',
          }"
        >
        </sidebar-item>
        <!-- new teachers  -->
        <sidebar-item
          v-if="hasPermission('access_users')"
          :link="{
            name: 'طلبات المدرسين',
            icon: 'fa fa-users',
            path: '/teachers',
          }"
          :requestsNum="$store.getters['roles/non_active_count']"
        ></sidebar-item>
        <!-- teachers  -->
        <sidebar-item
          v-if="hasPermission('access_teacher')"
          :link="{
            name: 'المدرسين الحاليين',
            icon: 'fa fa-users',
            path: '/active_teacher',
          }"
        ></sidebar-item>
        <!-- courses  -->
        <sidebar-item
          v-if="hasPermission('access_courses')"
          :link="{
            name: `${this.$t('courses')}`,
            icon: 'fa fa-book',
            path: '/courses',
          }"
        ></sidebar-item>
        <!-- MY courses  -->
        <sidebar-item
          v-if="hasPermission('course_auth')"
          :link="{
            name: `${this.$t('My_groups')}`,
            icon: 'fa fa-book',
            path: '/auth/courses',
          }"
        ></sidebar-item>
        <!-- group requests  -->
        <sidebar-item
          v-if="hasPermission('access_users')"
          :link="{
            name: `${this.$t('Group_requests')}`,
            icon: 'fa fa-users',
            path: '/course/requests',
          }"
          :requestsNum="$store.getters['roles/course_count']"
        ></sidebar-item>

        <!-- my students  -->
        <!-- <sidebar-item
          v-if="hasPermission('student_auth')"
          :link="{
            name: 'طلابي',
            icon: 'fa fa-users',
            path: '/auth/student',
          }"
        ></sidebar-item> -->
        <!-- my group  -->
        <sidebar-item
          v-if="hasPermission('access_group')"
          :link="{
            name: `${this.$t('my_groups')}`,
            icon: 'fa fa-users',
            path: '/auth/groups',
          }"
          :requestsNum="$store.getters['roles/task_count']"
        ></sidebar-item>
        <!-- groups  -->
        <sidebar-item
          v-if="hasPermission('all_groups')"
          :link="{
            name: `${this.$t('groups')}`,
            icon: 'fa fa-users',
            path: '/groups',
          }"
        ></sidebar-item>
        <!-- users  -->
        <sidebar-item
          v-if="hasPermission('access_users')"
          :link="{
            name: `${this.$t('users')}`,
            icon: 'fa fa-users',
            path: '/users',
          }"
        ></sidebar-item>
        <!-- roles  -->
        <sidebar-item
          v-if="hasPermission('access_roles')"
          :link="{
            name: `${this.$t('Roles')}`,
            icon: 'fa fa-cog',
            path: '/roles',
          }"
        ></sidebar-item>
        <!-- messages  -->
        <sidebar-item
          :link="{
            name: `${this.$t('messages')}`,
            icon: 'fa fa-comments',
            path: '/message',
          }"
        ></sidebar-item>

        <!-- exams -->

        <sidebar-item
          :link="{
            name: `${this.$t('Exams')}`,
            icon: 'fa fa-user',
            path: '/exams',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="hasPermission('access_users')"
          :link="{
            name: `${this.$t('results')}`,
            icon: 'fa fa-user',
            path: '/score',
          }"
        ></sidebar-item>

        <!-- <sidebar-item
            v-if="hasPermission('access_users')"
          :link="{
            name:'معرض الصور',
            icon: 'fa fa-user',
            path: '/gallery',
          }"
        >
        </sidebar-item> -->
        <sidebar-item
          v-if="hasPermission('access_roles')"
          :link="{
            name: `${this.$t('feedback')}`,
            icon: 'nc-icon nc-paper-2',
            path: '/feedback',
          }"
        ></sidebar-item>
        <sidebar-item
          v-if="hasPermission('access_roles')"
          :link="{
            name: `صور من الهواتف`,
            icon: 'nc-icon nc-paper-2',
            path: '/photo-gallery',
          }"
        ></sidebar-item>
        <!-- logout  -->
        <sidebar-item
          :link="{
            name: `${this.$t('logout')}`,
            icon: 'fa fa-sign-out',
            path: '/logout',
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel" v-loading="$store.getters['roles/rolesLoad']">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
// import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    // UserMenu
  },

  watch: {
    $route(to, from) {
      if (this.auth() && this.auth().id) {
        this.$store.dispatch(
          "roles/getAuthUserRolesPermissions",
          this.auth().id
        );
      }
    },
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },

    initScrollbar() {
      // let docClasses = document.body.classList;
      // let isWindows = navigator.platform.startsWith('Win');
      // if (isWindows) {
      //   // if we are on windows OS we activate the perfectScrollbar function
      //   initScrollbar('main-panel');
      //
      //   docClasses.add('perfect-scrollbar-on');
      // } else {
      //   docClasses.add('perfect-scrollbar-off');
      // }
    },
  },

  mounted() {
    // this.initScrollbar()
    if (this.auth()) {
      this.$store.dispatch("roles/getAuthUserRolesPermissions", this.auth().id);
    }
  },
};
</script>

<style>
.swal2-container.swal2-bottom,
.swal2-container.swal2-center,
.swal2-container.swal2-top {
  grid-template-columns: auto minmax(0, 1fr) auto;
  z-index: 100000;
}
</style>

<style scoped>
.main-panel {
  background: rgba(203, 203, 210, 0.15) !important;
  height: auto !important;
}
</style>
