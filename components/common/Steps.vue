<template>
  <span class="step-col" functional>
    <a-steps
      :initial="1"
      :current="getCurrentStep(treatment)"
      status="process"
      size="small"
    >
      <a-step
        v-for="phase in phases"
        :key="phase.phaseId"
        :title="phase.name"
        @click="(a) => gotoView(patient, treatment, phase)"
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

  methods: {
    getCurrentStep(treatment) {
      return this.currentStep(treatment)
    },

    emitGotoView(patient, treatment, phase) {
      this.gotoView(patient, treatment, phase)
    },
  },
}
</script>
