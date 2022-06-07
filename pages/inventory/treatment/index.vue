<template>
<div>
    <div class="page-header clearfix">
        <h3 class="page-title pl-5 float-left">Today's Task</h3>
        <!-- <a-select class="float-right page-search-input" placeholder="Search">
            <a-select-option v-for="treatmentType in treatmentTypes" :key="treatmentType.id">{{ treatmentType.name }}</a-select-option>
        </a-select> -->
    </div>
   
        <span slot="action" slot-scope="text, record">
            <div v-if="showButton(record)">
                <a-button type="primary" >
                    {{translation.Accep_1_278}}
                </a-button>
                <a-button type="danger" >
                    {{translation.Rejec_1_280}}
                </a-button>
            </div>
        </span>    
    <div class="h-tabs large-tabs" style="margin-left:3%">
        <a-tabs type="card" :animated="false">
            <a-tab-pane key="1" tab="Inbound">
                <a-table class="rounded-table" :columns="newSampleColumns" :data-source="newSampleData" :should-fetch="false" >
                      <template slot="print" slot-scope="record">
        <a-button
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(record)"
          >View Document</a-button
        >
      </template>
    
                </a-table>
     <a-modal
      :visible="showModal"
      title="Document"
      @cancel="handleModal(false)"
      @ok="handleModal(false)"
    >
      <img class="img-responsive" :src="getImageUrl(qrUrl)" />
    </a-modal>                 
            </a-tab-pane>

            <a-tab-pane key="2" tab="Process Sample">
                <a-table class="rounded-table" :columns="pendingColumns" :data-source="pendingSampleData" :should-fetch="false">
                <span slot="action" slot-scope="record">
        <!-- //Steps -->
        <div class="treatment-steps">
          <a-steps
            :initial="1"
            :current="1"
            size="small"
          >
            <a-step
              v-for="phase in phases"
              :key="phase.id"
              :title="phase.name"
              @click="stepClick(record)"
            />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
                </a-table>  
            </a-tab-pane>
            <a-tab-pane key="3" tab="Outbound Sample">
                <a-table class="rounded-table" :columns="completedColumns" :data-source="completedSampleData" />
            </a-tab-pane>
            <a-tab-pane key="4" tab="All Samples">
                <a-table class="rounded-table" :columns="allSampleColumns" :data-source="allSampleData" :should-fetch="false" />
            </a-tab-pane>
        </a-tabs>
    </div>
</div>

</template>

