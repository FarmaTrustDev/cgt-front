<template>
  <page-layout
    :loading="false"
    class="specific"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card" style="width: 90%; margin-left: 5%">
      <div class="patient-details-page" style="width:95%; margin-left:2%">
          <a-row :gutter="18">
            <a-col :span="6">
              <a-card :bordered="false" class="qr-section default-card">
                <figure class="m-0">
                  <img
                    class="img-fluid"
                    :src="`https://demoapi.qmaid.co/Uploads/patient/10/qr/637880405174699096.png`"
                    alt="Christina Braun"
                  />

                  <figcaption>
                    {{ translation.SamplID_2_502 }}: DAC48694
                  </figcaption>
                </figure>
              </a-card>
            </a-col>
            <a-col :span="18">
              <a-card :bordered="false" class="default-card details-section">
                <article class="article">
                  <h2 class="heading pl-0">
                    {{ translation.SamplDetai_2_510 }}
                  </h2>
                </article>
                <div>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Clien_1_505 }}:
                        </span>
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6>
                        <span> Baystate Clinic</span>
                      </h6>
                    </a-col>
                    <a-col :span="4" class="mt-15">
                      <h6>
                        <span class="text-muted"
                          >{{ translation.SamplName_2_503 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="8" class="mt-15">
                      <h6><span>Human Cells</span></h6>
                    </a-col>
                  </a-row>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Email_1_511 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6>
                        <span> baystateclinic@gmail.com</span>
                      </h6>
                    </a-col>
                  </a-row>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Phone_1_63 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6><span> +44 12345 1234</span></h6>
                    </a-col>
                  </a-row>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-card
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width:95%; margin-left:2%;"
        >
          <span>
            <!-- //Steps -->
            <div class="treatment-steps" style="width:100%; margin-left:-3%;">
              <span class="step-col-large" functional>
              <a-steps :initial="1" :current="1" size="small">
                
                <a-step
                  v-for="phase in phases"
                  :key="phase.id"
                  :title="phase.name"
                  :class="(phase.id===1) ? 'ant-steps-item-active-large': (phase.id===2) ? 'ant-steps-item-error-large' : 'ant-steps-horizontal-large'"
                />
                
              </a-steps>
              </span>
            </div>
            <!-- //Steps -->
          </span> 
        </a-card>
        <a-card
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width:95%; margin-left:2%"
        >
        <div class="h-tabs large-tabs" style="width:100%;">
          
          <div>        
          <strong style="font-size:1.25rem;">Quality Assurance Checklist</strong>
          </div>
          <Process
            :collections="dummyCollection"
            :bag-id="'BUID-123'"
            :type-id="type"
            @fetchBags="() => {}"
            @updateId="updateId"
          />
        </div>
        </a-card>
      </div>
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
      type: 'quarantine',
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
