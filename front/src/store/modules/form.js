// import {GetQuestions, SaveQuestions,deleteQuestion} from '../../api/questionnaire'; // getInfo
import Form from '../../api/form'; // getInfo
// import {Auth, deleteToken, removeAuth, removeToken, resetPermission, setLogged, setToken} from '../../utils/auth';

const form = new Form();

const formModule = {
  namespaced: true,
  state: {
    usersLoad: false,
    total:null,
    forms: [],

  },
  getters: {
    forms: (state) => {
      return state.forms
    },
    // forms: (state) => {
    //   return state.forms
    // },
    total: (state) => {
      return state.total
    },
    usersLoad: (state) => {
      return state.usersLoad
    },
  },

  mutations: {

    SET_FORMS: (state, forms) => {
      state.forms = forms;
    },

    // SET_FORMS: (state, forms) => {
    //   state.forms = forms;
    // },
    // SET_USER: (state, user) => {
    //   state.user = user;
    // },
    // SET_GROUP_ID: (state, group_id) => {
    //   if (group_id == 1) {
    //     state.user.age_group_id = "6-12 years old";
    //   }
    //   if (group_id == 2) {
    //     state.user.age_group_id = "13 -21 years old";
    //   }

    //   if (group_id == 1) {
    //     state.user.age_group_id = "22 or older";
    //   }


    // },
    // SET_GROUP_NAME: (state, group_name) => {
    //   if (group_name == "6-12 years old") {
    //     state.user.age_group_id = 1;
    //   }
    //   if (group_name == "13 -21 years old") {
    //     state.user.age_group_id = 2;
    //   }

    //   if (group_name == "22 or older") {
    //     state.user.age_group_id = 3;
    //   }
    // },
    // SET_LOAD_USER: (state, load) => {
    //   state.userLoad = load;
    // },
    SET_TOTAL_FORMS: (state, total) => {
      state.total = total;
    },
    SET_USERS_LOAD: (state, load) => {
      state.usersLoad = load;
    },
    // SET_COURSES: (state, courses) => {
    //   state.courses = courses;
    // },
    // SET_TASKS: (state, tasks) => {
    //   state.tasks = tasks;
    // },
  },
  actions: {


    GetForms({ commit },payload) {
      return new Promise((resolve, reject) => {
        commit('SET_USERS_LOAD', true);
        form.form(payload.query).then(response => {
          commit('SET_FORMS', response.forms);
          commit('SET_TOTAL_FORMS', response.count);

          commit('SET_USERS_LOAD', false);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },



    // questions({ commit }, payload) {
    //   console.log("hello from vuex")
    //   return new Promise((resolve, reject) => {
    //     commit('SET_USERS_LOAD', true);
    //     question.list(payload.query)

    //       .then(response => {
    //         // console.log(response)
    //         commit('SET_questions', response.questions);
    //         commit('SET_USERS_LOAD', false);

    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },



    // saveQuestionnaire({ commit }, payload) {
    //   return new Promise((resolve, reject) => {


    //     question.store(payload.query, payload.id)
    //       .then(response => {
    //         resolve();
    //       }).catch(error => {
    //         reject(error);
    //       });
    //   });
    // },

    UpdateForm({ commit }, payload) {
      return new Promise((resolve, reject) => {


        form.update(payload.query, payload.id)
          .then(response => {
            resolve();
          }).catch(error => {
            reject(error);
          });
      });
    },
    AddForm({ commit }, payload) {
      // console.log(payload.query)
      return new Promise((resolve, reject) => {
        form.add(payload.query)


        // form.add(payload.query)
          .then(response => {
            resolve();
          }).catch(error => {
            reject(error);
          });
      });
    },
    delete({ commit }, id) {
      return new Promise((resolve, reject) => {
        form.delete(id).then(response => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

  },
};

export default formModule;
