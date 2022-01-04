<template>
  <div class="patient-details-page">
    <div class="grey-card">
      <a-row :gutter="18">
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
              <h4 class="heading pl-0">Patient Details</h4>
            </article>
            <PatientDetails
              v-if="!isEmpty(treatment.patient)"
              :patient="treatment.patient"
            />
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="18" class="mt-15">
        <TreatmentDetails
          v-if="!isEmpty(treatment.patient)"
          :treatment="treatment"
        />
      </a-row>
      <status />
      <TreatmentView />
    </div>
  </div>
</template>

<script>
import TreatmentDetails from '~/components/scheduling/TreatmentDetails'
import PatientDetails from '~/components/patient/Detail'
import ProfilePictureCard from '~/components/patient/ProfilePictureCard'
import TreatmentView from '~/components/treatment/view'
import status from '~/components/treatment/status'
import { isEmpty } from '~/services/Helpers'
export default {
  components: {
    TreatmentDetails,
    PatientDetails,
    ProfilePictureCard,
    TreatmentView,
    status,
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
  methods: {
    isEmpty,
  },
}
</script>
