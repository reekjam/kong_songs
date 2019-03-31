<template>
  <div class='search'>
    <input @input='filter'/>
  </div>
</template>

<script>
export default {
  name: 'Search',

  computed: {
    songs() {
      return this.$store.state.songs;
    },
  },

  methods: {
    filter(e) {
      this.$store.commit('updateFilterQuery', e.target.value);
      this.$store.commit('setFilteredSongs', 
        this.songs.filter(song => {
          return song.songTitle.toLowerCase().includes(e.target.value.toLowerCase())
        })
      )
    }
  }
}
</script>