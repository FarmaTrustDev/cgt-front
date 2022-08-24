<template>
  <div class="home-page manf-home">
    <a-card class="grey-card" :bordered="false">
      <a-row class="">
        <!-- left side tabs -->
        <a-col :md="10" v-if="isManufacturer()">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/manufacturer/schedules`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                {{ translation.Manuf_1_342 }}
                <strong class="strong"> {{ translation.Sched_1_21 }} </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/manufacturer/treatments`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                {{ translation.Manag_1_455 }}
                <strong class="strong"> {{ translation.Treat_1_29 }} </strong>
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
                {{ translation.Manag_1_455 }}
                <strong class="strong">
                  {{ translation.ManagUsers_2_17 }}
                </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <a-col :md="10" v-if="isReceptionist() || isScientist()">
          <div class="home-tab">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
              width="120"
              height="100"
            />
            <h4 class="heading-home">
              <strong class="strong"> Scan Bag </strong>
            </h4>
          </div>
          <div class="home-tab">
            <a
              href="javascript:;"
              @click="goto(`/manufacturer/treatments/pendingTreatment`)"
            >
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                <strong class="strong"> Ongoing Treatment </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="4"></a-col>
        <a-col :md="10">
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
