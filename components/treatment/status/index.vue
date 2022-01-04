<template>
  <a-row :gutter="18" class="mt-15">
    <a-card :bordered="false" class="default-card">
      <a-tabs type="card" tab-position="left">
        <a-tab-pane key="1" tab="Scheduling"> Scheduling </a-tab-pane>
        <a-tab-pane key="2" tab=" Collect Samples">
          Collect Samples
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
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
