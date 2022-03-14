<template>
  <a-row :gutter="18" class="mt-15">
    <a-card :bordered="false" class="default-card">
      <a-tabs
        :active-key="activeTab"
        type="card"
        tab-position="left"
        @change="callback"
      >
        <a-tab-pane key="1" tab="Scheduling">
          <scheduling :treatment="treatment" />
        </a-tab-pane>
        <a-tab-pane key="2" tab=" Collect Samples">
          <collections  :treatment="treatment" />
        </a-tab-pane>
        <a-tab-pane key="3" tab=" Treatment Collection">
          <treatmentCollections  :treatment="treatment" />
        </a-tab-pane>
        <a-tab-pane key="4" tab=" Shipping Details">
          Shipping Details</a-tab-pane
        >
        <a-tab-pane key="5" tab="Deliver Shipment">
          Deliver Shipment</a-tab-pane
        >
        <a-tab-pane key="6" tab="Aftercare"> Aftercare</a-tab-pane>
      </a-tabs></a-card
    >
  </a-row>
</template>
<script>
import scheduling from '~/components/treatment/enrollment/scheduling'
import collections from '~/components/treatment/collections'
import treatmentCollections from '~/components/treatment/treatment'

const DEFAULT_ACTIVE_KEY = '2'
export default {
  components: { scheduling, collections, treatmentCollections },
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
