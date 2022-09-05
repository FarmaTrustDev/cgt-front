<template>
  <div class="home-page manf-board">
    <a-card class="grey-card" :bordered="false">
      <!-- left side tabs -->
      <a-col :md="11" class="mtminus-6">
        <a
          href="javascript:;"
          @click="handleSidebarKey(`/hospital/patients/create`, 3)"
        >
          <div class="home-tab">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
              width="120"
              height="100"
            />
            <h4 class="heading-home">
              {{ translation.enrol_1_496 }}
              <strong class="strong"
                >{{ translation['new_1_276'] }} {{ translation['Patie_1_184'] }}
              </strong>
            </h4>
          </div>
        </a>
        <a href="javascript:;" @click="handleSidebarKey(`/hospital/patients`, 2)">
          <div class="home-tab">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
              width="120"
              height="100"
            />
            <h4 class="heading-home">
              {{ translation.Check_1_454 }}
              <strong class="strong"
                >{{ translation['Patie_1_184'] }}
                {{ translation['Statu_1_202'] }}
              </strong>
            </h4>
          </div>
        </a>
        <a href="javascript:;" @click="handleSidebarKey(`/users`, 8)">
          <div v-if="isHospital()" class="home-tab with-arrow">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
              width="120"
              height="100"
            />
            <h4 class="heading-home">
              {{ translation.Manag_1_455 }}
              <strong class="strong">{{ translation['Users_1_504'] }} </strong>
            </h4>
          </div>
        </a>
      </a-col>
      <!-- #end left side tabs -->
      <a-col :span="3"></a-col>

      <a-col :md="10" class="mtminus-5">
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    gotoView(uri, key) {
      this.$store.commit('setSelectedMenu', [`${key}`])
      this.goto(`/${uri}`)
    },
  },
}
</script>
