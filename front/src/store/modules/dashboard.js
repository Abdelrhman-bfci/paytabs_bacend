// import {GetQuestions, SaveQuestions,deleteQuestion} from '../../api/questionnaire'; // getInfo
import Dashboard from "../../api/dashboard"; // getInfo
// import {Auth, deleteToken, removeAuth, removeToken, resetPermission, setLogged, setToken} from '../../utils/auth';

const dashboard = new Dashboard();

const dashboardModule = {
  namespaced: true,
  state: {
    // load: false,
    // logscount: [],
    // taskload: false,
    // orgs: [],
    // orgsload: false,
    // tasks: [],
    // taskdate: [],
    // taskcount: [],
    // orgsname: [],
    // orgscount: [],
    // logsdate: [],
    // totalusers: {},
    // logs: [],
    // individualcount: null,
    // institutioncount: null,
    // Studentcount: null,
    // totalTopics: null
    // Counts
    studentsCount: [],
    coursesCount: [],
    evaluationsCount: [],
    groupsCount: [],
    logsdate: [],
    logscount: [],
    groupstatistic: [],
    groupslable: [],
    evaluationsdata: [],
    evaluationslable: [],
    load: false

    // Data
  },
  getters: {
    // logsdate: state => {
    //   return state.logsdate;
    // },
    // orgscount: state => {
    //   return state.orgscount;
    // },
    // orgsname: state => {
    //   return state.orgsname;
    // },
    // taskcount: state => {
    //   return state.taskcount;
    // },
    // taskdate: state => {
    //   return state.taskdate;
    // },
    // logscount: state => {
    //   return state.logscount;
    // },
    // institutioncount: state => {
    //   return state.institutioncount;
    // },
    // individualcount: state => {
    //   return state.individualcount;
    // },
    // Studentcount: state => {
    //   return state.Studentcount;
    // },
    // totalTopics: state => {
    //   return state.totalTopics;
    // },
    // load: state => {
    //   return state.load;
    // },
    // taskload: state => {
    //   return state.taskload;
    // },
    // orgsload: state => {
    //   return state.orgsload;
    // }
    // Counts
    getStudentsCounts: state => state.studentsCount,
    getCoursesCounts: state => state.coursesCount,
    getEvaluationsCounts: state => state.evaluationsCount,
    getGroupsCounts: state => state.groupsCount,
    logsdate: state => state.logsdate,
    logscount: state => state.logscount,
    groupdata: state => state.groupstatistic,
    grouplable: state => state.groupslable,
    evaluationsdata: state => state.evaluationsdata,
    evaluationslable: state => state.evaluationslable,
    load: state => state.load
    // Data
  },

  mutations: {
    // SET_TOPICS: (state, topics) => {
    //   state.topics = topics;
    // },
    // SET_TOTAL_TOPICS: (state, totalTopics) => {
    //   state.totalTopics = totalTopics;
    // },

    // SET_LOAD: (state, load) => {
    //   state.load = load;
    // },
    // SET_LOAD_TASK: (state, taskload) => {
    //   state.taskload = taskload;
    // },
    // SET_LOAD_ORGS: (state, orgsload) => {
    //   state.orgsload = orgsload;
    // },
    // SET_TYPES_TOTAL: (state, totalusers) => {
    //   state.totalusers = totalusers;
    //   for (let index = 0; index < totalusers.length; index++) {
    //     const element = totalusers[index];
    //     // if (element.type === "Individual") {
    //     if (element.type === "Individual" || element.type === "individual") {
    //       state.individualcount = element.count;
    //     }
    //     if (element.type === "institution" || element.type === "Institution") {
    //       state.institutioncount = element.count;
    //     }
    //     if (element.type === "Student" || element.type === "student") {
    //       state.Studentcount = element.count;
    //     }
    //   }
    // },
    // SET_LOGS: (state, logs) => {
    //   state.logs = logs;
    //   state.logscount = logs.map(a => a.count);
    //   state.logsdate = logs.map(a => a.date);
    // },
    // SET_TASK_COUNT: (state, tasks) => {
    //   state.tasks = tasks;
    //   state.taskcount = tasks.map(a => a.count);
    //   state.taskdate = tasks.map(a => a.date);
    // },
    // SET_ORGS: (state, orgs) => {
    //   state.orgs = orgs;
    //   state.orgscount = orgs.map(a => a.user_count);
    //   state.orgsname = orgs.map(a => a.organization_name);
    // }

    SET_STUDENTS_COUNT: (state, studentsCount) => {
      state.studentsCount = studentsCount;
    },
    SET_COURSES_COUNT: (state, coursesCount) => {
      state.coursesCount = coursesCount;
    },
    SET_EVALUATIONS_COUNT: (state, evaluationsCount) => {
      state.evaluationsCount = evaluationsCount;
    },
    SET_GROUPS_COUNT: (state, groupsCount) => {
      state.groupsCount = groupsCount;
    },
    SET_LOGS_DATA: (state, logsData) => {
      // state.logs = logsData;
      state.logscount = logsData.map(a => a.count);
      state.logsdate = logsData.map(a => a.date);
    },
    SET_EVALUATIONS_DATA: (state, date) => {
      state.evaluationsdata = date.map(a => a.count);
      state.evaluationslable = date.map(a => a.date);
    },
    SET_GROUPS: (state, group) => {
      state.groupstatistic = group.map(a => a.count);
      state.groupslable = group.map(a => a.group_name);
    },
    SET_LOAD: (state, load) => {
      state.load = load;
    }
  },
  // actions: {
  //   users_type({ commit }) {
  //     return new Promise((resolve, reject) => {
  //       // commit('SET_USERS_LOAD', true);
  //       // commit('SET_LOAD', true);

  //       dashboard
  //         .users_type()
  //         .then(response => {
  //           commit("SET_TYPES_TOTAL", response.users_type_count);

  //           // commit('SET_LOAD', false);

  //           resolve();
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   },

  //   org_count({ commit }) {
  //     return new Promise((resolve, reject) => {
  //       commit("SET_LOAD_ORGS", true);
  //       dashboard
  //         .org_count()
  //         .then(response => {
  //           // console.log(response)
  //           commit("SET_ORGS", response.users_organization_count);
  //           commit("SET_LOAD_ORGS", false);

  //           resolve();
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   },

  //   task_count({ commit }) {
  //     return new Promise((resolve, reject) => {
  //       commit("SET_LOAD_TASK", true);
  //       dashboard
  //         .task_count()
  //         .then(response => {
  //           commit("SET_TASK_COUNT", response.task_count);
  //           commit("SET_LOAD_TASK", false);
  //           resolve();
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   },

  //   logs_count({ commit }, payload) {
  //     return new Promise((resolve, reject) => {
  //       commit("SET_LOAD", true);
  //       dashboard
  //         .logs_count()
  //         .then(response => {
  //           commit("SET_LOGS", response.logs_count);
  //           commit("SET_LOAD", false);

  //           resolve();
  //         })
  //         .catch(error => {
  //           reject(error);
  //         });
  //     });
  //   }
  // }
  actions: {
    get_counts({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        dashboard
          .counts()
          .then(response => {
            commit("SET_STUDENTS_COUNT", response.students_count);
            commit("SET_COURSES_COUNT", response.courses_count);
            commit("SET_EVALUATIONS_COUNT", response.evaluations_count);
            commit("SET_GROUPS_COUNT", response.groups_count);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    get_logs_data({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        dashboard
          .logs_data()
          .then(response => {
            commit("SET_LOGS_DATA", response.logs_count);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    get_evaluations_data({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        dashboard
          .evaluation_data()
          .then(response => {
            commit("SET_EVALUATIONS_DATA", response.evaluations_month_count);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    get_groups_data({ commit }) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        dashboard
          .groups_data()
          .then(response => {
            commit("SET_GROUPS", response.evaluations_group_count);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    }
  }
};

export default dashboardModule;
