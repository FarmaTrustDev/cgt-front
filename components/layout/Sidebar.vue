<template>
  <a-layout-sider
    v-model="collapsed"
    class="sidebar"
    width="265"
    theme="light"
  >
    <div class="logo-container">
      <nuxt-link to="/">
        <img
          src="http://cgt-dev-ft.microsysx.com/images/v2/logo.svg"
          class="logo"
      /></nuxt-link>
    </div>
    <a-skeleton :loading="isEmpty(user)" :paragraph="{ rows: 10 }">
      <a-menu :default-selected-keys="['1']" mode="inline">
        <a-menu-item
          v-for="menu in user.menus"
          :key="menu.key"
          @click="goto(menu.to)"
        >
          <div class="menu-container">
            <img :src="menu.icon" style=" max-width: 28px; " /> 
            <span class="title">{{ menu.name }}</span>
          </div>
        </a-menu-item>
        <a-menu-item key="10" @click="logout" class="logout-menu">
          <div class="menu-container">
            <img :src="logoutImg"> <span class="title">Logout</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-skeleton>
  </a-layout-sider>
</template>
<script>
// import { mapGetters } from 'vuex'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { isEmpty } from '~/services/Helpers'
import AuthServices from '~/services/API/AuthServices'
export default {
  data() {
    return {
      collapsed: false,
      logoutImg : "https://cgt-dev-ft.microsysx.com/images/v2/icons/logout.svg?0.229"
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    const bus = AuthServices.getBusEvent()
    const logout = this.logout
    bus.$on('UNAUTHORIZE', function (data) {
      logout()
    })
    this.showCollapse()
  },

  methods: {
    showCollapse() {
      if (window.innerWidth < 960) {
        this.collapsed = true
      }
    },
    isEmpty,
    goto(url) {
      this.$router.push({ path: url })
    },
    logout() {
      setRefreshToken('')
      setAccessToken('')
      this.$store.commit('setToken', {})
      this.$store.commit('setUser', {})
      this.$router.push({ path: '/login' })
    },
  },
}
</script>
