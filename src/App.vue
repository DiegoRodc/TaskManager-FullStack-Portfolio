<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
      type="text/css"
    />

    <AppBar :user="user" />

    <v-main>
      <router-view :user="user"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import { apiUrl } from '@/config'

export default {
  name: 'App',
  components: { AppBar },
  data: () => ({
    user: {},
    defaultUser: { UserName: 'User' }
  }),
  methods: {
    async getUser () {
      try {
        const res = await fetch(apiUrl('/api/v1/user'), { credentials: 'include' })
        this.user = res.ok ? await res.json() : this.defaultUser
      } catch {
        this.user = this.defaultUser
      }
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>
