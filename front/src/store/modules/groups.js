import Group from "../../api/groups";

const group = new Group();

const groupModule = {
  namespaced: true,
  state: {
    groups: [],
    courseGroups: [],
    authGroups: [],
    load: false,
    count: 0,
    groupStudents: [],
    studentFeedback: [],
    groupInfo: null,
    score:[],
    getAnswers:[],
    getscores:[],
  questions:[],
  usersCount:[],
  studentscore:null,

  },
  getters: {
    groups: state => state.groups,
    load: state => state.load,
    count: state => state.count,
    usersCount: state => state.usersCount,


    courseGroups: state => state.courseGroups,
    authGroups: state => state.authGroups,
    groupStudents: state => state.groupStudents,
    studentFeedback: state => state.studentFeedback,
    groupInfo: state => state.groupInfo,
    score: state => state.score,
    getAnswers: state => state.getAnswers,
    getscores: state => state.getscores,
    questions: state => state.questions,
    studentscore : state => state.studentscore,




  },
  mutations: {
    SET_GROUP(state, groups) {
      state.groups = groups;
    },
    SET_LOAD(state, load) {
      state.load = load;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
    SET_USERSCOUNT(state, usersCount) {
      state.usersCount = usersCount;
    },
    SET_COURSE_GROUPS(state, courseGroups) {
      state.courseGroups = courseGroups;
    },
    SET_AUTH_GROUP(state, authGroups) {
      state.authGroups = authGroups;
    },
    SET_GROUP_STUDENTS(state, groupStudents) {
      state.groupStudents = groupStudents;
    },
    SET_STUDENT_FEEDBACK(state, studentFeedback) {
      state.studentFeedback = studentFeedback;
    },
    SET_GROUP_INFO(state, groupInfo) {
      state.groupInfo = groupInfo;
    },
    SET_SCORE(state, score) {
      state.score = score;
    },
    SET_QUESTION(state, questions) {
      state.questions = questions;
    },
    GET_SCORE(state, getscores) {
      state.getscores = getscores;
    },
    SET_RESULT(state, result) {
      state.result = result;
    },

    SET_GET_ANSWERS(state, getAnswers) {
      state.getAnswers = getAnswers;
    },
    SET_STUDENTSCORE(state,studentscore){
      state.studentscore = studentscore;
    }

  },
  actions: {
    getGroups({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .list()
          .then(response => {
            commit("SET_GROUP", response.groups);
            commit("SET_COUNT", response.groups.length);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    addGroup({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .add(data)
          .then(response => {
            commit("SET_GROUP", response);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    courseGroups({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .get(id)
          .then(response => {
            commit("SET_COURSE_GROUPS", response.groups);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    addGroupStudent({ commit }, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .addStudent(payload.id, payload.status, {
            promo_code: payload.promo_code,
            user_id: payload.student_id
          })
          .then(response => {
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    authGroups({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .authGroups(payload.query)
          .then(response => {
            commit("SET_COUNT", response.count);
            commit("SET_AUTH_GROUP", response.groups);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    updateGroup({ commit }, payload) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        group
          .update(payload.data, payload.id)
          .then(response => {
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    deleteGroup({ commit }, id) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        group
          .delete(id)
          .then(response => {
            resolve();
            commit("SET_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    // get group students
    getGroupStudents({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .get_group_students(payload.id, payload.query)
          .then(response => {
            commit("SET_GROUP_STUDENTS", response.groups);
            commit("SET_STUDENT_FEEDBACK", response.feedback);
            commit("SET_COUNT", response.count);

            commit("SET_LOAD", false);
            resolve(response);
            console.log(response.groups)
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    score({ commit },data) {

      return new Promise((resolve, reject) => {
        group
          .score(data)
          .then(response => {
            commit("SET_SCORE", response);
            resolve(response);

          }).catch((err)=>{
            reject(err)
          })

      });
    },

    questions({ commit }) {

      return new Promise((resolve, reject) => {
        group
          .questions()
          .then(response => {
            commit("SET_QUESTION", response);
            resolve(response);


          }).catch((err)=>{
            reject(err)
          })

      });
    },
    usersCount({ commit }) {

      return new Promise((resolve, reject) => {
        group
          .usersCount()
          .then(response => {
            commit("SET_USERSCOUNT", response.users);
            resolve(response.users);


          }).catch((err)=>{
            reject(err)
          })

      });
    },

    studentscore({ commit },id) {

      return new Promise((resolve, reject) => {
        group
          .studentscore(id)
          .then(response => {
            commit("GET_SCORE", response);
            resolve(response);
            //console.log('jjjjj'+response)
          }).catch((err)=>{
            reject(err)
          })

      });
    },
    totalAnswers({ commit }) {

      return new Promise((resolve, reject) => {
        group
          .totalAnswers()
          .then(response => {
            commit("SET_SCORE", response.questions);
            resolve(response);
          }).catch((err)=>{
            reject(err)
          })

      });
    },

    confirmScore({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .confirmScore(data)
          .then(response => {
            console.log(data);
            console.log(response);
            resolve(response);
          }).catch((err)=>{
            commit("SET_LOAD", false);
            reject(err)
          })
      });
    },

    sendReport({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .sendReport(data)
          .then(response => {
            console.log(data);
            console.log(response);
            resolve(response);
          }).catch((err)=>{
            commit("SET_LOAD", false);
            reject(err)
          })
      });
    },


    setScore({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .setScore(data)
          .then(response => {
            console.log(data);
            console.log(response);
            resolve(response);
          }).catch((err)=>{
            commit("SET_LOAD", false);
            reject(err)
          })
      });
    },
    // get group info
    getGroupInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .get_group_info(payload.id)
          .then(response => {
            commit("SET_GROUP_INFO", response.group);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    getAnswers({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        group
          .getAnswers(data)
          .then(response => {

          //  console.log(data);
           // console.log(response);
            resolve(response);
         //   console.log(response)
          }).catch((err)=>{
            commit("SET_LOAD", false);
            reject(err)
          })
      });
    },
    getStudentScore({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_STUDENTSCORE", true);
        group
          .getStudentScore(data)
          .then(response => {

          //  console.log(data);
           // console.log(response);
            resolve(response);
         //   console.log(response)
          }).catch((err)=>{
            commit("SET_STUDENTSCORE", false);
            reject(err)
          })
      });
    },

  }
};

export default groupModule;
