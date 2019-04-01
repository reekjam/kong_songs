<template>
  <div class='songs'>
    <table>
      <thead>
        <tr>
          <th v-on:click='sort' name='artist'>
            {{ showColumnWithSort('artist', 'Artist') }}
          </th>
          <th v-on:click='sort' name='songTitle'>
            {{ showColumnWithSort('songTitle', 'Song Title') }}
          </th>
          <th v-on:click='sort' name='albumTitle'>
            {{ showColumnWithSort('albumTitle', 'Album Title') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='song in songs' :key='song.id'>
          <td>{{ song.artist }}</td>
          <td>{{ song.songTitle }}</td>
          <td>{{ song.albumTitle }}</td>
        </tr>
      </tbody>
    </table>
  </div> 
</template>

<script>
import { ASC, DESC } from '@/constants';

export default {
  name: 'Songs',
  props: ['songs'],

  computed: {
    sortOrder() {
      return this.$store.state.sortOrder;
    },
  },

  methods: {
    sort(e) {
      if (this.songs.length > 0) {
        let sortedSongs
        const name = e.target.getAttribute('name');

        if (this.sortOrder.direction === ASC) {
          sortedSongs = this.songs.sort((a, b) => {
            if (a[name].toLowerCase() < b[name].toLowerCase()) { return -1 }
            if (a[name].toLowerCase() > b[name].toLowerCase()) { return 1 }
            return 0;
          })
        }

        if (this.sortOrder.direction === DESC) {
          sortedSongs = this.songs.sort((a, b) => {
            if (a[name].toLowerCase() > b[name].toLowerCase()) { return -1 }
            if (a[name].toLowerCase() < b[name].toLowerCase()) { return 1 }
            return 0;
          })
        }

        const direction = this.sortOrder.direction === ASC ? DESC : ASC;
        
        this.$store.commit('updateSortOrder', { name, direction });
        this.$store.commit('setSongs', sortedSongs);
      }
    },
    showColumnWithSort(columnName, displayName) {
      if (columnName === this.sortOrder.name) {
        return `${displayName} (${this.sortOrder.direction})`
      }

      return displayName;
    }
  }
}
</script>

<style>
  table {
    width: 100%;
  }

  th {
    cursor: pointer;
    width: 30%;
    padding: 20px 0;
  }
</style>
