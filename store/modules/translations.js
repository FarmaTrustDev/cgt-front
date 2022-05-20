const state = {
    patient: {},
}

const mutations = {
    setTranslation(state, payload) {
        state.patient = payload
    },
}

const getters = {
    getTranslation(state) {
        return state.patient
    },
}

export default {
    state,
    mutations,
    getters,
}