<script>
import { SMART_LAB_TREATMENT_PENDING_PHASES } from '~/services/Constant/Phases'
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
    components: {
        // 'new-request': newRequests,
        // 'in-progress': inProgress,
        // all: All,
        // completed: Completed,
        // StandardTable,
    },
    mixins: [routeHelpers, imagesHelper], 
    data() {
        return {
            loading: false,
            treatmentTypes: [],
            qrUrl: 'http://localhost:22462/Uploads/DocumentURL/shipping notice.jpg',
            showModal: false,
            phases: SMART_LAB_TREATMENT_PENDING_PHASES,
            completedColumns:[
                {
                  title: `Sample ID`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                },
                {
                  title: `Sample Name`,
                  dataIndex: 'treatmentType',
                  key: 'treatmentType',
                },
                {
                  title: `Storage Area`,
                  dataIndex: 'productionLine',
                  key: 'productionLine',
                },
                {
                  title: `Client`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
                {
                  title: `Dispatched By`,
                  dataIndex: 'dispatchedBy',
                  key: 'dispatchedBy'
                }
              ],
              newSampleData:[{patientEnrollmentNumber: 'DAC7993', treatmentType: 'Platelet Lycate ', hospital: 'Baystate Clinic', print:'Uploads/DocumentURL/label1.jpg', collectionDateDeliveryDate: '10/06/2022 - 14/06/2022' },
              {patientEnrollmentNumber: 'DAC7986', treatmentType: 'Platelet Lycate ', hospital: 'Royal Hospital', print:'Uploads/DocumentURL/shipping notice.jpg',  collectionDateDeliveryDate: '15/06/2022 - 20/06/2023' }, 
              {patientEnrollmentNumber: 'DAC9874', treatmentType: 'Platelet Lycate ', hospital: 'Kings College', print:'Uploads/DocumentURL/label1.jpg', collectionDateDeliveryDate: '21/06/2022 - 26/06/2024' },
              {patientEnrollmentNumber: 'DAC7996', treatmentType: 'Platelet Lycate ', hospital: 'Baystate Clinic', print:'Uploads/DocumentURL/shipping notice.jpg', collectionDateDeliveryDate: '25/06/2022 - 29/06/2025' },
              {patientEnrollmentNumber: 'DAC9874', treatmentType: 'Platelet Lycate ', hospital: 'Baystate Clinic', print:'Uploads/DocumentURL/label1.jpg', collectionDateDeliveryDate: '28/06/2022 - 03/07/2026' },
              ],
              completedSampleData:[
              {patientEnrollmentNumber: 'DAC65198',treatmentType: 'Platelet Lycate ',productionLine:'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '25/04/2022 - 28/04/2022', dispatchedBy: 'Ben Hawkins'  }, 
              {patientEnrollmentNumber: 'DAC2237',treatmentType: 'Platelet Lycate ',productionLine:'Zone C', hospital: 'Royal Hospital', collectionDateDeliveryDate: '08/04/2022 - 11/04/2022', dispatchedBy: 'Shawn David'  }, 
              {patientEnrollmentNumber: 'DAC85597',treatmentType: 'Platelet Lycate ',productionLine:'Zone A', hospital: 'Kings College', collectionDateDeliveryDate: '09/02/2022 - 12/02/2022', dispatchedBy: 'Chris Murphy'  },
              {patientEnrollmentNumber: 'DAC39647',treatmentType: 'Platelet Lycate ',productionLine:'Zone C', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '08/02/2022 - 11/02/2022', dispatchedBy: 'Allen Braun'  }, 
              ],
              pendingSampleData:[
              {patientEnrollmentNumber: 'DAC7986',treatmentName: 'Platelet Lycate ', productionLine: 'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '10/06/2022 - 14/06/2022'},
              {patientEnrollmentNumber: 'DAC9874',treatmentName: 'Platelet Lycate ', productionLine: 'Zone C', hospital: 'Royal Hospital', collectionDateDeliveryDate: '15/06/2022 - 20/06/2023'}, 
              {patientEnrollmentNumber: 'DAC9875',treatmentName: 'Platelet Lycate ', productionLine: 'Zone C', hospital: 'Kings College', collectionDateDeliveryDate: '21/06/2022 - 26/06/2024'},
              {patientEnrollmentNumber: 'DAC9876',treatmentName: 'Platelet Lycate ', productionLine: 'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '25/06/2022 - 29/06/2025'},
              {patientEnrollmentNumber: 'DAC9876',treatmentName: 'Platelet Lycate ', productionLine: 'Zone C', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '28/06/2022 - 03/07/2026'}
              ],
              allSampleData:[
              {patientEnrollmentNumber: 'DAC7993', treatmentType: 'Platelet Lycate ', productionLine: 'Zone C',  hospital: 'Baystate Clinic', collectionDateDeliveryDate: '05/06/2022 - 08/06/2022', dispatchedBy: 'In Progress'}, 
              {patientEnrollmentNumber: 'DAC21362', treatmentType: 'Platelet Lycate ', productionLine: 'Zone C', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '30/05/2022 - 02/06/2022', dispatchedBy: 'In Progress'}, 
              {patientEnrollmentNumber: 'DAC59736', treatmentType: 'Platelet Lycate ', productionLine: 'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '29/05/2022 - 01/06/2022', dispatchedBy: 'Jake Paul'},
              {patientEnrollmentNumber: 'DAC48959', treatmentType: 'Platelet Lycate ', productionLine: 'Zone C',  hospital: 'Baystate Clinic', collectionDateDeliveryDate: '29/05/2022 - 01/06/2022', dispatchedBy: 'In Progress'}, 
              {patientEnrollmentNumber: 'DAC31900', treatmentType: 'Platelet Lycate', productionLine: 'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '26/05/2022 - 29/05/2022', dispatchedBy: 'cgt_hospital'}, 
              {patientEnrollmentNumber: 'DAC53835', treatmentType: 'Platelet Lycate', productionLine: 'Zone A', hospital: 'Baystate Clinic', collectionDateDeliveryDate: '26/05/2022 - 29/05/2022', dispatchedBy: 'In Progress'}
              ],
              newSampleColumns:[{
                  title: `Serial Number`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                },
                {
                  title: `Sample Name`,
                  dataIndex: 'treatmentType',
                  key: 'treatmentType',
                },
                {
                  title: `Client`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Documents`,
                  dataIndex: 'print',
                  key: 'print',
                  scopedSlots: { customRender: 'print' },
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
                {
                  title: `Notes`,
                  dataIndex: 'action',
                  scopedSlots: {
                    customRender: 'action'
                    },
                },
                ],
                 pendingColumns:[{
                  title: `Sample ID`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                },
                {
                  title: `Sample Name`,
                  dataIndex: 'treatmentName',
                  key: 'treatmentName',
                },
                {
                  title: `Storage Area`,
                  dataIndex: 'productionLine',
                  key: 'productionLine',
                },
                {
                  title: `Client`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
                 {
                  title: 'Notes',
                  key:'action',
                  scopedSlots: { customRender: 'action' },
                 },
              ],
              allSampleColumns:[{
                  title: `Sample ID`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                  scopedSlots: { customRender: 'name' },
                },
                {
                  title: `Sample Name`,
                  dataIndex: 'treatmentType',
                  key: 'treatmentType',
                },
                {
                  title: `Storage Area`,
                  dataIndex: 'productionLine',
                  key: 'productionLine',
                },
                {
                title: `Client`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
                {
                  title: `Dispatched By`,
                  dataIndex: 'dispatchedBy',
                  key: 'dispatchedBy'
                }
              ],
        }
    },
    computed: {
        translation() {
            return this.$store.getters.getTranslation
        },
    },
    methods: {
    searchTreatment() {},
    stepClick(record) {
        this.goto(`/inventory/treatment/process`)
    },
    clickImage(record) {
      console.log(record)
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      console.log(id)
      this.showModal = true
      this.qrUrl=id
      // LabelServices.scheduling(id);
    },
  },
}
</script>
