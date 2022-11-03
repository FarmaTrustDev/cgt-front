<template>
  <a-row :gutter="18" class="mt-15">
    <a-col>
      <a-card
        style="margin-top: -30px !important"
        :bordered="false"
        class="p-0 mt-0 pt-0 default-card pills-tabs green-on-update"
      >
        <a-tabs class="pt-0" type="card">
          <a-tab-pane v-for="step in tabs" :key="step.id" class="border1">
             <!-- todo getting event name from backend  -->

            <div
              slot="tab"
              class="tab-title pl-10"
              :class="isCompleted(treatment.phaseId >= step.completedStep)"
            >
              {{ step.name }}
            </div>
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
import tabsHelpers from '~/mixins/tabs-helpers'
const steps = [
  { id: 1, name: 'Hospital', alias: 'Hospital', completedStep: 4 },
  { id: 2, name: 'Logistics', alias: 'OutBoundLogistic', completedStep: 8 },
  { id: 3, name: 'Manufacturer', alias: 'Manufacturer', completedStep: 9 },
  { id: 4, name: 'Logistics', alias: 'InBoundLogistic', completedStep: 13 },
  { id: 5, name: 'Treatment', alias: 'Treatment', completedStep: 14 },
]
export default {
  components: { 
    Timeline
     },
  mixins: [tabsHelpers],
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
