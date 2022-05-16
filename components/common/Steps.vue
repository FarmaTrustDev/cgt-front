<template>
  <span class="step-col" functional>
    <a-steps
      :current="getCurrentStep(treatment)"
      :initial="1"
      status="process"
      size="small"
    >
      <!-- <div >
        {{ treatment.treatmentTypeName }}
      </div> -->
      <a-step
        v-for="phase in phases"
        :key="phase.phaseId"
        :title="phase.name"
        @click="(a) => emitGotoView(patient, treatment, phase)"
      >
      </a-step>
    </a-steps>
  </span>
</template>
<script>
export default {
  props: {
    treatment: { type: Object, default: () => ({}) },
    phases: { type: Array, default: () => [] },
    patient: { type: Object, default: () => {} },
    currentStep: { type: Function, default: () => [] },
    gotoView: { type: Function, default: () => [] },
  },
  data() {
    return { current: 0 }
  },
  methods: {
    getCurrentStep(treatment) {
      this.current = this.currentStep(treatment)
      return this.current
    },
    emitGotoView(patient, treatment, phase) {
      if (this.current >= phase.id) {
        return this.gotoView(patient, treatment, phase)
      } else {
        return false
      }

      // this.gotoView(patient, treatment, phase)
    },
  },
}
</script>
