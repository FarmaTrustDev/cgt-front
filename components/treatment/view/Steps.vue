<template>
  <a-row :gutter="18" class="mt-15">
    <a-col>
      <a-card
        style="margin-top: -30px !important"
        :bordered="false"
        class="p-0 mt-0 pt-0 default-card pills-tabs no-shadow"
      >
        <a-tabs class="pt-0" type="card">
          <a-tab-pane v-for="step in tabs" :key="step.id" class="border1">
            <!-- todo getting event name from backend -->
            <div slot="tab">{{ step.name }}</div>
            <Timeline
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
