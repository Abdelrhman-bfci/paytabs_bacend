import Feedback from "../../api/feedback";

const feedback = new Feedback();

const feedbackModule = {
  namespaced: true,
  state: {
    feedback: [],
    courses: [],
    load: false,
    total: 0
  },
  getters: {
    feedback: state => state.feedback,
    courses: state => state.courses,
    load: state => state.load,
    total: state => state.total
  },
  mutations: {
    SET_FEEDBACK(state, feedback) {
      state.feedback = feedback;
    },
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
    SET_LOAD(state, load) {
      state.load = load;
    }
  },
  actions: {
    list({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        feedback
          .list(payload.query)
          .then(response => {
            commit("SET_FEEDBACK", response.feedback);
            commit("SET_COURSES", response.courses);
            commit("SET_TOTAL", response.count);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    save({ commit }, payload) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        feedback
          .store(payload.query, payload.id)
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

    delete({ commit }, id) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        feedback
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
    }
  }
};

export default feedbackModule;
