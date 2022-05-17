<template>
  <div class="home-page">
    <h1 class="title"><strong>My Dashboard</strong></h1>

    <manufacturerHome v-if="isManufacturer()" />
    <hospitalHome v-if="isHospital()" />
    <logisticHome v-if="isLogistic()" />
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import manufacturerHome from '~/components/root/manufacturer/home'
import hospitalHome from '~/components/root/hospital/home'
import logisticHome from '~/components/root/logistic/home'
export default {
  components: { manufacturerHome, hospitalHome, logisticHome },
  mixins: [routeHelpers, userDetail],
  middleware: 'auth',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
