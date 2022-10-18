<template>
  <div>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">
            {{ translation.PatieID_2_264 }}:&nbsp;</span
          >
          <span> {{ patient.enrollmentNumber }}</span>
        </h6>
      </a-col>
      <a-col :span="10" class="mt-15">
        <h6>
          <span class="text-muted">{{ translation.Gende_1_637 }}:&nbsp;</span>
          <span>{{ patient.gender == 1 ? 'Male' : 'Female' }}</span>
        </h6>
      </a-col>
      <a-col :span="6" class="mt-15">
        <h6>
          <span class="text-muted"> {{ translation.Age_1_746 }}:&nbsp;</span>
          <span> {{ patient.age }}</span>
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">Height (cm):&nbsp;</span>
          <span>{{ patient.height }}</span>
        </h6>
      </a-col>
      <a-col :span="10" class="mt-15">
        <h6>
          <span class="text-muted"> Weight (kg):&nbsp;</span
          ><span> {{ patient.weight }} kg</span>
        </h6>
      </a-col>
      <a-col :span="6" class="mt-15">
        <h6>
          <span class="text-muted"
            >{{ translation.BloodType_2_635 }}:&nbsp;</span
          ><span class="text-right">{{ patient.bloodType!==null ? patient.bloodType : 'N/A'}}</span>
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">{{ translation.Locat_1_448 }}:&nbsp;</span>
          <span>{{ patient.city }}</span>
        </h6>
      </a-col>
      <a-col :span="10" class="mt-15">
        <h6>
          <!-- {{ translation.EmailAddre_2_140 }} -->
          <span class="text-muted">Email:&nbsp;</span
          ><span style="overflow: hidden; height: 40px">
            {{ patient.email }}</span
          >
        </h6>
      </a-col>
      <a-col :span="6" class="mt-15">
        <h6>
          <span class="text-muted"
            >DOB:&nbsp;</span
          ><span class="text-right">{{ getDateFormat(patient.dob) }}</span>
        </h6>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import moment from 'moment'
export default {
  props: {
    patient: { type: Object, required: true },
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods:{
    getDateFormat(date) {
      return moment(String(date)).format('DD/MM/YYYY')
    },
  }
}
</script>
<style scoped>
h6 {
  display: flex;
}
</style>
