// import Vue from 'vue';
// import Router from 'vue-router';
// import {isLogged, notHasPermissions} from '../utils/auth';


// Vue.use(Router);

// let router = new Router({
//   mode: 'history',
//   linkActiveClass: 'active',
//   scrollBehavior: () => ({y: 0}),
//   routes: configRoutes(),
// });

// // middleware
// router.beforeEach((to, from, next) => {

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     (!isLogged()) ? next({path: '/login', params: {nextUrl: to.fullPath}}) : next();
//   } else if (to.matched.length == 0) {
//     return next({path: '/404',});
//   } else {
//     next();
//   }

// });

// // Routes
// function configRoutes() {
//   return [
//     {

//       path: '/',
//       component: () => import('@/views/dashboard/Index'),
//       meta: {
//         requiresAuth: true,
//       },
//       children: [
//         {
//           name: 'الصفحة الرئيسية',
//           path: '',
//           component: () => import('@/views/dashboard/Dashboard'),
//         },
//         // Pages
//         // {
//         //   name: 'Activity',
//         //   path: 'test',
//         //   component: () => import('@/components/display/display.vue'),
//         // },
//         {
//           name: 'Activity',
//           path: 'test',
//           component: () => import('@/views/activity/index.vue'),
//         },
//         {
//           name: 'الصفحة الشخصية',
//           path: 'profile/:id?',
//           component: () => import('@/views/users/show'),
//           meta: {
//             requiresAuth: true,
//           },
//         },
//         {
//           name: 'المستخدمين',
//           path: 'users',
//           component: () => import('@/views/users/index'),
//         },
//         {
//           name: 'تعديل البيانات الشخصية',
//           path: 'edit-user/:id?',
//           component: () => import('@/views/users/edit'),
//         },
//         {
//           name: 'المدرسين الجدد',
//           path: 'teachers',
//           component: () => import('@/views/teachers/show'),
//         },
//         {
//           name: 'المدرسين',
//           path: '/active_teacher',
//           component: () => import('@/views/teachers/active'),
//         },
//         {
//           name: 'المراجعين',
//           path: 'auth/teachers',
//           component: () => import('@/views/teachers/index'),
//         },
//         {
//           name: 'طلبات الطلاب',
//           path: 'student/requests',
//           component: () => import('../views/teachers/request'),
//         },
//         {
//           name: 'دوراتى التعلمية',
//           path: 'auth/courses',
//           component: () => import('@/views/courses/index'),
//         },
//         {
//           name: 'طلابى',
//           path: 'auth/student',
//           component: () => import('@/views/teachers/student'),
//         },
//         {
//           name: 'مجموعاتي',
//           path: 'auth/groups',
//           component: () => import('@/views/teachers/groups'),
//         },
//         {
//           name: 'المجموعات',
//           path: 'groups',
//           component: () => import('@/views/groups/index'),
//         },
//         {
//           name: 'الدورات',
//           path: 'courses',
//           component: () => import('../views/courses/courses'),
//         },
//         {
//           name: 'طلبات المجموعات',
//           path: 'course/requests',
//           component: () => import('../views/courses/request'),
//         },
//         {
//           name: 'تفاصيل الدورة',
//           path: 'course/:id/:group_id?',
//           component: () => import('../views/courses/show'),
//         },
//         {
//           name: 'المهام والوظايف',
//           path: 'roles',
//           component: () => import('../views/permission/index'),
//         },
//         {
//           name: 'تصاريحات المستخدم',
//           path: 'users/permissions/:id',
//           component: () => import('../views/permission/show'),
//         },
//         {
//           name: 'الرسائل',
//           path: 'message',
//           component: () => import('../views/pages/Message'),
//         },
//         {
//           name: 'التغذية الاسترجاعية',
//           path: 'feedback',
//           component: () => import('../views/feedback/index'),
//         },
//         {
//           name: 'Notifications',
//           path: 'components/notifications',
//           component: () => import('@/views/dashboard/component/Notifications'),
//         },
//         {
//           name: 'Icons',
//           path: 'components/icons',
//           component: () => import('@/views/dashboard/component/Icons'),
//         },
//         {
//           name: 'Typography',
//           path: 'components/typography',
//           component: () => import('@/views/dashboard/component/Typography'),
//         },
//         // Tables
//         {
//           name: 'Regular Tables',
//           path: 'tables/regular-tables',
//           component: () => import('@/views/dashboard/tables/RegularTables'),
//         },
//         // Maps
//         {
//           name: 'Google Maps',
//           path: 'maps/google-maps',
//           component: () => import('@/views/dashboard/maps/GoogleMaps'),
//         },
//         // Upgrade
//         {
//           name: 'Upgrade',
//           path: 'upgrade',
//           component: () => import('@/views/dashboard/Upgrade'),
//         },
//         //course-groups
//         {
//           name: 'مجموعات الدورة',
//           path: 'course-groups/:id?',
//           component: () => import('@/views/courses/course-groups'),
//         },

//       ],
//     },
//     {
//       path: '/',
//       component: () => import('../views/dashboard/emptyLayout'),
//       children: [
//         {
//           path: '404',
//           name: 'Page404',
//           component: () => import('../views/pages/404'),
//         },
//         {
//           path: '401',
//           name: 'Page401',
//           component: () => import('../views/pages/401'),
//         },
//         {
//           name: 'Login',
//           path: 'Login',
//           component: () => import('@/views/pages/login'),
//         },
//         {
//           name: 'Intro',
//           path: 'intro',
//           component: () => import('@/views/pages/intro'),
//         },
//         {
//           name: 'activity',
//           path: 'activity',
//           component: () => import('@/views/activity/index'),
//         },
//         {
//           name: 'Story',
//           path: 'story',
//           component: () => import('@/views/pages/story'),
//         },
//         //reset_password
//         {
//           name: 'مجموعات الدورة',
//           path: 'reset-password/:token',
//           component: () => import('@/views/pages/ResetPassword'),
//         },
//         //Intro page
//      ,
//       ]
//     },
//   ];
// }

// export default router;
