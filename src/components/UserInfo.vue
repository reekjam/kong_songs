<template>
  <div>
    <p>Sup, {{ username }}</p>
  </div>
</template>

<script>
import { getUserProfile } from '@/helpers/spotify';

export default {
  name: 'UserInfo',
  async beforeMount() {
    let userProfileRequest = await getUserProfile(this.$store.state.token);
    let { data } = userProfileRequest

    this.$store.commit('setUsername', data.display_name)
  },

  computed: {
    username() {
      return this.$store.state.username
    }
  }
}
</script>
