<template>
  <page-layout
    :loading="false"
    :title="translation.SamplStatu_2_509"
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
                          >{{ translation.AssetType_2_512 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="8" class="mt-15">
                      <h6><span>Cell Sample</span></h6>
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
          style="width:95%; margin-left:2%"
        >
          <span>
            <!-- //Steps -->
            <div class="treatment-steps" style="width:95%">
              <a-steps size="default">
                <a-step
                  v-for="phase in phases"
                  :key="phase.id"
                  :title="phase.name"
                  :class="(phase.id==1) ? 'ant-steps-item-active-large' : (phase.id==2) ? 'ant-steps-item-active-blue-large' : 'ant-steps-horizontal-large'"
                  @click="reDirect(phase.url_slug,phase.alias)"
                />
              </a-steps>
            </div>
            <!-- //Steps -->
          </span> 
        </a-card>

        <a-card
          v-if="activeTab=='INBOUND_ACCEPTANCE_DETAILS'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width:95%; margin-left:2%"
        >

        <div class="h-tabs large-tabs" style="width:90%; margin-left:5%">
              <a-row>
                <a-col :span="11">
                  <a-card :bordered="false" class="default-card">
                    <article class="article">
                      <h4 class="heading pl-0">
                        {{ translation.ShippDetai_2_314 }}
                      </h4>
                    </article>
                    <div>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation.DispaDate_2_316 }}:</span
                          >
                        </a-col>
                        <a-col :span="14" class="mt-15">
                          <span class="text-muted"> 20/06/2022</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation.DispaBy_2_516 }}:</span
                          >
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> 20/06/2022</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation.CarriStatu_2_320 }}</span
                          >
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> In-Process</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">{{
                            translation.EstimArriv_3_322
                          }}</span>
                        </a-col>
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted"> 21/06/2022</span>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="12">
                  <a-card :bordered="false" class="default-card">
                    <article class="article">
                      <h4 class="heading pl-0">
                        {{ translation.SamplRecei_2_515 }}
                      </h4>
                    </article>
                    <div>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">{{
                            translation.IsRecei_2_328
                          }}</span>
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> Done</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation['Receiby:_2_330'] }}</span
                          >
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted">Sadaan Shahid</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation['ReceiDate:_2_332'] }}</span
                          >
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> 21/06/2022</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">{{
                            translation['ReceiNote:_2_334']
                          }}</span>
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> Received</span>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
        </div>
        </a-card>
        <a-card
          v-if="activeTab=='PROCESS_SAMPLE'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width:95%; margin-left:2%"
        >

        <div class="h-tabs large-tabs" style="width:90%; margin-left:5%">              
              <div>
              <strong style="font-size:20px">{{ translation.QualiAssur_3_565 }}</strong>
              <Process
                :collections="dummyCollection"
                :bag-id="'BUID-123'"
                :type-id="type"
                @fetchBags="() => {}"
                @updateId="updateId"
              />
              </div>
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
import { QUARANTINE_STORAGE } from '~/services/Constant'
// import shipment from '~/components/inventory/treatment/shipment'
import tabsHelpers from '~/mixins/tabs-helpers'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'
export default {
  components: {
    'page-layout': PageLayout,
    Process,
    // shipment,
  },
  mixins: [tabsHelpers,routeHelpers],
  middleware: 'auth',
  data() {
    return {
      activeTab: 'inbound',
      type: 'inbound',
      phases:QUARANTINE_RESOLUTION_PHASES,
      dummyCollection: [
        {
          id: 1,
          isCollected: false,
          name: `Has the package been received with at Inbound depot?`,
        },
        {
          id: 2,
          isCollected: false,
          name: `Does the package match Advance Shipment Notice?`,
        },
        {
          id: 3,
          isCollected: false,
          name: `Confirm there is no visual package damage?`,
        },
        { id: 4, isCollected: false, name: `Confirm packaging has been removed without any issues?` },
        {
          id: 5,
          isCollected: false,
          name: `Confirm the item is safe to be placed in the relevant Freezer temperature?`,
        },
        {
          id: 6,
          isCollected: false,
          name: `Confirm no repacking is required?`,
        },
        {
          id: 7,
          isCollected: false,
          name: `Confirm there are no status issues?`,
        },
        {
          id: 8,
          isCollected: false,
          name: `Confirm that the package does not need to be placed in Quarantine`,
          alias: QUARANTINE_STORAGE,
        },
      ],
      dummyOutBoundCollection: [
        // {
        //   id: 1,
        //   isCollected: false,
        //   name: `${this.$store.getters.getTranslation.TheOutbo_5_526}`,
        // },
        {
          id: 2,
          isCollected: false,
          name: `Has sample been removed from freezer ?`,
        },
        {
          id: 3,
          isCollected: false,
          name: `Does sample packaging pass visual check ?`,
        },
        {
          id: 4,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.IsSampl_6_529}`,
        },
        {
          id: 5,
          isCollected: false,
          name: `Has sample been packaged for courier ?`,
        },
        {
          id: 6,
          isCollected: false,
          name: `Is documentation completed and ready for courier pick up ?`,
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
    handleActiveTab(){
      this.activeTab=this.$route.query.view
    },
    updateId(collectionId) {
      const dumCollection = this.dummyCollection.map((collection) => {
        if (collection.id === collectionId) {
          collection.isCollected = true
        }
        return collection
      })

      this.dummyCollection = dumCollection
    },
    setActiveTav(tab){
      this.activeTab=tab
    },
    reDirect(url,alias){
      if(!isEmpty(url)){
        this.activeTab=alias
        this.goto(url)
      }
    },
  },
}
</script>
