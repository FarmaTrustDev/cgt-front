<template>
  <div class="home-page manf-home">
    <a-card class="grey-card" :bordered="false">
      <a-row class="">
        <!-- left side tabs -->
        <a-col :md="10" v-if="isManufacturer() || isPharma()">
          <div class="home-tab">
            <a
              href="javascript:;"
              @click="handleSidebarKey(`/manufacturer/schedules`, 3)"
            >
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
            <a
              href="javascript:;"
              @click="handleSidebarKey(`/manufacturer/treatments`, 4)"
            >
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
            <a href="javascript:;" @click="handleSidebarKey(`/users`, 11)">
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
        <a-col :md="10" v-if="isImmatics() || isCMC() || isCDMO()">
          <!--@click="handleSidebarKey(`/hospital/patients`, 2)"-->
          <a href="javascript:;">
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
         
          <div class="home-tab">
            <a
              href="javascript:;"
              @click="handleSidebarKey(`/manufacturer/treatments`, 4)"
            >
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
            <a href="javascript:;" @click="handleSidebarKey(`/chat`, 11)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                
                <strong class="strong">
                  Chat
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
              @click="
                handleSidebarKey(
                  `/manufacturer/treatments/pendingTreatment`,
                  12
                )
              "
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
        <a-col v-if="!isImmatics() && !isCMC() && !isCDMO()" :md="10">
          <TimeAndTreatmentList />
        </a-col>
        <a-col v-else :md="10" class="mtminus-5">
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
import TimeAndTreatmentList from '~/components/statistics/TimeAndTreatmentList'
import treatmentStats from '~/components/statistics/treatment'
export default {
  components: { treatmentStats, TimeAndTreatmentList },
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
