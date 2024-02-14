<template>
  <a-row :gutter="18" class="mt-15">
    <a-card :bordered="false" class="default-card default-tabs">{{  }}
      <a-tabs
        :active-key="activeTab"
        type="card"
        tab-position="left"
        @change="callback"
      >
        <a-tab-pane key="scheduling" :disabled="!tabs.scheduling">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(treatment.phaseId > 3)"
          >
          <span v-if="treatment.treatmentTypeName==='IVF/ICSI'">
            {{translation.Sched_1_681}}
          </span>
          <span v-else>  
            {{translation.Sched_1_681}}
          </span>
          </div>
          <scheduling :treatment="treatment" />
        </a-tab-pane>

        <a-tab-pane key="collection" :disabled="treatment.phaseId < 4">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(treatment.phaseId >= 6)"
          >
          <span v-if="treatment.treatmentTypeName==='IVF/ICSI'">
            Sample Collection
          </span>
          <span v-else>  
            {{translation.ColleSampl_2_288}}
          </span>
          </div>
          <collections
            v-if="tabs.collectSamples != null"
            :enabled="treatment.phaseId > 4"
            :treatment="treatment"
          />
        </a-tab-pane>

        <a-tab-pane key="shipment" :disabled="!tabs.shippingDetails">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(treatment.phaseId > 8)"
          >
          <span v-if="treatment.treatmentTypeName==='IVF/ICSI'">
            Storage
          </span>
          <span v-else>  
            {{translation.SamplShipp_3_517}}
          </span>
          </div>
          <div v-if="tabs.shippingDetails">
            <article class="article">
              <h4 class="heading pl-0">{{ translation.SamplShipp_3_517 }}</h4>
            </article>
            <Viewer :treatment="treatment" />
            <shipment :treatment="treatment" />
          </div>
          <alert
            v-else
            :message="translation.Logisprovi_8_536"
            type="info"
          ></alert>
        </a-tab-pane>
        <a-tab-pane v-if="treatment.treatmentTypeName!=='IVF/ICSI'"  key="treatment" :disabled="!tabs.treatmentCollection">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(treatment.phaseId > 14)"
          >
            {{translation.TreatColle_2_1006}}
          </div>
          <treatmentCollections :treatment="treatment" @callback="callback" />
        </a-tab-pane>
        <a-tab-pane v-if="treatment.treatmentTypeName!=='IVF/ICSI'" key="5"  :disabled="!tabs.treatmentDelivery">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(treatment.phaseId > 13)"
          >
            {{translation.TreatDeliv_2_1007}}
          </div>
          <treatmentDelivery :treatment="treatment"
        /></a-tab-pane>
        
        <a-tab-pane key="after-care" :disabled="!tabs.shippingDetails">
          <div
            slot="tab"
            class="tab-title"
            :class="isCompleted(tabs.afterCare)"
          >
            {{translation.After_1_758}}
          </div>
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.handleActiveTab()
    this.fetchScheduling()
  },
  methods: {
    getCollectionPhase() {
      // console.log(this.treatment.phaseId)
      // console.log(this.treatment.phaseId < 4)
    },
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
