<template>
  <div>
    <a-timeline>
      <a-timeline-item
        v-for="step in steps"
        :key="step.id"
        :color="step.isCompleted ? 'green' : 'grey'"
      >
        <a-icon v-if="step.isCompleted" slot="dot" type="check-circle-o" />
        <a-icon v-else slot="dot" type="clock-circle-o" />
        <div class="step-bar">
          <!-- {{ step }} -->
          <a-row>
            <a-col :span="12">
              <span class="left">
                <span class="step-title"> {{ step.name }}</span>
                <span class="date-time">{{
                  isEmpty(step.dateTime) ? 'Pending' : step.dateTime
                }}</span>
              </span>
            </a-col>
            <a-col :span="12">
              <div v-if="step.isCompleted" class="right d-block">
                <strong class="step-title d-block"> by:{{ step.by }}</strong>
                <span class="organization">{{ step.organizationName }}</span>
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :default-file-list="uploadedFiles(step.uploads)"
                >
                </a-upload>
              </div>
            </a-col>
          </a-row></div
      ></a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
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
