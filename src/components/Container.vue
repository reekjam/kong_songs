<template>
  <div class="container">
    <user-info />
    <search />
    <songs />
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Search from '@/components/Search.vue'
import Songs from '@/components/Songs.vue'

export default {
  name: 'Container',
  components: {
    UserInfo,
    Search,
    Songs,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
