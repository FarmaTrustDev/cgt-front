<template>
  <page-layout :create="false" :loading="loading" title="Shipment Status">
    <template slot="content">
      <div class="grey-card enrollment-page">
        <a-card class="default-border-radius ant-card">
          <a-tabs :tab-position="mode">
            <a-tab-pane :key="1" tab=" Pickup Shipment">
              Pickup Shipment
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

export default {
  components: { 'page-layout': PageLayout },
  data() {
    return {
      loading: false,
      mode: 'left',
    }
  },
  methods: {},
}
</script>
