<template>
  <div class="home-page">
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/inventory/treatment`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                Today's 
                <strong class="strong"> Tasks </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/inventory/storage`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                Manage <strong class="strong"> Inventory </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="goto(`/users`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                width="120"
                height="100"
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
