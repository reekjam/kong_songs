<template>
  <div class="sign_in">
    <a v-bind:href="authLink + '?client_id=' + clientId + '&redirect_uri=' + redirectURI + '&scope=' + scope + '&response_type=' + responseType">
      Log in with Spotify
    </a>
  </div>
</template>

<script>
  export default {
    name: 'sign-in',
    
    computed: {
      authLink() {
        return 'http://accounts.spotify.com/authorize'
      },
      clientId() {
        return process.env.VUE_APP_CLIENT_ID
      },
      redirectURI() {
        return encodeURIComponent(process.env.VUE_APP_REDIRECT_URI)
      },
      responseType() { 
        return 'code' 
      },
      scope() {
        return encodeURIComponent(process.env.VUE_APP_CLIENT_SCOPE)
      },
      process() { return process.env }
    }
  }
</script>