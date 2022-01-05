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
          <collections :treatment="treatment" />
        </a-tab-pane>
        <a-tab-pane key="3" tab=" Shipping Details">
          Shipping Details</a-tab-pane
        >
        <a-tab-pane key="4" tab="Deliver Shipment">
          Deliver Shipment</a-tab-pane
        >
        <a-tab-pane key="5" tab="Aftercare"> Aftercare</a-tab-pane>
      </a-tabs></a-card
    >
  </a-row>
</template>
<script>
import scheduling from '~/components/treatment/enrollment/scheduling'
import collections from '~/components/treatment/collections'
export default {
  components: { scheduling, collections },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeTab: 2,
    }
  },
  methods: {
    callback(key) {
      this.activeTab = key
    },
  },
}
</script>
