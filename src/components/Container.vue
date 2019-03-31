<template>
  <div class="container">
    <user-info />
    <search />
    <template v-if='query'>
      <template v-if='filteredSongs.length > 0'>
        <songs :songs=filteredSongs />
      </template>
      <template v-else>
        <div>
          No results.
        </div>
      </template>
    </template>

    <template v-else>
      <songs :songs=songs />
    </template>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Search from '@/components/Search.vue'
import Songs from '@/components/Songs.vue'

import { getAlbums } from '@/helpers/spotify';
import { albumLimit } from '@/constants';

export default {
  name: 'Container',
  components: {
    UserInfo,
    Search,
    Songs,
  },

  async beforeMount() {
    let offset = 0;
    let songs = [];

    let getAlbumsResponse = await getAlbums(this.$store.state.token, offset);
    const { data: { total } } = getAlbumsResponse;

    while (offset < total) {
      let albumsResponse = await getAlbums(this.$store.state.token, offset);
      let { data: { items } } = albumsResponse;
      offset += albumLimit;

      console.log(offset)

      items.forEach(item => {
        this.getAlbumInfo(item).forEach(song =>
          songs.push(song)
        );
      });
    }

    this.$store.commit('setSongs', songs);
  },

  computed: {
    filteredSongs() {
      return this.$store.state.filteredSongs;
    },
    songs() {
      return this.$store.state.songs;
    },
    query() {
      return this.$store.state.query;
    }
  },

  methods: {
    getAlbumInfo(albumInfo) {
      const { album } = albumInfo;
      const { name, tracks } = album;

      return tracks.items.map(item => {
        return {
          id: item.id,
          artist: item.artists[0].name,
          songTitle: item.name,
          albumTitle: name
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
