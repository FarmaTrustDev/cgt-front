<template>
  <div>
    <a-skeleton :loading="loading">
     
      <dl class="row common-detail">
        <dt>Manufacturer:</dt>
        <dd>{{ treatmentData.manufacturerName }}</dd>
        <dt>Contact:</dt>
        <dd>{{ treatmentData.manufacturerContact }}</dd>
        <dt>Logistic:</dt>
        <dd>{{ treatmentData.logisticName }}</dd>
        <dt>Contact:</dt>
        <dd>{{ treatmentData.logisticContact }}</dd>
      </dl>
    </a-skeleton>
  </div>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Helpers'
export default {
  props: {
    treatmentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return { treatmentData: {}, loading: false }
  },
  mounted() {
    this.fetchByTreatmentId(this.treatmentId)
  },
  methods: {
    fetchByTreatmentId(id) {
      if (!isEmpty(id)) {
        this.loading = true
        SchedulingServices.getByTreatment(id)
          .then((response) => {
            this.treatmentData = response.data
          })
          .finally(() => (this.loading = false))
      }
    },
  },
}
</script>
