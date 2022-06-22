<template>
  <page-layout
    :loading="false"
    class="specific"
    :create="false"
  >
    <template slot="content">
<span>
                <!-- //Steps -->
                <div class="treatment-steps" style="width:70%; margin-left:10%">
                  <a-steps :initial="1" :current="1" size="default">
                    <a-step
                      v-for="phase in phases"
                      :key="phase.id"
                      :title="phase.name"
                      
                      :class="(phase.id===1) ? 'ant-steps-item-active-large': (phase.id===2) ? 'ant-steps-item-error-large' : 'ant-steps-horizontal-large'"
                    />
                  </a-steps>
                </div>

                <!-- //Steps -->
              </span>         
              <h3 style="font-weight:bold; margin-top:2%">Quality Assurance Checklist</h3>
              <Process
                :collections="dummyCollection"
                :bag-id="'BUID-123'"
                :type-id="type"
                @fetchBags="() => {}"
                @updateId="updateId"
              />
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import Process from '~/components/root/inventory/Process'
import {
  QUARANTINE_RESOLUTION_PHASES
} from '~/services/Constant/Phases'
// import shipment from '~/components/inventory/treatment/shipment'
import tabsHelpers from '~/mixins/tabs-helpers'
export default {
  components: {
    'page-layout': PageLayout,
    Process,
    // shipment,
  },
  mixins: [tabsHelpers],
  middleware: 'auth',
  data() {
    return {
      activeTab: 'inbound',
      type: 'inbound',
      phases: QUARANTINE_RESOLUTION_PHASES,
      dummyCollection: [
        {
          id: 1,
          isCollected: false,
          name: `Has the sample been cleared to enter general storage?`,
        },
        {
          id: 2,
          isCollected: false,
          name: `Have all issues been cleared with the provider?`,
        },
        {
          id: 3,
          isCollected: false,
          name: `Has a record been made and communicated of \n any error in shipping or the inbound process?`,
        },
        {
          id: 5,
          isCollected: false,
          name: `Is there any new packing or repackaging required?`,
        },
        {
          id: 6,
          isCollected: false,
          name: `Will the package be incinerated?`,
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.handleActiveTab()
  },
  methods: {
    updateId(collectionId) {
      const dumCollection = this.dummyCollection.map((collection) => {
        if (collection.id === collectionId) {
          collection.isCollected = true
        }
        return collection
      })

      this.dummyCollection = dumCollection
    },
  },
}
</script>
