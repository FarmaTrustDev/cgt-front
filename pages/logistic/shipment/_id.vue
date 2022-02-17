<template>
  <page-layout :create="false" :loading="loading" title="Shipment Status">
    <template slot="content">
      <div class="grey-card enrollment-page">
        <a-card class="default-border-radius ant-card">
          <a-tabs :tab-position="mode">
            <a-tab-pane :key="1" tab=" Pickup Shipment">
              <pickup />
            </a-tab-pane>
            <a-tab-pane :key="2" tab="Deliver Shipment"> t </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import pickup from '~/components/root/logistic/shipment/Pickup'
export default {
  components: { 'page-layout': PageLayout, pickup },
  data() {
    return {
      loading: false,
      mode: 'left',
    }
  },
  methods: {},
}
</script>
