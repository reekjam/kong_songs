<template>
  <div class='search'>
    <input @input='filter' v-model='query'/>
    <select @change='handleChange'>
      <option value='artist'>Artist</option>
      <option value='songTitle'>Song Title</option>
      <option value='albumTitle'>Album Title</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Search',

  computed: {
    songs() {
      return this.$store.state.songs;
    },
    filterType() {
      return this.$store.state.filterType;
    },
    query: {
      get: function() {
        return this.$store.state.query;
      },
      set: function(newValue) {
        this.$store.commit('updateFilterQuery', newValue);
      }
    }
  },

  methods: {
    filter(e) {
      this.$store.commit('setFilteredSongs', 
        this.songs.filter(song => {
          return song[this.filterType].toLowerCase().includes(e.target.value.toLowerCase())
        })
      )
    },
    handleChange(e) {
      this.$store.commit('updateFilterQuery', '');
      this.$store.commit('updateFilterType', e.target.value);
    }
  }
}
</script>

<style>
  .search {
    margin-bottom: 20px;
  }
</style>
