<template>
  <a-row :gutter="18" class="mt-15">
    <a-card :bordered="false" class="default-card default-tabs">
      <a-tabs
        :active-key="activeTab"
        type="card"
        tab-position="left"
        @change="callback"
      >
        <a-tab-pane key="scheduling" tab="Scheduling">
          <scheduling :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane key="collection" tab=" Collect Samples">
          <collections :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane key="shipment" tab=" Sample Shipping Detail">
          <article class="article">
            <h4 class="heading pl-0">Sample Shipping Detail</h4>
          </article>
          <Viewer :treatment="treatment" />
          <shipment :treatment="treatment"
        /></a-tab-pane>
        <a-tab-pane key="5" tab="Treatment Delivery">
          <treatmentDelivery :treatment="treatment"
        /></a-tab-pane>
        <a-tab-pane key="treatment" tab=" Treatment Collection">
          <treatmentCollections :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane key="after-care" tab="Aftercare">
          <afterCare :treatment="treatment" />
        </a-tab-pane> </a-tabs
    ></a-card>
  </a-row>
</template>
<script>
import scheduling from '~/components/treatment/enrollment/scheduling'
import collections from '~/components/treatment/collections'
import shipment from '~/components/treatment/shipment'
import treatmentDelivery from '~/components/treatment/treatment'
import afterCare from '~/components/treatment/enrollment/afterCare'
import Viewer from '~/components/bags/Viewer'
import treatmentCollections from '~/components/treatment/collections/treatment'
import tabsHelpers from '~/mixins/tabs-helpers'
const DEFAULT_ACTIVE_KEY = '2'
export default {
  components: {
    scheduling,
    collections,
    treatmentCollections,
    afterCare,
    shipment,
    treatmentDelivery,
    Viewer,
  },
  mixins: [tabsHelpers],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: DEFAULT_ACTIVE_KEY,
    }
  },
  mounted() {
    this.handleActiveTab()
  },
  methods: {
    callback(key) {
      this.activeTab = key
    },
    fetchTreatment() {
      this.$emit('fetchTreatment')
    },
  },
}
</script>
