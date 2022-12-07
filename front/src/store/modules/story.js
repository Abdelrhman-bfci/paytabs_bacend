import Story from '../../api/story';

const story = new Story();

const storyModule = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    save({commit}, payload) {
      return new Promise((resolve, reject) => {
        story.store(payload.query, '')
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
};

export default storyModule;
