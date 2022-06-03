<template>
  <a-timeline>
    <a-timeline-item v-for="step in steps" :key="step.id" color="green">
      <a-icon slot="dot" type="check-circle-o" />

      <div class="step-bar">
        <!-- {{ step }} -->
        <a-row>
          <a-col :span="12">
            <span class="left">
              <span class="step-title"> {{ step.title }}</span>
              <span class="date-time">{{ step.date }}</span>
            </span>
          </a-col>
          <a-col :span="12">
            <div class="right d-block">
              <strong class="step-title d-block"> {{ step.by }}</strong>
              <span class="organization">{{ step.detail }}</span>
            </div>
          </a-col>
        </a-row>
      </div></a-timeline-item
    >
  </a-timeline>
</template>

<script>
export default {
  props: { steps: { required: true, type: Object, default: () => {} } },
  data() {
    return {}
  },
}
</script>
