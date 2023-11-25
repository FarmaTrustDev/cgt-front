<template>
  <a-layout-sider v-model="collapsed" class="sidebar" width="265" theme="light">
    <div class="logo-container">
      <nuxt-link to="/">
        <img :src="getImageUrl('Logos/logo.svg')" class="logo"
      /></nuxt-link>
    </div>
    <a-skeleton
      :loading="isEmpty(user)"
      :paragraph="{ rows: 10 }"
      class="side-menu"
    >
      <a-menu :selected-keys="selectedKey" mode="inline">
        <a-menu-item
          v-for="menu in user.menus"
          :key="menu.key"
          @click="goto(menu)"
        >
          <div class="menu-container">
            <div>
              <img :src="menu.icon" style="width: 17px" />
            </div>
            <div>
              <span class="title">
                {{ isEmpty(translation[menu.name]) ? menu.name : translation[menu.name] }}
                <a-badge v-if="((isEmpty(translation[menu.name]) ? menu.name : translation[menu.name])=== 'QPApproval') && pendingCount !== 0" :count="pendingCount" />
              </span>
            </div>
          </div>
        </a-menu-item>

        <a-menu-item key="10" class="logout-menu" @click="logout">
          <div class="menu-container">
            <img :src="logoutImg" />
            <span class="title">{{ translation.Logou_1_37 }}</span>
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
import imagesHelper from '~/mixins/images-helper'
import QPStatusServices from '~/services/API/QPStatusServices'
export default {
  mixins: [imagesHelper],
  data() {
    return {
      collapsed: false,
      pendingCount: 0,
      logoutImg:
        'https://cgt-dev-ft.microsysx.com/images/v2/icons/logout.svg?0.229',
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
    selectedKey() {
      return this.$store.getters.getSelectedMenu
    },
  },
  watch:{
    pendingCount(newValue, oldValue){
      if(newValue !== oldValue){
        this.pendingCount = newValue
      }
    }
  },
  mounted() {
    if (isEmpty(this.user)) {
      this.logout()
    } else {
      const bus = AuthServices.getBusEvent()
      const logout = this.logout
      bus.$on('UNAUTHORIZE', function (data) {
        logout()
      })
      this.showCollapse()
    }
    this.getPending()
  },

  methods: {
    showCollapse() {
      if (window.innerWidth < 960) {
        this.collapsed = true
      }
    },
    getPending(){
        QPStatusServices.getPending().then((response) => {
          if(response.data.length !== 0){
            this.pendingCount = response.data.length
          }  
        }).catch(this.error)
    },
    isEmpty,
    goto(menu) {
      this.$store.commit('setSelectedMenu', [`${menu.key}`])
      this.$router.push({
        path: menu.to,
      })
    },
    logout() {
      setRefreshToken('')
      setAccessToken('')
      this.$store.commit('setToken', {})
      this.$store.commit('setUser', {})
      this.$store.commit('setSelectedMenu', ['1'])
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
