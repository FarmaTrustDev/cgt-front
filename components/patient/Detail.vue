<template>
  <div>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted"> Patient ID:</span>
          {{ patient.enrollmentNumber }}
        </h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">Gender:</span> {{ patient.gender }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted"> Age:</span> {{ patient.age }}</h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">Height:</span> {{ patient.height }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted"> Weight:</span>{{ patient.weight }} kg</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6>
          <span class="text-muted">Blood Type :</span>{{ patient.bloodType }}
        </h6>
      </a-col>
    </a-row>
    <a-row :gutter="20" dir="ltr">
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">Location :</span> {{ patient.city }}</h6>
      </a-col>
      <a-col :span="8" class="mt-15">
        <h6><span class="text-muted">Email :</span> {{ patient.email }}</h6>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    patient: { type: Object, required: true },
  },
}
</script>
