<template>
  <figure class="m-0">
    <img
      class="img-fluid"
      :src="getAbsolutePath(patient.qrUrl)"
      alt="Christina Braun"
    />
    
    <figcaption>Patient ID: {{ patient.enrollmentNumber }}</figcaption>
  </figure>
</template>
<script>
import { getAbsolutePath } from '~/services/Helpers/'

export default {
  props: {
    patient: { type: Object, required: true },
  },
  methods: {
    getAbsolutePath,
  },
}
</script>
