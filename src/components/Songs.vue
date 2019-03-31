<template>
  <div class='songs'>
    <table>
      <tr>
        <th v-on:click='sort' name='artist'>Artist</th>
        <th v-on:click='sort' name='songTitle'>Song Title</th>
        <th v-on:click='sort' name='albumTitle'>Album Title</th>
      </tr>
      <template v-if='filteredSongs.length > 0'>
        <tr v-for='song in filteredSongs' :key='song.id'>
          <td>{{ song.artist }}</td>
          <td>{{ song.songTitle }}</td>
          <td>{{ song.albumTitle }}</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for='song in songs' :key='song.id'>
          <td>{{ song.artist }}</td>
          <td>{{ song.songTitle }}</td>
          <td>{{ song.albumTitle }}</td>
        </tr>
      </template>
    </table>
  </div> 
</template>

<script>
import { getAlbums } from '@/helpers/spotify';
import { albumLimit } from '@/constants';

export default {
  name: 'Songs',

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
    sortOrder() {
      return this.$store.state.sortOrder;
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
    sort(e) {
      if (this.songs.length > 0) {
        let sortedSongs
        const name = e.target.getAttribute('name');

        if (this.sortOrder.direction === 'ASC') {
          sortedSongs = this.songs.sort((a, b) => {
            if (a[name].toLowerCase() < b[name].toLowerCase()) { return -1 };
            if (a[name].toLowerCase() > b[name].toLowerCase()) { return 1 };
            return 0;
          })
        }

        if (this.sortOrder.direction === 'DESC') {
          sortedSongs = this.songs.sort((a, b) => {
            if (a[name].toLowerCase() > b[name].toLowerCase()) { return -1 };
            if (a[name].toLowerCase() < b[name].toLowerCase()) { return 1 };
            return 0;
          })
        }

        const direction = this.sortOrder.direction === 'ASC' ? 'DESC' : 'ASC';
        
        this.$store.commit('updateSortOrder', { name, direction });
        this.$store.commit('setSongs', sortedSongs);
      }
    }
  }
}
</script>

