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
        <a-card :bordered="false" class="mt-25 default-card h-tabs pills-tabs">
          <a-tabs tab-position="left" :active-key="activeTab">
            <a-tab-pane key="outbound" :tab="translation.OutboShipm_2_376">
              <Process
                :collections="dummyOutBoundCollection"
                :bag-id="'BUID-123'"
                :typeId="type"
                @fetchBags="() => {}"
                @updateId="updateId"
                :active-tab="activeTab"
                @handleActiveTab="handleActiveTab"
            />
          
            </a-tab-pane>
            <a-tab-pane key="couriers" tab="Courier">
                <div>
    <a-skeleton :loading="loading">
      <a-table
        :should-fetch="false"
        :pagination="true"
        :columns="columns"
        :data-source="bagData"
        @clickImage="clickImage"
      >
      <template slot="image" slot-scope="src, record">
        <img
          width="50"
          class="img-responsive"
          :src="src"
          @click="clickImage(record)"
        />
      </template>
      <template slot="print" slot-scope="print, record">
        <a-button
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="clickImage(record)"
          >Print</a-button
        >
      </template>              
      </a-table>
    </a-skeleton>
    <a-modal
      :visible="showModal"
      title="Print"
    >
      <img class="img-responsive" :src="qrUrl" />
      <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>     
      </template>      
    </a-modal>
  </div>
    <a-form

     
    >
<LogisticLookup />
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label="translation.SamplColle_3_518" class="pb-0">
            <a-input
              v-decorator="[
                `treatmentId`,
                {
                  initialValue: '',
                },
              ]"
              type="hidden"
            />

            <a-input
              v-decorator="[
                `hospitalId`,
                {
                  initialValue: '',
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                `patientId`,
                {
                  initialValue: '',
                },
              ]"
              type="hidden"
            />
            <a-date-picker
              v-decorator="[
                'collectionDate',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Delivery Arrival Date!',
                    },
                  ],
                },
              ]"
              :format="dateFormat"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              
            >
            </a-date-picker> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item :label="translation.ExpecDeliv_3_388" class="pb-0">
            <a-date-picker
              v-decorator="[
                'deliveryDate',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Delivery Arrival Date!',
                    },
                  ],
                },
              ]"
             
              :disabled-date="disabledDate"
              :format="dateFormat"
              style="width: 100%"
              size="large"
            >
            </a-date-picker> </a-form-item
        ></a-col>
      </a-row>
      <a-form-item>
        <FormActionButton :loading="loading" custom-text="Submit" />
      </a-form-item>
    </a-form>  
            </a-tab-pane>
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
import LogisticLookup from '~/components/lookups/LogisticLookup'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import {
  getMomentByStandardFormat,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
// import shipment from '~/components/inventory/treatment/shipment'

export default {
  components: {
    'page-layout': PageLayout,
    Process,
    LogisticLookup,
    // shipment,
  },
  middleware: 'auth',
  data() {
    return {
      activeTab:'outbound',
      type:'outbound',
      qrUrl: null,
      loading: false,
      showModal: false,
      dateFormat: STANDARD_UK_DATE_FORMAT,
      bagData:[
  {
      puid: 'DAC7993',
      qrUrl: 'https://demoapi.qmaid.co/Uploads/patient/12/qr/637882805424838187.png',
  },
],
      columns : [
  {
    title: 'Sample',
    dataIndex: 'qrUrl',
    key: 'qrUrl',
    scopedSlots: { customRender: 'image' },
  },
{
    title: 'Sample ID',
    dataIndex: 'puid',
    key: 'puid',
  },
{
    title: 'Print QR',
    dataIndex: 'print',
    key: 'print',
    scopedSlots: { customRender: 'print' },
  },
],

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
  mounted() {
    // this.handleActiveTab()
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    handleActiveTab() {
      this.setActiveTab()
    },
    setActiveTab(){
      console.log('parent')
      this.activeTab='couriers'
    },
    collectionDateChange(value, date) {
      this.form.setFieldsValue({
        deliveryDate: getMomentByStandardFormat(date).add(2, 'day'),
      })
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
    clickImage(record) {
      console.log(record)
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
    printWindow(){
      window.print()
    },       
  },
}
</script>
