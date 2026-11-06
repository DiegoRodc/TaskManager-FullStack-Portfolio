<template>
  <div id="login">
    <h1>Welcome to your Task Manager!</h1>

    <v-btn v-if="googleLoginUrl" :href="googleLoginUrl" color="primary">
      <v-icon left>mdi-google</v-icon>
      Log In with Google
    </v-btn>

    <v-alert v-else type="error" variant="tonal" max-width="560">
      The backend API is not configured. Copy .env.example to .env and set
      VUE_APP_API_ORIGIN before running or building the application.
    </v-alert>
  </div>
</template>

<script>
import { API_ORIGIN, apiUrl } from '@/config'

export default {
  name: 'Login',
  computed: {
    googleLoginUrl () {
      if (!API_ORIGIN) return ''

      const returnTo = encodeURIComponent(window.location.origin)
      return `${apiUrl('/api/v1/auth/google')}?returnTo=${returnTo}`
    }
  }
}
</script>

<style scoped>
#login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 50vh;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
}
</style>
