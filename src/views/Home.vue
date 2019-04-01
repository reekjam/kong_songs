<template>
  <div class="home">
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
