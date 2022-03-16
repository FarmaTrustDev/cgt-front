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

    <a-dropdown>
      <a-button
        class="btn-view-timeline"
        type="primary"
        size="small"
        @click="emitGotoView(record, treatment)"
        >Admin</a-button
      >
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="emitGotoView(record, treatment)"
            ><a-icon type="search" /> View</a
          >
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;"><a-icon type="minus-circle" /> Pause</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;"><a-icon type="minus-circle" /> Cancel</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;"><a-icon type="delete" /> Delete</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
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
