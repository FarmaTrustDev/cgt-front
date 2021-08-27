const state = {
  patient: {},
}

const mutations = {
  setPatient(state, payload) {
    state.patient = payload
  },
}

const getters = {
  getPatient(state) {
    return state.patient
  },
}

export default {
  state,
  mutations,
  getters,
}
