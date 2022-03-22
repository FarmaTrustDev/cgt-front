<template>
  <div>
    <a-skeleton :loading="loading">
      <a-tabs tab-position="left" :active-key="activeTab" @change="tabChange">
        <a-tab-pane key="Enrollment" tab="Patient Details"
          ><enrollment 
          :treatment="treatment" 
          @getNextTab="getNextTab"
          />
        </a-tab-pane>
        <a-tab-pane key="Consent" tab="Consent"
          ><consent
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane key="Screening" :disabled="!haveTreatment" tab="Screening">
          <screening
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane
          key="Scheduling"
          :disabled="!treatment.screeningStatus"
          tab="Scheduling"
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
import notifications from '~/mixins/notifications'
import tabsHelpers from '~/mixins/tabs-helpers'
export default {
  components: {
    enrollment,
    consent,
    scheduling,
    screening,
  },
  mixins: [notifications, tabsHelpers],
  data() {
    return {
      activeTab: "Enrollment",
      treatment: {},
      haveTreatment: false,
      loading: true,
    }
  },
  mounted() {
    this.isTreatmentCreate()
    this.handleActiveTab()
  },
  methods: {
    updatedKey() {},
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
