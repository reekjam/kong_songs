<template>
  <div class='albums'>
    <ul>
      <li v-for='album in albums' :key='album.album.id'>
        {{ albumInfo(album) }}
      </li>
    </ul>
  </div> 
</template>

<script>
import { getAlbums } from '@/helpers/spotify';
import { albumLimit } from '@/constants';

export default {
  name: 'Albums',

  async beforeMount() {
    const offset = 0;
    const getAlbumsRequest = await getAlbums(this.$store.state.token, offset);
    const { data: { items } } = getAlbumsRequest;

    this.$store.commit('setAlbums', items);
    this.$store.commit('setAlbumOffset', offset);
  },

  mounted() {
    this.scroll();
  },

  computed: {
    albums() {
      return this.$store.state.albums;
    }
  },

  methods: {
    albumInfo(albumInfo) {
      const { album } = albumInfo;
      const { name, artists } = album;

      return `${artists[0].name} - ${name}`
    },
    scroll() {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          const offset = this.$store.state.offset += albumLimit;
          const getAlbumsRequest = await getAlbums(this.$store.state.token, offset);
          const { data: { items } } = getAlbumsRequest;

          this.$store.commit('addAlbums', items)
          this.$store.commit('setAlbumOffset', offset)
        }
      }
    }
  }
}
</script>

