<template>
  <div>
    <a-skeleton :loading="loading">
      <a-col :span="12">
        <a-card :bordered="false" class="default-card">
          <article class="article">
            <h4 class="heading pl-0">External Entities</h4>
          </article>
          <dl class="ant-row common-detail">
            <dt>Treatment Type:</dt>
            <dd>{{ treatment.treatmentTypeName }}</dd>
            <dt>Doctor:</dt>
            <dd>Dr. Comfort</dd>
            <dt>Clinician:</dt>
            <dd>Dr. Ryan Katz</dd>
            <dt>Hospital:</dt>
            <dd>{{ treatmentData.hospitalName }}</dd>
          </dl>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false" class="default-card">
          <article class="article">
            <h4 class="heading pl-0">Treatment Details</h4>
          </article>
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
        </a-card>
      </a-col>
    </a-skeleton>
  </div>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Helpers'
export default {
  props: {
    treatment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { treatmentData: {}, loading: false }
  },
  mounted() {
    this.fetchByTreatmentId(this.treatment.id)
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
