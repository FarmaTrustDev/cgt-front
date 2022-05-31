<template>
  <div>
    <a-skeleton :loading="loading">
      <a-tabs tab-position="left" :active-key="activeTab" @change="tabChange">
        <a-tab-pane key="enrollment" :tab="translation['PatieDetai_2_673']"
          ><enrollment 
          :treatment="treatment" 
          @getNextTab="getNextTab"
          />
        </a-tab-pane>
        <a-tab-pane key="Consent" :disabled="!isCreated" :tab="translation['Conse_1_677']"
          ><consent
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane key="Screening" :disabled="!haveTreatment" :tab="translation['Scree_1_679']">
          <screening
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane
          key="Scheduling"
          :disabled="!treatment.screeningStatus"
          :tab="translation['Sched_1_681']"
        >
          <scheduling :treatment="treatment" />
        </a-tab-pane>
      </a-tabs>
    </a-skeleton>
  </div>
</template>

<script>
import enrollment from '~/components/patient/enrollment/Form'
import consent from '~/components/treatment/enrollment/Consent'
import screening from '~/components/treatment/enrollment/screening'
import scheduling from '~/components/treatment/enrollment/scheduling'
import { isEmpty } from '~/services/Utilities'
import TreatmentServices from '~/services/API/TreatmentServices'
import PatientServices from '~/services/API/PatientServices'
import notifications from '~/mixins/notifications'
import tabsHelpers from '~/mixins/tabs-helpers'
import nullHelper from '~/mixins/null-helpers'
export default {
  components: {
    enrollment,
    consent,
    scheduling,
    screening,
  },
  mixins: [notifications, tabsHelpers, nullHelper],
  data() {
    return {
      activeTab: "enrollment",
      treatment: {},
      isCreated:false,
      haveTreatment: false,
      loading: true,
    }
  },
  mounted() {
    this.isTreatmentCreate()
    this.handleActiveTab()
    this.isPatientCreated()
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
    handleActiveTab() {
      if(this.$route.query.view){
        this.activeTab=this.$route.query.view
      }
    },
    isPatientCreated(){
      const globalId = this.$route.params.id

      if (this.isGuid(globalId)) {
        this.entityId = globalId

        this.fetchPatient(globalId)
      }
    },
    fetchPatient(id) {
      this.loading = true
      PatientServices.getById(id)
        .then((response) => {
          this.patient = response.data
          this.isCreated = true
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    isTreatmentCreate() {
      const query = this.$route.query
      this.loading = true
      if (!isEmpty(this.$route.query) && !isEmpty(query.treatment_id)) {
        this.fetch(query.treatment_id)
      } else {
        this.loading = false
      }
    },
    fetch(treatmentId) {
      this.loading = true
      TreatmentServices.detail(treatmentId)
        .then((response) => {
          this.updateTreatment(response.data)
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
    updateTreatment(treatment) {
      this.treatment = treatment
      this.haveTreatment = true
    },
    tabChange(key) {
      this.activeTab = key
    },
    getNextTab(key) {
      this.tabChange(key)
    },
  },
}
</script>
