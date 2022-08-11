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
            v-if="tabs.collectSamples != null"
            :enabled="tabs.collectSamples"
            :treatment="treatment"
          />
        </a-tab-pane>

        <a-tab-pane
          key="shipment"
          :disabled="!tabs.shippingDetails"
          tab=" Sample Shipping Detail"
        >
          <div v-if="tabs.shippingDetails">
            <article class="article">
              <h4 class="heading pl-0">{{translation.SamplShipp_3_517}}</h4>
            </article>
            <Viewer :treatment="treatment" />
            <shipment :treatment="treatment" />
          </div>
          <alert v-else message="Logistic provider has not approved the request yet" type="info"></alert>
        </a-tab-pane>
        <a-tab-pane
          key="5"
          :disabled="!tabs.treatmentDelivery"
          tab="Treatment Delivery"
        >
          <treatmentDelivery :treatment="treatment"
        /></a-tab-pane>
        <a-tab-pane
          key="treatment"
          :disabled="!tabs.treatmentCollection"
          tab=" Treatment Collection"
        >
          <treatmentCollections :treatment="treatment" @callback="callback" />
        </a-tab-pane>
        <a-tab-pane
          key="after-care"
          :disabled="!tabs.afterCare"
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
      console.log(key)
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
