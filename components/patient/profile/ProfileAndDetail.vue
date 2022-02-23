<template>
  <div class="patient-details-page">
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
  </div>
</template>
<script>
import { isEmpty } from '~/services/Helpers'
import PatientDetails from '~/components/patient/Detail'
import ProfilePictureCard from '~/components/patient/ProfilePictureCard'
export default {
  components: {
    PatientDetails,
    ProfilePictureCard,
  },
  props: {
    treatment: { type: Object, required: true },
  },
  methods: {
    isEmpty,
  },
}
</script>
