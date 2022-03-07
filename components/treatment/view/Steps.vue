<template>
  <a-row :gutter="18" class="mt-15">
    <a-col>
      <a-card :bordered="false" class="default-card">
        <a-tabs type="card">
          <a-tab-pane v-for="step in tabs" :key="step.id" :tab="step.name"
            ><Timeline
              :bag="bag"
              :treatment="treatment"
              :step-type-id="step.id"
              step="Timeline"
            />
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import Timeline from '~/components/treatment/view/Timeline'
const steps = [
  { id: 1, name: 'Hospital', alias: 'Hospital' },
  { id: 2, name: 'Logistics', alias: 'OutBoundLogistic' },
  { id: 3, name: 'Manufacturer', alias: 'Manufacturer' },
  { id: 4, name: 'Logistics', alias: 'InBoundLogistic' },
  { id: 5, name: 'Treatment', alias: 'Treatment' },
]
export default {
  components: { Timeline },
  props: {
    treatment: { required: true, type: Object },
    bag: { required: true, type: Object },
  },
  data() {
    return { tabs: steps }
  },
  mounted() {},
  methods: {
    fetchSteps() {},
  },
}
</script>
