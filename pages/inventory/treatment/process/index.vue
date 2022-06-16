<template>
  <page-layout
    :loading="false"
    :title="translation.SamplStatu_2_509"
    class="specific"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card" style="width: 90%; margin-left: 5%">
        <div class="patient-details-page">
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
        <a-card :bordered="false" class="mt-15 default-card h-tabs pills-tabs">
          <a-tabs type="card">
            <a-tab-pane key="1" :tab="translation.InbouAccep_3_834">
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
                          <span class="text-muted"> 09/01/2022</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">
                            {{ translation.DispaBy_2_516 }}:</span
                          >
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> 09/01/2022</span>
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
                          <span class="text-muted"> 12/01/2022</span>
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
                          <span class="text-muted"> 12/01/2022</span>
                        </a-col>
                      </a-row>
                      <a-row :gutter="20" dir="ltr">
                        <a-col :span="10" class="mt-15">
                          <span class="text-muted">{{
                            translation['ReceiNote:_2_334']
                          }}</span>
                        </a-col>
                        <a-col :span="12" class="mt-15">
                          <span class="text-muted"> 12/01/2022</span>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Inbound Storage Process">
              <h3>Quality Assurance Checklist</h3>
              <Process
                :collections="dummyCollection"
                :bag-id="'BUID-123'"
                @fetchBags="() => {}"
                @updateId="updateId"
              />
            </a-tab-pane>
            <a-tab-pane key="3" :tab="translation.OutboShipm_2_376">
              <Process
                :collections="dummyOutBoundCollection"
                :bag-id="'BUID-123'"
                @fetchBags="() => {}"
                @updateId="updateId"
            /></a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import Process from '~/components/root/inventory/Process'
import { QUARANTINE_STORAGE } from '~/services/Constant'
// import shipment from '~/components/inventory/treatment/shipment'

export default {
  components: {
    'page-layout': PageLayout,
    Process,
    // shipment,
  },
  middleware: 'auth',
  data() {
    return {
      dummyCollection: [
        {
          id: 1,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Packarecei_2_518}`,
        },
        {
          id: 2,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doespacka_6_519}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isthere_6_520}`,
        },
        { id: 4, isCollected: false, name: `Are there any status issues ?` },
        {
          id: 5,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doesthe_9_522}`,
          alias: QUARANTINE_STORAGE,
        },
        {
          id: 6,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isitem_7_523}`,
        },
        {
          id: 7,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isthere_8_524}`,
        },
        {
          id: 8,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Specifreez_9_525}`,
        },
      ],
      dummyOutBoundCollection: [
        {
          id: 1,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.TheOutbo_5_526}`,
        },
        {
          id: 2,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.RemovFrom_3_527}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.IsPacka_3_528}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.IsSampl_6_529}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Samplhas_4_530}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Readyfor_5_531}`,
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
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
