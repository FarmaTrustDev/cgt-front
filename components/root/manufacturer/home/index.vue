<template>
  <div class="home-page">
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/manufacturer/schedules`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Manufacturing <strong class="strong"> Schedule </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/manufacturer/treatments`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Manage <strong class="strong"> Treatments </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="goto(`/users`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                Manage <strong class="strong"> Users </strong>
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
      </a-row>
    </a-card>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import TimeAndTreatmentList from '~/components/statistics/TimeAndTreatmentList'
export default {
  components: { TimeAndTreatmentList },
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
