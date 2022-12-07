import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: true,
  pathTitle: null,
  fileList: [],
  uploadProgress: null,
  barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
  barImage: "",
  drawer: null,
  backImgId: "",
  textImgId: "",
  picImgId: "",
  shapImgId: "",
  textcolor: "",
  filter: null
};

import userModule from "./modules/user";
import formModule from "./modules/form";
import groupsModule from "./modules/groups";

import feedbackModule from "./modules/feedback";
import roleModule from "./modules/role";
import logModule from "./modules/log";
import settingModule from "./modules/setting";
import courseModule from "./modules/courses";
import storyModule from "./modules/story";
import dashboardModule from "./modules/dashboard";

const store = new Vuex.Store({
  modules: {
    user: userModule,
    roles: roleModule,
    logs: logModule,
    courses: courseModule,
    setting: settingModule,
    story: storyModule,
    form: formModule,
    dashboard: dashboardModule,
    groups: groupsModule,
    feedback: feedbackModule
  },
  mutations: mutations,
  state: state,
  getters
});

export default store;
