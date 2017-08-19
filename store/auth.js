import { getUserFromLocalStorage, setToken, unsetToken } from '~/utils/auth'
// import { apiURL, httpPost } from '../utils/http'

export const state = () => ({
  authError: null,
  authUser: null
})

export const getters = {
  authError: state => state.authError,
  authUser: state => state.authUser
}

export const actions = {
  async signIn ({ commit, dispatch }, { axios, email, password }) {
    try {
      const res = await axios.post('auth/sign_in', {
        email: email,
        password: password
      })
      console.log(res.headers)
      setToken(res.headers['access-token'])
      dispatch('clearAuthError')
    } catch (error) {
      console.log(error)
      dispatch('setAuthError', error.response.data.errors)
    }
  },

  //     console.log(res)
  //     setToken(res.data.data.access_token)
  //     const loggedUser = getUserFromLocalStorage()
  //     commit('auth/SET_AUTH_USER', loggedUser, { root: true })
  //     dispatch('clearAuthError')

  async signUp ({ commit, dispatch }, { axios, email, password, passwordConfirmation }) {
    const res = await axios.$post('/auth', {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    })
    console.log(res)
    dispatch('clearAuthError')
  },

  async signOut ({ commit }) {
    // unsetToken()
    commit('CLEAR_AUTH_USER')
    // .then((res) => {
    //   unsetToken()
    //   commit('CLEAR_AUTH_USER')
    // }
  },

  setAuthError ({ commit }, error) {
    commit('SET_AUTH_ERROR', error)
    setTimeout(() => {
      commit('CLEAR_AUTH_ERROR')
    }, 20000)
  },

  clearAuthError ({ commit }) {
    commit('CLEAR_AUTH_ERROR')
  }
}

export const mutations = {
  SET_ACCESS_TOKEN (state, payload) {
    state.accessToken = payload
  },
  SET_AUTH_ERROR (state, payload) {
    state.authError = payload
  },
  SET_AUTH_USER (state, payload) {
    state.authUser = payload
  },
  CLEAR_AUTH_USER (state) {
    state.authUser = null
  },
  CLEAR_AUTH_ERROR (state) {
    state.authError = null
  }
}
