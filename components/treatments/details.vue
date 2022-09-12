<template>
  <div class="patient-details-page">
    <div class="grey-card mt-5">
      <a-row :gutter="18" class="mtminus-2">
        <a-col :span="6">
          <a-card :bordered="false" class="qr-section default-card">
            <ProfilePictureCard
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
            <PatientDetails
              v-if="!isEmpty(treatment.patient)"
              :patient="treatment.patient"
            />
          </a-card>
        </a-col>
      </a-row>

      <a-row
        v-if="!isEmpty(treatment.patient) && treatment.screeningStatus"
        :gutter="18"
        class="mt-15"
      >
        <TreatmentDetails
          v-if="!isEmpty(treatment.patient)"
          :treatment="treatment"
        />
      </a-row>
    </div>
  </div>
</template>

<script>
import TreatmentDetails from '~/components/scheduling/TreatmentDetails'
import PatientDetails from '~/components/patient/Detail'
import ProfilePictureCard from '~/components/patient/ProfilePictureCard'

import { isEmpty } from '~/services/Helpers'
export default {
  components: {
    TreatmentDetails,
    PatientDetails,
    ProfilePictureCard,
  },
  props: {
    treatment: { type: Object, required: true },
  },
  data() {
    return {
      qrUrl:
        'https://demoapi.qmaid.co/patient/8/treatment/qr/637765674125093892.png',
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods: {
    isEmpty,
  },
}
</script>
