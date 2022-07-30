<template>
  <div>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted"> {{translation.PatieID_2_264}}:</span>
          {{ patient.enrollmentNumber }}
        </h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">{{translation.Gende_1_637}}:</span> {{ patient.gender==1 ? 'Male': 'Female' }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted"> {{translation.Age_1_746}}:</span> {{ patient.age }}</h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">Height (cm): </span> {{ patient.height }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted"> Weight (kg): </span>{{ patient.weight }} kg</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">{{translation.BloodType_2_635}}:</span>{{ patient.bloodType }}
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">{{translation.Locat_1_448}}:</span> {{ patient.city }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">{{translation.EmailAddre_2_140}}:</span> {{ patient.email }}</h6>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    patient: { type: Object, required: true },
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }, 
}
</script>
