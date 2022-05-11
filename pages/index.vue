<template>
  <div class="home-page">
    <h1 class="title"><strong>My Dashboard</strong></h1>
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/hospital/patients/create`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
              />
              <h4 class="heading-home">
                Check <strong class="strong">New Patient </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/hospital/patients`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
              />
              <h4 class="heading-home">
                Enroll <strong class="strong">Patient Status </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="goto(`/users`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
              />
              <h4 class="heading-home">
                Manage <strong class="strong">Users </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="2"></a-col>
        <a-col :span="3"></a-col>

        <a-col :span="9">
          <TimeAndTreatmentList />
        </a-col>
        <a-col :span="9">
          <treatment-stats />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'

import routeHelpers from '~/mixins/route-helpers'
import treatmentStats from '~/components/statistics/treatment'
import TimeAndTreatmentList from '~/components/statistics/TimeAndTreatmentList'
export default {
  components: { treatmentStats, TimeAndTreatmentList },
  mixins: [routeHelpers],
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
