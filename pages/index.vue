<template>
  <div class="home-page container">
    <h1 class="title mt-15">
      <strong>{{ translation['Mydashb_2_7'] }}</strong>
    </h1>
    <manufacturerHome
      v-if="isManufacturer() || isScientist() || isReceptionist()"
    />
    <hospitalHome v-if="isHospital() || isDoctor() || isNurse()" />
    <logisticHome v-if="isLogistic()" class="logistic_board"/>
    <smartLabHome v-if="isSmartLab()" />
    <blyottHome v-if="isIDMT()"/>
    <superAdminHome v-if="isAdmin()"/>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import manufacturerHome from '~/components/root/manufacturer/home'
import hospitalHome from '~/components/root/hospital/home'
import logisticHome from '~/components/root/logistic/home'
import smartLabHome from '~/components/root/smartlab/home'
import blyottHome from '~/components/root/blyott'
import superAdminHome from '~/components/root/superAdmin/home'
export default {
  components: {
    manufacturerHome,
    hospitalHome,
    logisticHome,
    smartLabHome,
    superAdminHome,
    blyottHome
  },
  mixins: [routeHelpers, userDetail],
  middleware: 'auth',
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
