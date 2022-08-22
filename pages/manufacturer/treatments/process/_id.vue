<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page container"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <treatment-profile-picture-and-detail :treatment="entity" />
        <a-card :bordered="false" class="mt-15 default-card-x h-tabs">
          <span>
            <!-- //Steps -->
            <div
              class="treatment-steps"
              style="width: 100%; margin-left: 0%; padding-right: 2%"
            >
              <span class="step-col-large">
                <a-steps
                  size="small"
                  :initial="1"
                  :current="currentPhase"
                  @change="onChangeSteps"
                >
                  <a-step
                    v-for="phase in phases"
                    :key="phase.id"
                    :title="phase.name"
                    :class="
                      currentPhase > phase.id
                        ? 'ant-steps-item-active-large'
                        : currentPhase == phase.id
                        ? 'ant-steps-item-active-blue-large'
                        : 'ant-steps-horizontal-large'
                    "
                    @click="stepClick(entity, phase, phase.alias, phase.id)"
                  />
                </a-steps>
              </span>
            </div>
            <!-- //Steps -->
          </span>
        </a-card>
        <a-card v-if="entity.isHold == true | entity.isCancel == true" :bordered="false" class="mt-15 default-card">
        <a-alert  v-if="entity.isHold == true" type="error" message="Treatment has been paused"  />
        <a-alert  v-if="entity.isCancel == true" type="error" message="Treatment has been cancelled"  />
        </a-card>
        <a-card v-else :bordered="false" class="mt-15 default-card h-tabs">
          <shipment
            v-if="activeTab === 'INBOUND_SHIPMENT'"
            :treatment="entity"
          />
          <process
            v-if="activeTab === 'MANUFACTURER'"
            :treatment="entity"
            @fetchTreatment="fetchTreatment"
          />
          <QrViewer
            v-if="activeTab === 'OUTBOUND_SHIPMENT'"
            :treatment="entity"
          />
          <scheduling-basic-request
            v-if="activeTab === 'OUTBOUND_SHIPMENT'"
            :treatment="entity"
            @fetchTreatment="fetchTreatment"
          />
        </a-card>
      </div>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import withFetch from '~/mixins/with-fetch'
import TreatmentServices from '~/services/API/TreatmentServices'
import TreatmentProfilePictureCard from '~/components/patient/profile/TreatmentProfileCard'
import process from '~/components/root/manufacturer/treatments/process'
import QrViewer from '~/components/bags/Viewer'
import shipment from '~/components/treatment/shipment'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import schedulingBasicRequest from '~/components/scheduling/request/BasicForm'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
import { MANUFACTURER_TREATMENT_PENDING_PHASES_DETAILS } from '~/services/Constant/Phases'
export default {
  components: {
    process,
    'page-layout': PageLayout,
    'treatment-profile-picture-and-detail': TreatmentProfilePictureCard,
    shipment,
    'scheduling-basic-request': schedulingBasicRequest,
    QrViewer,
  },
  mixins: [withFetch],
  middleware: 'auth',

  data() {
    return {
      loading: true,
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
      params: {
        ManufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        LogisticStatusNot: SCHEDULING_STATUSES.rejected.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
        direction: 1,
      },
      phases: MANUFACTURER_TREATMENT_PENDING_PHASES_DETAILS,
      currentPhase: 1,
      activeTab: 'INBOUND_SHIPMENT',
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      console.log(oldValue)
      if(newValues!==oldValue){
        this.phases[0].name=newValues.InbouAccep_3_834
        this.phases[1].name=newValues.Manuf_1_342
        this.phases[2].name=newValues.OutboShipm_2_376
      }
    }
  },  
  mounted() {
    this.handleActiveTab()
  },
  methods: {
    handleActiveTab() {
      this.activeTab = this.$route.query.view
    },
    getCurrentStep(treatment) {
      if (treatment.phaseId != null) {
        const phases = this.phases
        let currentPhase = 0
        for (let phase = 0; phase < phases.length; phase++) {
          if (phases[phase].phaseId <= treatment.phaseId) {
            currentPhase = phases[phase].id
          } else {
            currentPhase = phases[phase].id
            break
          }
        }
        this.currentPhase = currentPhase
        return currentPhase
      }
      return 1
    },
    afterFetch(data) {
      this.loading = false
      this.getCurrentStep(this.entity)
      // console.log(data)
    },
    stepClick(record, phase, alias, phaseId) {
      // console.log(record.phaseId+'-'+phase.enablePageId+'-'+this.currentPhase)
      if (
        record.phaseId >= phase.enablePageId ||
        phase.id === this.currentPhase
      ) {
        this.setActiveTab(alias)
        this.currentPhase = phaseId
        return this.goto(
          `/manufacturer/treatments/process/${record.globalId}`,
          { ...phase.params }
        )
      }
      return false
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    fetchTreatment(treatmentId) {
      this.fetch(treatmentId)
      this.goto(
        `/manufacturer/treatments/process/${treatmentId}?view=OUTBOUND_SHIPMENT`
      )
      this.setActiveTab('OUTBOUND_SHIPMENT')
    },
    onChangeSteps(step) {
      this.currentPhase = step
    },
  },
}
</script>
