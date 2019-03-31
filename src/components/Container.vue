<template>
  <div class="container">
    <user-info />
    <search />
    <albums />
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Search from '@/components/Search.vue'
import Albums from '@/components/Albums.vue'

export default {
  name: 'Container',
  components: {
    UserInfo,
    Search,
    Albums,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
