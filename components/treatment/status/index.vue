<template>
  <a-row :gutter="18" class="mt-15">
    <a-card :bordered="false" class="default-card default-tabs">
      <a-tabs
        :active-key="activeTab"
        type="card"
        tab-position="left"
        @change="callback"
      >
        <a-tab-pane
          key="scheduling"
          :disabled="!tabs.scheduling"
          tab="Scheduling"
        >
          <scheduling :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane
          key="collection"
          :disabled="!tabs.collectSamples"
          tab=" Collect Samples"
        >
          <collections
            v-if="tabs.collectSamples"
            :enabled="tabs.collectSamples"
            :treatment="treatment"
          />
        </a-tab-pane>

        <a-tab-pane
          key="shipment"
          :disabled="!tabs.shippingDetails"
          tab=" Sample Shipping Detail"
        >
          <article class="article">
            <h4 class="heading pl-0">Sample Shipping Detail</h4>
          </article>
          <Viewer :treatment="treatment" />
          <shipment :treatment="treatment"
        /></a-tab-pane>
        <a-tab-pane
          key="5"
          :disabled="!tabs.treatmentDelivery"
          tab="Treatment Delivery"
        >
          <treatmentDelivery :treatment="treatment"
        /></a-tab-pane>
        <a-tab-pane
          key="treatment"
          :disabled="!tabs.TreatmentCollection"
          tab=" Treatment Collection"
        >
          <treatmentCollections :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane
          key="after-care"
          :disabled="!tabs.AfterCare"
          tab="Aftercare"
        >
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
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'
const DEFAULT_ACTIVE_KEY = 'scheduling'
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
      manufacturerAccepted: false,
      tabs: {},
    }
  },
  mounted() {
    this.handleActiveTab()
    this.fetchScheduling()
  },
  methods: {
    callback(key) {
      this.activeTab = key
    },
    fetchTreatment() {
      this.$emit('fetchTreatment')
    },
    fetchScheduling() {
      if (!isEmpty(this.treatment)) {
        TreatmentServices.getInboundScheduling(this.treatment.id)
          .then((response) => {
            this.tabs = response.data
          })
          .finally((this.loading = false))
      }
    },
  },
}
</script>
