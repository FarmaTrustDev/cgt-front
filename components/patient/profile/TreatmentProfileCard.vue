<template>
  <div class="patient-details-page">
    <a-row :gutter="18">
      <a-col :span="6">
        <a-card :bordered="false" class="qr-section default-card">
          <TreatmentProfileCard
            v-if="!isEmpty(treatment.patient)"
            :patient="treatment.patient"
          />
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="false" class="default-card details-section">
          <article class="article">
            <h4 class="heading pl-0">{{translation.PatieDetai_2_673}}</h4>
          </article>
          <PatientTreatmentDetails
            v-if="!isEmpty(treatment.patient)"
            :patient="treatment"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Helpers'
import PatientTreatmentDetails from '~/components/patient/PatientTreatmentDetail'
import TreatmentProfileCard from '~/components/patient/TreatmentProfileCard'
export default {
  components: {
    PatientTreatmentDetails,
    TreatmentProfileCard,
  },
  props: {
    treatment: { type: Object, required: true },
  },
  methods: {
    isEmpty,
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }
}
</script>
