<template>
  <div class="home">
    <h1>KONG SONGS</h1>
    <container v-if='token' />
    <sign-in v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue';
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'home',
  components: {
    Container,
    SignIn,
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

<style>
  h1 {
    font-family: 'Sarpanch';
    margin-bottom: 50px;
  }
</style>

