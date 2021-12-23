<template>
  <div>
    <a-tabs
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" tab="Patient Detail"
        ><enrollment :treatment="treatment" />
      </a-tab-pane>
      <a-tab-pane :key="2" tab="Consent"
        ><consent :treatment="treatment" />
      </a-tab-pane>
      <a-tab-pane :key="3" tab="Screening"
        ><screening :treatment="treatment" />
      </a-tab-pane>
      <a-tab-pane :key="4" tab="Scheduling"> Content of Tab Pane 4 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import enrollment from '~/components/patient/enrollment'
import consent from '~/components/treatment/enrollment/Consent'
import screening from '~/components/treatment/enrollment/screening'
import { isEmpty } from '~/services/Utilities'
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  components: {
    enrollment,
    consent,
    screening,
  },
  data() {
    return {
      activeTab: 1,
      treatment: {},
    }
  },
  mounted() {
    // console.log(this.$route)
    this.isTreatmentCreate()
  },
  methods: {
    isTreatmentCreate() {
      const query = this.$route.query
      if (!isEmpty(this.$route.query) && !isEmpty(query.treatment_id)) {
        // console.log(query.treatment_id)
        this.fetch(query.treatment_id)
      }
    },
    fetch(treatmentId) {
      TreatmentServices.getById(treatmentId).then((response) => {
        this.treatment = response.data
      })
    },
    tabChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
</script>
