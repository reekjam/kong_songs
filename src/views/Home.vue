<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <container v-if='token' />
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue'

export default {
  name: 'home',
  components: {
    Container,
  },

  beforeMount() {
    const cookieToken = document.cookie.match(/token=([^;]*).*$/);
    const token = cookieToken ? cookieToken[1] : null;

    this.$store.commit('setToken', token)
  },

  computed: {
    token() {
      return this.$store.state.token
    }
  }
}
</script>
