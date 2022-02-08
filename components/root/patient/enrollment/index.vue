<template>
  <div>
    <a-spin :spinning="loading">
      <a-tabs tab-position="left" :active-key="activeTab" @change="tabChange">
        <a-tab-pane :key="1" tab="Patient Details"
          ><enrollment :treatment="treatment" />
        </a-tab-pane>
        <a-tab-pane :key="2" tab="Consent"
          ><consent
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane :key="3" :disabled="!haveTreatment" tab="Screening"
          ><screening
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane
          :key="4"
          :disabled="!treatment.screeningStatus"
          tab="Scheduling"
        >
          <scheduling :treatment="treatment" />
        </a-tab-pane>
      </a-tabs>
    </a-spin>
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
export default {
  components: {
    enrollment,
    consent,
    scheduling,
    screening,
  },
  mixins: [notifications],
  data() {
    return {
      activeTab: 1,
      treatment: {},
      haveTreatment: false,
      loading: true,
    }
  },
  mounted() {
    this.isTreatmentCreate()
  },
  methods: {
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
