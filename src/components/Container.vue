<template>
  <div class="container">
    <loader v-if='loading'/>
    <template v-else>
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
    </template>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Search from '@/components/Search.vue'
import Songs from '@/components/Songs.vue'
import Loader from '@/components/Loader.vue'

import { getAlbums } from '@/helpers/spotify';
import { ALBUM_LIMIT } from '@/constants';

export default {
  name: 'Container',
  components: {
    UserInfo,
    Search,
    Songs,
    Loader,
  },

  async beforeMount() {
    let songs = [];

    let getAlbumsResponse = await getAlbums(this.$store.state.token, this.offset);
    const { data: { total } } = getAlbumsResponse;

    this.$store.commit('setTotalAlbums', total);
    this.$store.commit('toggleLoader', true);

    while (this.offset < total) {
      let albumsResponse = await getAlbums(this.$store.state.token, this.offset);
      let { data: { items } } = albumsResponse;
      this.offset += ALBUM_LIMIT;

      console.log(this.offset)

      items.forEach(item => {
        this.getAlbumInfo(item).forEach(song =>
          songs.push(song)
        );
      });
    }

    this.$store.commit('setSongs', songs);
    this.$store.commit('toggleLoader', false);
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
    },
    loading() {
      return this.$store.state.isLoading;
    },
    totalAlbums() {
      return this.$store.state.totalAlbums;
    },
    offset: {
      get() {
        return this.$store.state.offset;
      },
      set(newValue) {
        this.$store.commit('updateOffsetValue', newValue)
      }
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
