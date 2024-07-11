<template>
  <page-layout
    :loading="loading"
    :title="translation.TreatStatu_2_748"
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
                  :initial="1"
                  :current="currentPhase"
                  @change="onChangeSteps"
                >
                  <a-step
                    v-for="phase in phases"
                    :key="phase.id"
                    :title="phase.name"
                    :class="getTabClass(currentPhase, phase)"
                    @click="stepClick(entity, phase, phase.alias, phase.id)"
                  />
                </a-steps>
              </span>
            </div>
            <!-- //Steps -->
          </span>
        </a-card>
        <a-card
          v-if="entity.isHold | entity.isCancel"
          :bordered="false"
          class="mt-15 default-card"
        >
          <a-alert
            v-if="entity.isHold"
            type="error"
            message="Treatment has been paused"
          />
          <a-alert
            v-if="entity.isCancel"
            type="error"
            message="Treatment has been cancelled"
          />
        </a-card>

        <a-card v-else :bordered="false" class="mt-15 default-card h-tabs manf-detail-list">
          <h1 class="heading"><b class="ml-5">{{translation.ManufDetai_2_1141}}</b></h1>
          
          <BagDetail
            v-if="activeTab === 'INBOUND_SHIPMENT'"
            :treatment="entity"
          />
          <shipment
            v-if="activeTab === 'INBOUND_SHIPMENT'"
            :treatment="entity"
          /> 
          <div v-if="user.roleName === 'CDMO' && entity.phaseId === 9 && activeTab === 'MANUFACTURER'">
            <process
              v-if="activeTab === 'MANUFACTURER'"
              :treatment="entity"
              @fetchTreatment="fetchTreatment"
            />
          </div>
          <div v-if="user.roleName === 'CMC' && cDMOStatus && activeTab === 'MANUFACTURER'">
            <process
              v-if="activeTab === 'MANUFACTURER'"
              :treatment="entity"
              @fetchTreatment="fetchTreatment"
            />
          </div>
          <div v-else-if="user.roleName === 'CMC' && cDMORStatus && activeTab === 'MANUFACTURER'">
            <a-alert
            type="error"
            message="QP Rejected by CDMO"
          />
          </div>
          <div v-else-if="user.roleName === 'CMC' && !cDMOStatus && activeTab === 'MANUFACTURER'">
            <a-alert
            type="error"
            message="Waiting for CDMO approval"
            />
          </div>
          <div v-if="checkAction()">
            <QrViewer
              v-if="activeTab === 'OUTBOUND_SHIPMENT'"
              :treatment="entity"
            />
          </div>
          <div v-if="user.roleName === 'CMC' && cMCStatus && activeTab === 'OUTBOUND_SHIPMENT'">
            <scheduling-basic-request
              v-if="activeTab === 'OUTBOUND_SHIPMENT' "
              :treatment="entity"
              @fetchTreatment="fetchTreatment"
            />
          </div>
          <div v-else-if="user.roleName === 'CMC' && cMCRStatus && activeTab === 'OUTBOUND_SHIPMENT'">
            <a-alert
            type="error"
            message="QP Rejected by CMC"
          />
          </div>
          <div  v-else-if="user.roleName === 'CMC' && !cMCStatus && activeTab === 'OUTBOUND_SHIPMENT'">
            <a-alert
            type="error"
            message="Waiting for CMC QP approval"
          />
          </div>
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
import BagDetail from '~/components/bags/BagsDetail'
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
    BagDetail,
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
      disableNextTab: false,
      viewAlreadyLoaded: false,
      treatmentCurrentPhase: 1,
      cMC:false,
      cDMO:false,
      cMCStatus:false,
      cDMOStatus:false,
      cDMORStatus:false,
      cMCRStatus:false,
      patientId:0,
      treatmentId:0,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.phases[0].name = newValues.InbouAccep_3_834
        this.phases[1].name = newValues.Manuf_1_342
        this.phases[2].name = newValues.OutboShipm_2_376
      }
    },
  },
  mounted() {
    this.handleActiveTab()
    this.getQPStatus()
  },
  methods: {
    checkAction() {
      return !(this.entity.isHold | this.entity.isCancel)
    },
    handleActiveTab() {
      console.log(this.$route.params.id)
      this.activeTab = this.$route.query.view
      this.patientId = this.$route.query.patientId
      this.treatmentId = this.$route.query.treatmentId
      this.viewAlreadyLoaded = true
    },
    getQPStatus(){
      if(this.user.roleName === 'CMC' && this.activeTab === 'MANUFACTURER' ){
        this.cMC = true
        TreatmentServices.getCDMOStatus(this.treatmentId, this.patientId).then((response)=>{
          if(response.data.status === 'Approved'){
            this.cDMOStatus =  true
          }
          if(response.data.status === 'Rejected'){
            this.cDMORStatus =  true
          }
          // console.log(response)
        })
      }
      if(this.user.roleName === 'CMC'  && this.activeTab === 'OUTBOUND_SHIPMENT'){
        this.cMC = true
        TreatmentServices.getCMCStatus(this.treatmentId, this.patientId).then((response)=>{
          // this.cDMOStatus = response.data.status !== null ? true : false
          if(response.data.status === 'Approved'){
            this.cMCStatus =  true
          }
          if(response.data.status === 'Rejected'){
            this.cMCRStatus =  true
          }
          // console.log(response)
        })
      }
    },
    getTabClass(currentPhase, phase) {
      return (
        this.getActiveClass(currentPhase, phase) +
        ' ' +
        this.getCompleteClass(currentPhase, phase)
      )
    },
    getCompleteClass(currentPhase, phase) {
      if (
        currentPhase > phase.id ||
        this.treatmentCurrentPhase > phase.id ||
        this.treatmentCurrentPhase === 3 // worst workaround
      ) {
        return 'ant-steps-item-active-large'
      }
    },
    getActiveClass(currentPhase, phase) {
      if (currentPhase === phase.id) {
        return 'ant-steps-item-active-blue-large' // active class
      }
      return 'ant-steps-horizontal-large'
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
        this.treatmentCurrentPhase = currentPhase
        return currentPhase
      }
      return 1
    },
    afterFetch(data) {
      this.loading = false
      this.getCurrentStep(this.entity)
      // if (this.viewAlreadyLoaded) {
      //   this.currentPhase = this.loadCurrentPhaseFromURL()
      // }
    },
    loadCurrentPhaseFromURL() {
      this.viewAlreadyLoaded = false
      return 1
    },
    stepClick(record, phase, alias, phaseId) {
      this.getQPStatus()
      this.disableNextTab = false
      if (
        record.phaseId >= phase.enablePageId
        // ||         phase.id === this.currentPhase
      ) {
        this.setActiveTab(alias)
        this.currentPhase = phaseId
        return this.goto(
          `/manufacturer/treatments/process/${record.globalId}`,
          { ...phase.params }
        )
      } else {
        this.disableNextTab = true
      }

      return false
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    fetchTreatment(treatmentId) {
      if(this.user.roleName === 'CDMO'){
        this.fetch(treatmentId)
        this.goto(
          `/manufacturer/treatments`
        )
        // this.setActiveTab('MANUFACTURER')
      }else{
        this.fetch(treatmentId)
        this.goto(
          `/manufacturer/treatments/process/${treatmentId}?view=OUTBOUND_SHIPMENT`
        )
        this.setActiveTab('OUTBOUND_SHIPMENT')
      }
    },
    onChangeSteps(step) {
      // if (!this.disableNextTab) {
      //   this.currentPhase = step
      // }
    },
  },
}
</script>
