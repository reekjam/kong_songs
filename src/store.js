import Vue from 'vue'
import Vuex from 'vuex'

import { ASC } from '@/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    songs: [],
    offset: 0,
    filteredSongs: [],
    sortOrder: {
      direction: ASC,
      name: 'artist'
    },
    query: '',
    filterType: 'artist',
    isLoading: false,
    totalAlbums: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsername(state, username) {
      state.username = username
    },
    setAlbumOffset(state, offset) {
      state.offset = offset
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    setFilteredSongs(state, filteredSongs) {
      state.filteredSongs = filteredSongs
    },
    updateSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder
    },
    updateFilterQuery(state, query) {
      state.query = query
    },
    updateFilterType(state, filterType) {
      state.filterType = filterType
    },
    toggleLoader(state, value) {
      state.isLoading = value
    },
    setTotalAlbums(state, value) {
      state.totalAlbums = value
    },
    updateOffsetValue(state, value) {
      state.offset = value
    },
  },
  actions: {

  }
})
