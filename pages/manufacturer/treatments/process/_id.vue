<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page container"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <profile-picture-and-detail :treatment="entity" />
        <a-card :bordered="false" class="mt-15 default-card h-tabs">
          <span>
            <!-- //Steps -->
            <div class="treatment-steps" style="width:105%; margin-left:-3%; padding-right:2%">
              <span class="step-col-large">
              <a-steps size="small" :initial="1" :current="getCurrentStep(entity)">
                <a-step
                  v-for="phase in phases"
                  :key="phase.id"
                  :title="phase.name"
                  :class="(currentPhase>phase.id) ? 'ant-steps-item-active-large': (currentPhase==phase.id) ? 'ant-steps-item-active-blue-large':'ant-steps-horizontal-large'"
                  @click="stepClick(entity, phase, phase.alias)"
                />
              </a-steps>
              </span>
            </div>
            <!-- //Steps -->
          </span> 
        </a-card>
        <a-card :bordered="false" class="mt-15 default-card h-tabs">
          <shipment v-if="activeTab==='INBOUND_SHIPMENT'" :treatment="entity" />
          <process v-if="activeTab==='MANUFACTURER'" :treatment="entity" @fetchTreatment="fetchTreatment" />
          <QrViewer v-if="activeTab==='OUTBOUND_SHIPMENT'" :treatment="entity" />
          <scheduling-basic-request
            v-if="activeTab==='OUTBOUND_SHIPMENT'"
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
import ProfilePictureCard from '~/components/patient/profile/ProfileAndDetail'
import process from '~/components/root/manufacturer/treatments/process'
import QrViewer from '~/components/bags/Viewer'
import shipment from '~/components/treatment/shipment'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import schedulingBasicRequest from '~/components/scheduling/request/BasicForm'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
import {
  MANUFACTURER_TREATMENT_PENDING_PHASES_DETAILS
} from '~/services/Constant/Phases'
export default {
  components: {
    process,
    'page-layout': PageLayout,
    'profile-picture-and-detail': ProfilePictureCard,
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
      phases:MANUFACTURER_TREATMENT_PENDING_PHASES_DETAILS,
      currentPhase:1,
      activeTab:'INBOUND_SHIPMENT',
    }
  },
  mounted() {
    this.handleActiveTab()
  },
  computed: {
    translation() {
        return this.$store.getters.getTranslation
    },
  },
  methods: {
    handleActiveTab(){
      this.activeTab=this.$route.query.view
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
        this.currentPhase=currentPhase
        return currentPhase
      }
      return 1
    },
    afterFetch(data) {
      this.loading = false
      // console.log(data)
    },
    stepClick(record, phase,alias) {
      // console.log(record.phaseId+'-'+phase.enablePageId+'-'+this.currentPhase)
      if ((record.phaseId >= phase.enablePageId) || (phase.id===this.currentPhase)) {
        this.setActiveTab(alias)
        return this.goto(
          `/manufacturer/treatments/process/${record.globalId}`,
          { ...phase.params }
        )
      }
      return false
    },
    setActiveTab(tab){
      this.activeTab=tab
    },
    fetchTreatment(treatmentId) {
      this.fetch(treatmentId)
      this.goto(`/manufacturer/treatments/process/${treatmentId}?view=OUTBOUND_SHIPMENT`)
      this.setActiveTab('OUTBOUND_SHIPMENT')
    },
  },
}
</script>
