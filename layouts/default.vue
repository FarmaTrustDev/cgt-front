<template>
  <a-layout id="components-layout-demo-responsive">
    <sidebar />
    <a-layout class="main-section">
      <a-layout-header>
        <div class="user-detail">
          <div>
            Welcome <strong>{{ user.userName }}</strong>
          </div>
        </div>

        <div class="hospital-detail">
          <div class="capsule">
            <img
              src="https://demoapi.qmaid.co/Logos/2020_10_22.14_48_51.jpg" logo hendling for temp
              class="logo"
            />
            <span class="title">{{ user.hospitalName }}</span>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div class="main">
          <Nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Scheduling ©2021 Created by ATMPS
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import sidebar from '~/components/layout/Sidebar'

export default {
  components: {
    sidebar,
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      //  return this.$store.getters.getUser
      return 'user name'
    },
  },
}
</script>
<style>
#dashboard-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
