<template>
  <span :class="'step-col'" functional>
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
        :class="getClass(phase, treatment)"
        @click="(a) => emitGotoView(patient, treatment, phase)"
      >
      </a-step>
    </a-steps>
  </span>
</template>
<script>
import userDetail from '~/mixins/user-detail'
export default {
  props: {
    treatment: { type: Object, default: () => ({}) },
    phases: { type: Array, default: () => [] },
    patient: { type: Object, default: () => {} },
    currentStep: { type: Function, default: () => [] },
    gotoView: { type: Function, default: () => [] },
  },
  mixins: [userDetail],
  data() {
    return { current: 0 }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    },
  methods: {
    getClass(phase, treatment) {
      let className = phase.name

      if (
        phase.phaseId === 4 &&
        treatment.phaseId === 3 &&
        treatment.manufacturerRequestStatus
      ) {
        className = className + ' ' + 'rejected'
      }

      if (phase.phaseId === 16 && treatment.phaseId >= 15) {
        className = className + ' ' + 'ant-steps-item-finish afterCare'
      }

      return className
    },
    getCurrentStep(treatment) {
      this.current = this.currentStep(treatment)
      return this.current
    },
    emitGotoView(patient, treatment, phase) {
      // if(this.user.roleName!=='PHARMA'){
      if (this.current >= phase.id && this.user.roleName !== 'IMMATICS' && this.user.roleName !== 'CDMO' && this.user.roleName !== 'CMC') {
        return this.gotoView(patient, treatment, phase)
      }else {
        return false
      }
    // }
      // this.gotoView(patient, treatment, phase)
    },
  },
}
</script>
