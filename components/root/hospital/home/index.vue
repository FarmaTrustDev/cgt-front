<template>
  <div class="home-page">
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <a href="javascript:;" @click="goto(`/hospital/patients/create`)">
            <div class="home-tab">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Check <strong class="strong">New Patient </strong>
              </h4>
            </div>
          </a>
          <a href="javascript:;" @click="goto(`/hospital/patients`)">
            <div class="home-tab">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Enroll <strong class="strong">Patient Status </strong>
              </h4>
            </div>
          </a>
          <a href="javascript:;" @click="goto(`/users`)">
            <div class="home-tab with-arrow">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Manage <strong class="strong">Users </strong>
              </h4>
            </div>
          </a>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="2"></a-col>
        <a-col :span="3"></a-col>

        <a-col :span="9">
          <treatment-stats />
        </a-col>
      </a-row>
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
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
