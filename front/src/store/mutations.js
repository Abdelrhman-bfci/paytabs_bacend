const mutations = {
  SET_PATH_TITLE(state, title) {
    state.pathTitle = title;
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },
  SET_UPLOAD_PROGRESS(state, uploadProgress) {
    state.uploadProgress = uploadProgress
  },
  SET_FILTER(state, filterData) {
    state.filter = filterData
  }
}

export default mutations;
