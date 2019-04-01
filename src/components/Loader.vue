<template>
  <div>
    <p>Loading your Spotify library...</p>
    <div class='loader-out'>
      <div class='loader-in' :style="{ width: `${Math.floor((offset/totalAlbums) * 100)}%` }"></div>
    </div>  
  </div>  
</template>

<script>
export default {
  name: 'Loader',  

  computed: {
    offset() {
      return this.$store.state.offset;
    },
    totalAlbums() {
      return this.$store.state.totalAlbums;
    }
  }
}
</script>

<style>
  .loader-out {
    width: 100%;
    height: 3px;
    background-color: lightGray;
  }

  .loader-in {
    background-color: cornflowerblue;
    height: 3px;
    transition: width 0.25s ease-in;
  }
</style>


