<template>
  <div>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted"> {{ translation.PatieID_2_264 }}:</span>
          <span>{{ patient.enrollmentNumber }}</span>
        </h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">{{ translation.Gende_1_637 }}:</span>
          <span>{{ patient.gender == 1 ? 'Male' : 'Female' }}</span>
        </h6>
      </a-col>
      <a-col :span="6" class="mt-15">
        <h6>
          <span class="text-muted"> {{ translation.Age_1_746 }}:</span>
          <span>{{ patient.age }}</span>
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">Height (cm): </span>
          <span>{{ patient.height }}</span>
        </h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted"> Weight (kg): </span
          ><span>{{ patient.weight }} kg</span>
        </h6>
      </a-col>
      <a-col :span="6" class="mt-15">
        <h6>
          <span class="text-muted">{{ translation.BloodType_2_635 }}:</span
          ><span class="text-right">{{ patient.bloodType }}</span>
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">{{ translation.Locat_1_448 }}:</span>
          <span>{{ patient.city }}</span>
        </h6>
      </a-col>
      <a-col :span="10" class="mt-15">
        <h6>
          <span class="text-muted" style="width: 25%"
            >{{ translation.EmailAddre_2_140 }}:</span
          ><span style="width: 155px; overflow: hidden; height: 40px">
            {{ patient.email }}</span
          >
        </h6>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    patient: { type: Object, required: true },
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
<style scoped>
h6 {
  display: flex;
}
</style>
