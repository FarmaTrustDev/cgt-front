<template>
  <a-row :gutter="18" class="mt-15">
    <a-col>
      <a-card
        style="margin-top: -30px !important"
        :bordered="false"
        class="p-0 mt-0 pt-0 default-card pills-tabs green-on-update"
      >
        <a-tabs class="pt-0" type="card">
          <a-tab-pane
            v-for="(step, index) in tabs"
            :key="step.id"
            :class="getLastTabsClass(index)"
          >
            <!-- todo getting event name from backend  -->

            <div
              slot="tab"
              class="tab-title pl-10"
              :class="`${getLastTabsClass(index)}-tab`"
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
import { isEmpty } from '~/services/Utilities'
const steps = [
  { id: 1, name: 'Hospital', alias: 'Hospital', completedStep: 4 },
  { id: 2, name: 'Logistics', alias: 'OutBoundLogistic', completedStep: 8 },
  { id: 3, name: 'Manufacturer', alias: 'Manufacturer', completedStep: 9 },
  { id: 4, name: 'Logistics', alias: 'InBoundLogistic', completedStep: 13 },
  { id: 5, name: 'Treatment', alias: 'Treatment', completedStep: 14 },
]
export default {
  components: {
    Timeline,
  },
  mixins: [tabsHelpers],
  props: {
    treatment: { required: true, type: Object },
    bag: { required: true, type: Object },
    tabNumber: { type: Number, default: 0 },
    bags: { required: true, type: Array },
  },
  data() {
    return { tabs: steps }
  },
  mounted() {},
  methods: {
    getLenthofBags() {
      return !isEmpty(this.bags) ? this.bags.length - 1 : 0
    },
    isLastTab(index) {
      return index === this.getLenthofBags()
    },
    fetchSteps() {},
    getLastTabsClass(index) {
      return this.treatment.excursionId != null && this.isLastTab(index)
        ? 'showExcursion'
        : 'ashowExcursion'
    },
  },
}
</script>
