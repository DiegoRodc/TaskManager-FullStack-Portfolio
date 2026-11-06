<template>
  <div id="app-bar">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Task Manager</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="loggedIn" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item
        :prepend-avatar="user.PhotoURL || user.photoUrl || user.picture || ''"
      >
        <v-list-item-title>
          {{ user.UserName || user.userName || 'User' }}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :href="logoutUrl" link>
          <v-icon>mdi-logout-variant</v-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { apiUrl } from '@/config'

export default {
  name: 'AppBar',
  props: {
    user: {
      type: Object,
      default: () => ({ UserName: '' })
    }
  },
  data: () => ({
    drawer: false,
    loggedIn: false
  }),
  computed: {
    logoutUrl () {
      const returnTo = encodeURIComponent(window.location.origin)
      return `${apiUrl('/api/v1/auth/logout')}?returnTo=${returnTo}`
    }
  },
  methods: {
    async getLoggedIn () {
      try {
        const res = await fetch(apiUrl('/api/v1/user'), {
          credentials: 'include'
        })
        this.loggedIn = res.ok
      } catch {
        this.loggedIn = false
      }
    }
  },
  mounted () {
    this.getLoggedIn()
  }
}
</script>
