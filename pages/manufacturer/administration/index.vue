<template>
  <div class="admin-page">
    <h3 class="page-title">Administration</h3>
    <a-row :gutter="16" class="grey-card">
      <a-col v-for="menu in userAdminMenu" :key="menu.key" :span="12">
        <nuxt-link :to="menu.to">
          <div class="admin-tab">
            <!-- HREF , why not using  <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>  Please try not to remove the work which is done  -->

            <img :src="menu.icon" />
            <h4 class="heading-home">{{ menu.name }}</h4>
          </div>
        </nuxt-link>
      </a-col>
      
    </a-row>
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
export default {
  data() {
    return {
      userAdminMenu: [],
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    this.userDetail()
  },
  methods: {
    userDetail() {
      UserServices.adminMenu().then((response) => {
        this.userAdminMenu = response.data
      })
    },
  },
}
</script>
