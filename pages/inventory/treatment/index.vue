<template>
  <page-layout
    :create="false"
    :loading="false"
    :bordered="false"
    :title="translation.TasksList_2_558"
    class="specific-storage"
  >
    <div slot="content">
      <div class="mt-15 clearfix">
        <!-- <a-select class="float-right page-search-input" placeholder="Search">
            <a-select-option v-for="treatmentType in treatmentTypes" :key="treatmentType.id">{{ treatmentType.name }}</a-select-option>
        </a-select> -->
      </div>

      <span slot="action" slot-scope="text, record">
        <div v-if="showButton(record)">
          <a-button type="primary">
            {{ translation.Accep_1_278 }}
          </a-button>
          <a-button type="danger">
            {{ translation.Rejec_1_280 }}
          </a-button>
        </div>
      </span>
      <div class="h-tabs large-tabs" style="margin-left: 3%">
        <a-tabs type="card" :animated="false">
          <!-- <a-tab-pane key="1" :tab="translation.Inbou_1_498">
          <a-table
            class="rounded-table"
            :columns="newSampleColumns"
            :data-source="newSampleData"
            :should-fetch="false"
          >
            <template slot="print" slot-scope="record">
              <a-button
                class="print-btn"
                type="primary"
                size="small"
                icon="printer"
                @click="openViewModal(record)"
                >{{ translation.ViewDocum_2_508 }}</a-button
              >
            </template>
          </a-table>
          <a-modal
            :visible="showModal"
            :title="translation.Docum_1_507"
            @cancel="handleModal(false)"
            @ok="handleModal(false)"
          >
            <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          </a-modal>
        </a-tab-pane> -->

          <a-tab-pane key="1" :tab="translation.InbouSampl_2_306">
            <a-input
              :placeholder="translation.searc_1_488"
              class="float-right inventory-search mb-15"
              @change="
                (e) => inboundSearch(e.target.value, 'patientEnrollmentNumber')
              "
            >
              <a-icon slot="prefix" type="search" class="mb-5" />
            </a-input>
            <a-table
              class="rounded-table"
              :columns="newSampleColumns"
              :data-source="inbound"
              :should-fetch="false"
            >
            <template slot="print" slot-scope="print">
        <a-button
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(print)"
          >View</a-button
        >
      </template>
              <span slot="action" slot-scope="text, record">
                <!-- //Steps -->
                <div class="treatment-steps">
                  <a-steps :initial="1" :current="1" size="default">
                    <a-step
                      v-for="phase in phases"
                      :key="phase.id"
                      :title="phase.name"
                      :status="(phase.id===2 && record.processSample=='red') ? 'wait' : (phase.id===2 && record.processSample=='green') ? 'finish' : 'wait'"
                      :class="(phase.id===2 && record.processSample=='red') ? 'ant-steps-item-error': (phase.id===2 && record.processSample!='red') ? 'ant-steps-item-active-blue' : ''"
                      @click="(phase.id===2 && record.processSample=='red') ? stepClick('error', '/inventory/storage/quarantine/status') : stepClick(record, phase)"
                    />
                  </a-steps>
                </div>

                <!-- //Steps -->
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Outbound Samples">
            <a-input
              ref="userNameInput"
              :placeholder="translation.searc_1_488"
              class="float-right inventory-search mb-15"
              @change="
                (e) => outboundSearch(e.target.value, 'patientEnrollmentNumber')
              "
            >
              <a-icon slot="prefix" type="search" class="mb-5" />
            </a-input>
            <a-table
              class="rounded-table"
              :columns="completedColumns"
              :data-source="outbound"
            >
              <!-- ==== steps === -->
              <span slot="status-steps" slot-scope="text, record">
                <div class="treatment-steps">
                  <a-steps :initial="1" :current="1" size="default">
                    <a-step
                      v-for="phase in outboundSteps"
                      :key="phase.id"
                      :title="phase.name"
                      :class="(phase.id===2) ? 'ant-steps-item-active-blue' : ''"
                      @click="stepClick(record, phase)"
                    />
                  </a-steps>
                </div>
              </span>

              <!-- ==== steps === -->
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="allSample" :tab="translation.AllSampl_2_501">
            <a-input
              ref="userNameInput"
              :placeholder="translation.searc_1_488"
              class="float-right inventory-search mb-15"
              @change="
                (e) =>
                  allSampleSearch(e.target.value, 'patientEnrollmentNumber')
              "
            >
              <a-icon slot="prefix" type="search" class="mb-5" />
            </a-input>
            <a-table
              class="rounded-table"
              :columns="allSampleColumns"
              :should-fetch="false"
              :data-source="allSample"
              :customRow="customRow"
            >
            </a-table>
          </a-tab-pane>
        </a-tabs>
        <a-modal :visible="showModal" :title="translation.Docum_1_507">
          <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          <template slot="footer">
            <a-button @click="handleModal(false)">Cancel</a-button>
            <a-button @click="printWindow()">Print</a-button>
          </template>
        </a-modal>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import {
  SMART_LAB_TREATMENT_PENDING_PHASES,
  INVENTORY_OUTBOUND_STATUS_STEPS,
} from '~/services/Constant/Phases'
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
import { isNumber } from '~/services/Helpers'

