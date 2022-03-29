<template>
  <div>
    <pre></pre>
    <a-timeline>
      <a-timeline-item
        v-for="step in steps"
        :key="step.id"
        :color="step.isCompleted ? 'green' : 'grey'"
      >
        <a-icon
          v-if="step.isCompleted"
          slot="dot"
          type="check-circle-o"
          style="font-size: 16px"
        />
        <a-icon
          v-else
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px"
        />
        <div class="step-bar">
          <h2></h2>
          <!-- {{ step }} -->
          <a-row>
            <a-col :span="12">
            
              <span class="left">
                <strong class="step-title"> {{ step.name }}</strong>
                <span class="date-time">{{
                  isEmpty(step.dateTime) ? 'Pending' : step.dateTime
                }}</span>
              </span>
            </a-col>
            <a-col :span="12">
              <div class="right d-block">
                <strong class="step-title d-block">
                  by: Schneider Fische</strong
                >
                <span class="date-time">Berlin Hospital</span>
              </div>
            </a-col>
          </a-row>
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
    isEmpty,
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
