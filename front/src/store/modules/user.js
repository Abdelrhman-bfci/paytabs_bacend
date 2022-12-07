import { login, logout, Register } from "../../api/auth"; // getInfo
import User from "../../api/user"; // getInfo
const FileDownload = require("js-file-download");
import {
  Auth,
  deleteToken,
  removeAuth,
  removeToken,
  resetPermission,
  setLogged,
  setToken
} from "../../utils/auth";

const user = new User();

const userModule = {
  namespaced: true,
  state: {
    auth: null,
    user: {},
    // userLoad: false,
    token: null,
    users: [],
    tasks: [],
    feedback: [],
    courses: [],
    usersLoad: false,
    alert: false,
    message: null,
    totalUsers: 0,
    requests: [],
    child: [],
    pre_exam:{}
  },
  getters: {
    pre_exam: state =>{ return state.pre_exam
    },
    child: state => {
      return state.child;
    },
    usersLoad: state => {
      return state.usersLoad;
    },
    alert: state => {
      return state.alert;
    },
    requests: state => {
      return state.requests;
    },
    message: state => {
      return state.message;
    },
    user(state) {
      return state.user;
      // return Object.entries(state.user)
      //   .map(([key, value]) => {
      //     return { key, value };
      //   })
      //   .filter(
      //     param =>
      //       param.key !== "id" &&
      //       param.key !== "removed" &&
      //       param.key !== "type" &&
      //       param.key !== "parent_id" &&
      //       param.key !== "about_me" &&
      //       param.key !== "image" &&
      //       param.key !== "job_title" &&
      //       param.key !== "skills" &&
      //       param.value !== null &&
      //       param.value !== "null"
      //   );
    },
    // userLoad(state) {
    //   return state.userLoad;
    // },
    tasks: state => state.tasks,
    users(state) {
      return state.users;
    },
    totalUsers(state) {
      return state.totalUsers;
    },
    courses(state) {
      return state.courses;
    },
    feedback(state) {
      return state.feedback;
    }
  },
  mutations: {
    SET_AUTH: (state, user) => {
      state.auth = user;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },

    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ALERT: (state, alert) => {
      state.alert = alert;
    },
    SET_MESSAGE: (state, message) => {
      state.message = message;
    },
    SET_TOTAL_USERS: (state, total) => {
      state.totalUsers = total;
    },
    SET_USERS_LOAD: (state, load) => {
      state.usersLoad = load;
    },
    SET_COURSES: (state, courses) => {
      state.courses = courses;
    },
    SET_TASKS: (state, tasks) => {
      state.tasks = tasks;
    },
    SET_FEEDBACK: (state, feedback) => {
      state.feedback = feedback;
    },
    SET_USERS_GROUPS: (state, users) => {
      state.users = users;
    },
    SET_GROUPS_REQUESTS: (state, requests) => {
      state.requests = requests;
    },
    SET_CHILDERN: (state, child) => {
      state.child = child;
    },
    SET_PREEXAM: (state, pre_exam) => {
      state.pre_exam = pre_exam;
    }
  },
  actions: {
    // user login
    login({ commit, dispatch }, userInfo) {
      commit("SET_USERS_LOAD", true);
      const { email, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ email: email.trim(), password: password })
          .then(response => {
            if (response.user) {
              let auth_user = {};

              auth_user.id = response.user.id;
              auth_user.name = response.user.name;
              setLogged("1");
              setToken(response.access_token);
              Auth(JSON.stringify(auth_user));
              commit("SET_TOKEN", response.access_token);
              commit("SET_AUTH", response.user);
              commit("SET_USERS_LOAD", false);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    register({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        Register(payload.query)
          .then(response => {
            if (response.user) {
              // console.log(response);
              let auth_user = {};

              auth_user.id = response.user.id;
              auth_user.name = response.user.name;
              setLogged("1");
              setToken(response.access_token);
              Auth(JSON.stringify(auth_user));
              commit("SET_TOKEN", response.access_token);
              commit("SET_AUTH", response.user);
              commit("SET_USERS_LOAD", false);
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    add({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_ALERT", true);
        user
          .add(payload.id, payload.status)
          .then(response => {
            commit("SET_ALERT", false);
            commit("SET_MESSAGE", "لقد تم إرسال طلب اضافة معلم");
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    reset({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user
          .reset(payload.query)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit("SET_USERS_LOAD", true);

      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_AUTH", []);
            removeToken();
            deleteToken();
            removeAuth();
            resetPermission();
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", true);
          });
      });
    },
    users({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .list(payload.query)
          .then(response => {
            commit("SET_USERS", response.users);
            commit("SET_TOTAL_USERS", response.count);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    teachers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .teachers(payload.query)
          .then(response => {
            commit("SET_USERS", response.teachers);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    activeTeachers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .activeTeachers(payload.query)
          .then(response => {
            commit("SET_USERS", response.teachers);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    active({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .active(payload.id)
          .then(response => {
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    user({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .get(id)
          .then(response => {
            // console.log(response);
            commit("SET_USER", response.user);
            console.log(response.user);
            commit("SET_TASKS", response.tasks);
            commit("SET_CHILDERN", response.childern);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    authTeachers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .authTeachers(payload.query)
          .then(response => {
            commit("SET_USERS", response.teachers);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    authStudent({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .authStudent(payload.query)
          .then(response => {
            commit("SET_USERS", response.students);
            commit("SET_FEEDBACK", response.feedback);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    save({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .store(payload.query, payload.query.id)
          .then(response => {
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },
    editChild({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .edit_child(payload.query, payload.query.id)
          .then(response => {
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    send_mail({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .send_mail(payload.query)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    courseRequest({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .courseRequest()
          .then(response => {
            commit("SET_USERS", response.requests);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    // for messages
    notification({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .notifications()
          .then(response => {
            commit("SET_USERS", response.notifications);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    studentRequest({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .studentRequest()
          .then(response => {
            commit("SET_USERS", response.requests);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    delete({ commit }, id) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .delete(id)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    changeStudentStatus({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        // commit('SET_ALERT', true);
        user
          .changeStudentStatus(payload)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    changeCourseStatus({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        // commit('SET_ALERT', true);
        user
          .changeCourseStatus(payload)
          .then(response => {
            // commit('SET_ALERT', false);
            // commit('SET_MESSAGE', 'جارى مراجعة الطلب');
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    groupsUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_USERS_LOAD", true);
        user
          .groupsUsers(payload.query)
          .then(response => {
            commit("SET_USERS_GROUPS", response.groups);
            commit("SET_FEEDBACK", response.feedback);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    groupsRequests({ commit }) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .GroupsRequests()
          .then(response => {
            commit("SET_GROUPS_REQUESTS", response.requests);
            commit("SET_USERS_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    changeGroupStatus({ commit }, payload) {
      // console.log(payload);
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .changeGroupStatus(payload.group_id, payload.status)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    changeStudentGroupStatus({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .changeStudentGroupStatus(payload)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    forgotPassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user
          .forgotPassword(payload)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    resetPassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        user
          .resetPassword(payload)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    addChild({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .addChild(payload)
          .then(response => {
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },

    export({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .export(payload.query)
          .then(response => {
            FileDownload(response, "users.xlsx");
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    exportCert({ commit }, payload) {
      commit("SET_USERS_LOAD", true);
      return new Promise((resolve, reject) => {
        user
          .export_cert(payload.userId, payload.groupId)
          .then(response => {
            FileDownload(response, `${payload.student_name}-certificate.pdf`);
            resolve();
            commit("SET_USERS_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_USERS_LOAD", false);
          });
      });
    },


    pre_exam({ commit },id) {
      return new Promise((resolve, reject) => {
        user
          .pre_exam(id)
          .then(response => {
            commit("SET_PREEXAM", response.pre_exam);
            resolve(response);
          }).catch((err)=>{
            reject(err)
          })
      });
    }
  }
};

export default userModule;
