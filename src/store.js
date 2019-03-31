import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    albums: null,
    offset: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsername(state, username) {
      state.username = username
    },
    setAlbums(state, albums) {
      state.albums = albums
    },
    setAlbumOffset(state, offset) {
      state.offset = offset
    },
    addAlbums(state, albums) {
      state.albums.push(...albums)
    },
  },
  actions: {

  }
})
