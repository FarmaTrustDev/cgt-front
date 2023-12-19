const state = {
    approval: {},
}

const mutations = {
    setApproval(state, payload) {
        state.approval = payload
    },
}

const getters = {
    getApproval(state) {
        return state.approval
    },
}

export default {
    state,
    mutations,
    getters,
}
