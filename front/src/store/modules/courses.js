import Course from "../../api/course";

const course = new Course();

const courseModule = {
  namespaced: true,
  state: {
    courses: [],
    categories: [],
    teachers: [],
    load: false,
    total: 0,
    course: {},
    gallery:[],
    answersGallery:[],
    questions:[],
    count:[],
    photosGallery:[]
  },
  getters: {
    courses: state => state.courses,
    categories: state => state.categories,
    teachers: state => state.teachers,
    course: state => state.course,
    load: state => state.load,
    total: state => state.total,
    gallery: state => state.gallery,
    answersGallery: state => state.answersGallery,
    questions: state => state.questions,
    count: state => state.count,
    galleryPhotos: state => state.photosGallery,
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
    SET_COURSE(state, course) {
      state.course = course;
    },
    SET_LOAD(state, load) {
      state.load = load;
    },
    SET_GALLERY(state, gallery) {
      state.gallery = gallery;
    },
      SET_ANSWER_GALLERY(state, answersGallery) {
      state.answersGallery = answersGallery;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
    SET_EXAM(state, questions) {
      state.questions = questions;
    },
    SET_GALLERY_PHOTOS(state, photo) {
      state.photosGallery = photo;
    },
  },
  actions: {
    list({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        course
          .list(payload.query)
          .then(response => {
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

    categories({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        course.getCategory()
          .then(response => {
            commit("SET_CATEGORIES", response);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    authCourses({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        course
          .authCourses(payload.query)
          .then(response => {
            commit("SET_COURSES", response.courses);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },

    get({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD", true);
        course
          .get(id)
          .then(response => {
            commit("SET_COURSE", response.course);
            commit("SET_TEACHERS", response.teachers);
            commit("SET_LOAD", false);
            resolve();
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
    add({ commit }, payload) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .add(payload.id, payload.status)
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
    save({ commit }, payload) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .save(payload.query, payload.id)
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
    evaluation({ commit }, payload) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .evaluation(payload.query, payload.id)
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

    evaluationDelete({ commit }, id) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .evaluationDelete(id)
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
        course
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
    gallery({ commit }) {

      return new Promise((resolve, reject) => {
        course
          .gallery()
          .then(response => {
            resolve();

            commit("SET_GALLERY", response);

          })

      });
    },
    //// Start Mobile Application Gallery
    getMobileGallery({ commit }) {
      return new Promise((resolve, reject) => {
        course
          .mobileGallery()
          .then(response => {
            commit("SET_GALLERY_PHOTOS", response.gallery);
            console.log(response);
            resolve(response);
          })
      });
    },
    //// End Mobile Application Gallery
    answersGallery({ commit }) {

      return new Promise((resolve, reject) => {
        course
          .answersGallery()
          .then(response => {
            resolve();

            commit("response", response);

          })

      });
    },

    count({ commit }) {

      return new Promise((resolve, reject) => {
        course
          .count()
          .then(response => {
            resolve();
            commit("SET_COUNT", response.count);

          })

      });
    },
    likes({ commit }, data) {

      return new Promise((resolve, reject) => {
        course
          .likes(data)
          .then(response => {
            resolve();



          })

      });
    },


    exam({ commit }) {

      return new Promise((resolve, reject) => {
        course
          .exam()
          .then(response => {
            resolve();
            commit("SET_EXAM", response.questions);
          })

      });
    },
    answers({ commit }, payload ) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .answers(payload)
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
    answersecond({ commit }, payload ) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .answersecond(payload)
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




    answers2({ commit }, payload ) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .answers2(payload)
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

    contentImg({ commit }, payload ) {
      commit("SET_LOAD", true);
      return new Promise((resolve, reject) => {
        course
          .contentImg(payload)
          .then(response => {
            resolve(response);
            console.log(response);
            commit("SET_LOAD", false);
          })
          .catch(error => {
            reject(error);
            commit("SET_LOAD", false);
          });
      });
    },
  }
};

export default courseModule;
