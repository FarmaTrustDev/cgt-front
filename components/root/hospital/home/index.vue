<template>
  <div class="home-page">
    <a-card class="grey-card" :bordered="false">
        <!-- left side tabs -->
        <a-col :span="12" class="mtminus-5 mml-40">
          <a href="javascript:;" @click="goto(`/hospital/patients/create`)">
            <div class="home-tab">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                {{translation.Check_1_454}} <strong class="strong">{{translation['new_1_276']}} {{translation['Patie_1_184']}} </strong>
              </h4>
            </div>
          </a>
          <a href="javascript:;" @click="goto(`/hospital/patients`)">
            <div class="home-tab">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                {{translation.enrol_1_496}} <strong class="strong">{{translation['Patie_1_184']}} {{translation['Statu_1_202']}} </strong>
              </h4>
            </div>
          </a>
          <a href="javascript:;" @click="goto(`/users`)">
            <div class="home-tab with-arrow">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                {{translation.Manag_1_455}} <strong class="strong">{{translation['Users_1_504']}} </strong>
              </h4>
            </div>
          </a>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="1"></a-col>
        <a-col :span="11" class="mtminus-5">  
          <treatment-stats />
        </a-col>
    </a-card>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import treatmentStats from '~/components/statistics/treatment'
export default {
  components: { treatmentStats },
  mixins: [routeHelpers, userDetail],
  data() {
    return {}
  },
  mounted() {},
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
