import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: '',
        avatar: ''
    },
    mutations: {
        changeUsername(state, val) {
            state.username = val
        },
        changeAvatar(state, val) {
            state.avatar = val
        }
    }
})

//暴露
export default store