export const newSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    treatmentType: 'Platelet Lycate ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '10/06/2022 - 14/06/2022',
    print: 'Uploads/DocumentURL/label1.jpg',
    processSample:'green',
  },
  {
    patientEnrollmentNumber: 'DAC7986',
    treatmentType: 'Platelet Lycate ',
    hospital: 'Royal Hospital',
    collectionDateDeliveryDate: '15/06/2022 - 20/06/2023',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'green',
  },
  {
    patientEnrollmentNumber: 'DAC9874',
    treatmentType: 'Platelet Lycate ',
    hospital: 'Kings College',
    collectionDateDeliveryDate: '21/06/2022 - 26/06/2024',
    print: 'Uploads/DocumentURL/label1.jpg',
    processSample:'red',
  },
  {
    patientEnrollmentNumber: 'DAC7996',
    treatmentType: 'Platelet Lycate ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '25/06/2022 - 29/06/2025',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'default',
  },
  {
    patientEnrollmentNumber: 'DAC9874',
    treatmentType: 'Platelet Lycate ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '28/06/2022 - 03/07/2026',
    print: 'Uploads/DocumentURL/label1.jpg',
    processSample:'default',
  },
]
export const completedSampleData = [
  {
    patientEnrollmentNumber: 'DAC65198',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '25/04/2022 - 28/04/2022',
    dispatchedBy: 'Ben Hawkins',
  },
  {
    patientEnrollmentNumber: 'DAC2237',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone C',
    hospital: 'Royal Hospital',
    collectionDateDeliveryDate: '08/04/2022 - 11/04/2022',
    dispatchedBy: 'Shawn David',
  },
  {
    patientEnrollmentNumber: 'DAC85597',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone A',
    hospital: 'Kings College',
    collectionDateDeliveryDate: '09/02/2022 - 12/02/2022',
    dispatchedBy: 'Chris Murphy',
  },
  {
    patientEnrollmentNumber: 'DAC39647',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '08/02/2022 - 11/02/2022',
    dispatchedBy: 'Allen Braun',
  },
]
export const allSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '05/06/2022 - 08/06/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC21362',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '30/05/2022 - 02/06/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC59736',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '29/05/2022 - 01/06/2022',
    dispatchedBy: 'Jake Paul',
  },
  {
    patientEnrollmentNumber: 'DAC48959',
    treatmentType: 'Platelet Lycate ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '29/05/2022 - 01/06/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC31900',
    treatmentType: 'Platelet Lycate',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '26/05/2022 - 29/05/2022',
    dispatchedBy: 'cgt_hospital',
  },
  {
    patientEnrollmentNumber: 'DAC53835',
    treatmentType: 'Platelet Lycate',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '26/05/2022 - 29/05/2022',
    dispatchedBy: 'In Progress',
  },
]
export default {
  components: {
    // 'new-request': newRequests,
    // 'in-progress': inProgress,
    // all: All,
    // completed: Completed,
    // StandardTable,
    PageLayout,
  },

  mixins: [routeHelpers, imagesHelper],

  data() {
    return {
      loading: false,
      treatmentTypes: [],
      filters: {},
      qrUrl: 'http://localhost:22462/Uploads/DocumentURL/shipping notice.jpg',
      showModal: false,
      phases: SMART_LAB_TREATMENT_PENDING_PHASES,
      outboundSteps: INVENTORY_OUTBOUND_STATUS_STEPS,
      completedColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `Human Cells`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Dispaby_2_396}`,
          dataIndex: 'dispatchedBy',
          key: 'dispatchedBy',
          scopedSlots: { customRender: 'status-steps' },
        },
      ],

      pendingSampleData: [
        {
          patientEnrollmentNumber: 'DAC7986',
          treatmentName: 'Platelet Lycate ',
          productionLine: 'Zone A',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '10/06/2022 - 14/06/2022',
        },
        {
          patientEnrollmentNumber: 'DAC9874',
          treatmentName: 'Platelet Lycate ',
          productionLine: 'Zone C',
          hospital: 'Royal Hospital',
          collectionDateDeliveryDate: '15/06/2022 - 20/06/2023',
        },
        {
          patientEnrollmentNumber: 'DAC9875',
          treatmentName: 'Platelet Lycate ',
          productionLine: 'Zone C',
          hospital: 'Kings College',
          collectionDateDeliveryDate: '21/06/2022 - 26/06/2024',
        },
        {
          patientEnrollmentNumber: 'DAC9876',
          treatmentName: 'Platelet Lycate ',
          productionLine: 'Zone A',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '25/06/2022 - 29/06/2025',
        },
        {
          patientEnrollmentNumber: 'DAC9876',
          treatmentName: 'Platelet Lycate ',
          productionLine: 'Zone C',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '28/06/2022 - 03/07/2026',
        },
      ],

      newSampleColumns: [
        {
          title: `${this.$store.getters.getTranslation.SeriaNumbe_2_506}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `Human Cells`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Docum_1_507}`,
          dataIndex: 'print',
          key: 'print',
          scopedSlots: { customRender: 'print' },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      pendingColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'treatmentName',
          key: 'treatmentName',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      allSampleColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: `Human Cells`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Dispaby_2_396}`,
          dataIndex: 'dispatchedBy',
          key: 'dispatchedBy',
        },
      ],
      inbound: newSampleData,
      outbound: completedSampleData,
      allSample: allSampleData,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    searchTreatment() {},
    stepClick(record, phase) {
      if(record==='error'){
        this.goto(phase)
      }else{
        this.goto(phase.url_slug)
      }
    },
    clickImage(record) {
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      this.showModal = true
      this.qrUrl = id
      // LabelServices.scheduling(id);
    },

    inboundSearch(value, key) {
      // console.log(key)
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = newSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage)
              return storage[filter].match(value)
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter].match(value) == filterValue
          })
        }
        storages = JSON.stringify(storages)
        this.inbound = JSON.parse(storages)
      } else {
        this.inbound = newSampleData
      }
    },
    outboundSearch(value, key) {
      // console.log(key)
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = completedSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage)
              return storage[filter].match(value)
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter].match(value) == filterValue
          })
        }

        storages = JSON.stringify(storages)
        this.outbound = JSON.parse(storages)
      } else {
        this.outbound = completedSampleData
      }
    },
    allSampleSearch(value, key) {
      // console.log(key)
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = allSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage)
              return storage[filter].match(value)
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter].match(value) == filterValue
          })
        }

        storages = JSON.stringify(storages)
        this.allSample = JSON.parse(storages)
      } else {
        this.allSample = allSampleData
      }
    },
    redirect() {
      this.goto('/inventory/storage/location')
    },
     printWindow(){
      window.print()
    },
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.goto('/inventory/storage/location')
          },
        },
      }
    },
  },
}
</script>
