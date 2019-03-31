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
    }
  },

  methods: {
    filter(e) {
      let filteredSongs = this.songs.filter(song => {
        return song.songTitle.includes(e.target.value)
      });

      this.$store.commit('setFilteredSongs', filteredSongs);
      console.log(this.$store.state.filteredSongs);
    }
  }
}
</script>