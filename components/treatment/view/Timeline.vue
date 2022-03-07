<template>
  <div>
    <pre></pre>
    <a-timeline>
      <a-timeline-item v-for="step in steps" :key="step.id"
        ><div>
          {{ step.name }} <br />Create a services site 2015-09-01
        </div></a-timeline-item
      >
    </a-timeline>
  </div>
</template>

<script>
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'

export default {
  props: {
    treatment: { required: true, type: Object },
    bag: { required: true, type: Object },
    stepTypeId: { required: true, type: Number },
  },
  data() {
    return { steps: null }
  },
  mounted() {
    this.fetchSteps()
  },
  methods: {
    fetchSteps() {
      TreatmentServices.getCustody(
        this.treatment.id,
        this.bag.id,
        this.stepTypeId
      ).then((response) => {
        if (!isEmpty(response.data)) {
          this.steps = response.data.steps
        }
      })
    },
  },
}
</script>
