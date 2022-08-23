<template>
  <page-layout
    :create="false"
    :loading="false"
    :bordered="false"
    :title="translation.TasksList_2_558"
    class="specific container smartlab_task"
  >
    <div slot="content">
      <div class="mt-15 clearfix">
        <!-- <a-select class="float-right page-search-input" placeholder="Search">
            <a-select-option v-for="treatmentType in treatmentTypes" :key="treatmentType.id">{{ treatmentType.name }}</a-select-option>
        </a-select> -->
      </div>

      <span slot="action" slot-scope="text, record">
        <div v-if="showButton(record)" :loading="loading">
          <a-button type="primary">
            {{ translation.Accep_1_278 }}
          </a-button>
          <a-button type="danger" :loading="loading">
            {{ translation.Rejec_1_280 }}
          </a-button>
        </div>
      </span>
      <div class="h-tabs large-tabs">
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
            <template slot="print" slot-scope="record, print">
        <a-button v-if="print.processSample==='default'"
          @click="openViewModal(record)"
          ><img :src="getImageUrl('Icons/Union.svg')" ></a-button>
        <a-button v-else
          @click="openPopViewModal(true)"
          >  
        <img :src="getImageUrl('Icons/Union.svg')" ></a-button
        >
      </template>
              <span slot="action" slot-scope="text, record">
                <!-- //Steps -->
                <div class="treatment-steps">
                  <span class="step-col" functional>
                  <a-steps :initial="1" :current="1" size="small">
                    <a-step
                      v-for="phase in phases"
                      :key="phase.id"
                      :title="phase.name"
                      :status="(phase.id===2 && record.processSample=='red') ? 'wait' : (phase.id===2 && record.processSample=='green') ? 'finish' : 'wait'"
                      :class="(phase.id===2 && record.processSample=='red') ? 'ant-steps-item-error': (phase.id===2 && record.processSample!='red') ? 'ant-steps-item-active-blue' : ''"
                      @click="(phase.id===2 && record.processSample=='red') ? stepClick('error', '/inventory/storage/quarantine/status') : stepClick(record, phase)"
                    />
                  </a-steps>
                  </span>
                </div>

                <!-- //Steps -->
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="translation.OutboSampl_2_500">
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
                  <span class="step-col" functional>
                  <a-steps :initial="1" :current="1" size="small">
                    <a-step
                      v-for="phase in outboundSteps"
                      :key="phase.id"
                      :title="phase.name"
                      :class="(phase.id===2) ? 'ant-steps-item-active-blue' : ''"
                      @click="stepClick(record, phase)"
                    />
                  </a-steps>
                  </span>
                </div>
              </span>

              <!-- ==== steps === -->
            </a-table>
          </a-tab-pane>
          <a-tab-pane v-if="false" key="allSample" :tab="translation.AllSampl_2_501">
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
        <a-modal :visible="showModal" class="modal-design-smart-lab" :dialog-style="{ right: '20%', top:'5%' }"  @cancel="openPopViewModal(false)" @ok="handleOk(false)">
          <a-card class="grey-card-smart-lab">
            <status-detail :heading-title="'Advanced Receipt Notice'" :status="'Completed'" />
            <hr class="mt-15">
            <Header :url="'Uploads/patient/10/qr/637880405174699096.png'" :show-button="false" />
            <CustomDisplay :headingTitle="'Information'" :colVal="8" :singleLineKey="'Cryoportal Number:'" :singleLineValue="'684792563-9570-68746596'" :customDisplayData="customDisplayData" />
            <h2>Incoming Materials</h2>

            <a-card class="white-card-smart-lab">
                <a-col v-for="custDD in customDisplayDataMat" :key="custDD.key">
                    <a-row style="line-height:30px">
                        <a-col :span="4" class="text-muted" >{{custDD.title}}</a-col>
                        
                        <a-col v-if="custDD.url===''" :span="20">{{custDD.value}}</a-col>
                        <a-col v-else :span="20" class="text-muted" ><img :src="getImageUrl(custDD.url)" width="20" height="20" class="img-responsive" style="border-radius:5px" /></a-col>
                    </a-row>
                </a-col>
            </a-card>
          </a-card>  
          <template slot="footer">
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
            <a-button type="primary" @click="handleOk(false)">Ok</a-button>
          </template>            
        </a-modal>
        <a-modal :visible="showModalImage" :title="translation.Docum_1_507" @cancel="handleModal(false)">
          <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          <template slot="footer">
            <a-button @click="handleModal(false)">{{translation.cance_1_296}}</a-button>
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
          </template>
        </a-modal>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import Header from '~/components/inventory/treatment/treatmentheader'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
// import treatmentTable from '~/components/inventory/treatment/treatmentTable'
import {
  SMART_LAB_TREATMENT_PENDING_PHASES,
  INVENTORY_OUTBOUND_STATUS_STEPS,
} from '~/services/Constant/Phases'
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
import { isNumber } from '~/services/Helpers'

export const customDisplayData = [
  {
    title: 'Return Materials:',
    value: 'Yes',
    key:0,
    url:'',
  },
  {
    title: 'Initiated by:',
    value: 'Andrea Marosan',
    key:1,
    url:'',
  },
  {
    title: 'Date:',
    value: '27/06/2022',
    key:2,
    url:'',
  },
  {
    title: 'Origin:',
    value: 'Lonza',
    key:3,
    url:'',
  },  
  {
    title: 'Completed by:',
    value: 'Najib Rehman',
    key:4,
    url:'',
  },
  {
    title: 'Date:',
    value: '27/06/2022',
    key:5,
    url:'',
  },
  {
    title: 'Courier:',
    value: 'fedEx',
    key:6,
    url:'',
  },
  {
    title: 'Client ID:',
    value: 'DAC-654',
    key:7,
    url:'',
  },
  {
    title: 'Client:',
    value: 'Novartis',
    key:8,
    url:'',
  },  
  {
    title: 'Tracking ID:',
    value: '1984916419',
    key:9,
    url:'',
  },  
  {
    title: 'Project ID:',
    value: '123456a',
    key:10,
    url:'',
  }, 
  {
    title: 'Project:',
    value: 'Texas Test Project',
    key:11,
    url:'',
  },
  {
    title: 'Protocol ID:',
    value: 'T1',
    key:12,
    url:'',
  },
  {
    title: 'ARN #:',
    value: 'ARN-0633-003',
    key:13,
    url:'',
  },
  {
    title: 'Location:',
    value: 'Cryoport - London',
    key:14,
    url:'',
  },
  {
    title: 'Protocol:',
    value: 'Kiet Test',
    key:15,
    url:'',
  },
  {
    title: 'Description:',
    value: 'Novartis Receipt',
    key:16,
    url:'',
  },
  {
    title: 'Number of Containers:',
    value: '1',
    key:17,
    url:'',
  },                 
]


export const customDisplayDataMat = [
  {
    title: 'Client Products:',
    value: 'Yes',
    key:0,
    url:'web/icons/greenTick.png',
  },
  {
    title: 'Supplies:',
    value: 'Yes',
    key:1,
    url:'web/icons/greenTick.png',
  },        
]


export const newSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    treatmentType: 'Human Cells ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '10/06/2022 - 14/07/2022',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'green',
  },
  {
    patientEnrollmentNumber: 'DAC7986',
    treatmentType: 'Human Cells ',
    hospital: 'Novartis',
    collectionDateDeliveryDate: '15/06/2022 - 20/07/2023',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'green',
  },
  {
    patientEnrollmentNumber: 'DAC9874',
    treatmentType: 'Human Cells',
    hospital: 'Autolus',
    collectionDateDeliveryDate: '21/06/2022 - 26/08/2024',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'red',
  },
  {
    patientEnrollmentNumber: 'DAC7996',
    treatmentType: 'Human Cells',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '25/06/2022 - 29/08/2025',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'default',
  },
  {
    patientEnrollmentNumber: 'DAC9874',
    treatmentType: 'Human Cells',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '28/06/2022 - 03/08/2026',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample:'default',
  },
]
export const completedSampleData = [
  {
    patientEnrollmentNumber: 'DAC65198',
    treatmentType: 'Human Cells',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '25/04/2022 - 28/08/2022',
    dispatchedBy: 'Ben Hawkins',
  },
  {
    patientEnrollmentNumber: 'DAC2237',
    treatmentType: 'Human Cells',
    productionLine: 'Zone C',
    hospital: 'Novartis',
    collectionDateDeliveryDate: '08/04/2022 - 11/08/2022',
    dispatchedBy: 'Shawn David',
  },
  {
    patientEnrollmentNumber: 'DAC85597',
    treatmentType: 'Human Cells',
    productionLine: 'Zone A',
    hospital: 'Autolus',
    collectionDateDeliveryDate: '09/02/2022 - 12/08/2022',
    dispatchedBy: 'Chris Murphy',
  },
  {
    patientEnrollmentNumber: 'DAC39647',
    treatmentType: 'Human Cells ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '08/02/2022 - 11/07/2022',
    dispatchedBy: 'Allen Braun',
  },
]
export const allSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    treatmentType: 'Human Cells ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '05/06/2022 - 08/07/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC21362',
    treatmentType: 'Human Cells ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '30/05/2022 - 02/07/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC59736',
    treatmentType: 'Human Cells ',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '29/05/2022 - 01/07/2022',
    dispatchedBy: 'Jake Paul',
  },
  {
    patientEnrollmentNumber: 'DAC48959',
    treatmentType: 'Human Cells ',
    productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '29/05/2022 - 01/08/2022',
    dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC31900',
    treatmentType: 'Human Cells',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '26/05/2022 - 29/08/2022',
    dispatchedBy: 'cgt_hospital',
  },
  {
    patientEnrollmentNumber: 'DAC53835',
    treatmentType: 'Human Cells',
    productionLine: 'Zone A',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '26/05/2022 - 29/09/2022',
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
    Header,
    StatusDetail,
    // treatmentTable,
    CustomDisplay,
  },

  mixins: [routeHelpers, imagesHelper],

  data() {
    return {
      loading: false,
      treatmentTypes: [],
      filters: {},
      qrUrl: '/Uploads/DocumentURL/shipping notice.png',
      showModalImage: false,
      showModal:false,
      phases: SMART_LAB_TREATMENT_PENDING_PHASES,
      outboundSteps: INVENTORY_OUTBOUND_STATUS_STEPS,
      customDisplayData,
      customDisplayDataMat,
      completedColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
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
          treatmentName: 'Human Cells',
          productionLine: 'Zone A',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '10/06/2022 - 14/08/2022',
        },
        {
          patientEnrollmentNumber: 'DAC9874',
          treatmentName: 'Human Cells',
          productionLine: 'Zone C',
          hospital: 'Novartis',
          collectionDateDeliveryDate: '15/06/2022 - 20/07/2023',
        },
        {
          patientEnrollmentNumber: 'DAC9875',
          treatmentName: 'Human Cells',
          productionLine: 'Zone C',
          hospital: 'Autolus',
          collectionDateDeliveryDate: '21/06/2022 - 26/07/2024',
        },
        {
          patientEnrollmentNumber: 'DAC9876',
          treatmentName: 'Human Cells',
          productionLine: 'Zone A',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '25/06/2022 - 29/07/2025',
        },
        {
          patientEnrollmentNumber: 'DAC9876',
          treatmentName: 'Human Cells ',
          productionLine: 'Zone C',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '28/06/2022 - 03/07/2026',
        },
      ],

      newSampleColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
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
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
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
      statusDetails :[
      {
        clientID: 'DAC-654',
        projectID: '123456a',
        protocolD: 'T1',
        arn: 'ARN-0633-003',
        createdBy: 'David Handerson',
        client: 'Novartis',
        project: 'Texas Test Project',
        protocol: 'Kiet Test',
        description: 'Novartis Receipt',
        createdOn: '27/06/2022',
        location: 'Cryoport - London',
      }],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.allSampleColumns[0].title=newValues.SamplID_2_502
        this.allSampleColumns[1].title=newValues.SamplName_2_503
        this.allSampleColumns[2].title=newValues.StoraArea_2_504
        this.allSampleColumns[3].title=newValues.Clien_1_505
        this.allSampleColumns[4].title=newValues.ArrivDate_5_535
        this.allSampleColumns[5].title=newValues.Dispaby_2_396
 
        this.pendingColumns[0].title=newValues.SamplID_2_502
        this.pendingColumns[1].title=newValues.SamplName_2_503
        this.pendingColumns[2].title=newValues.StoraArea_2_504
        this.pendingColumns[3].title=newValues.Clien_1_505
        this.pendingColumns[4].title=newValues.ArrivDate_5_535
        this.pendingColumns[5].title=newValues.Actio_1_220

        this.newSampleColumns[0].title=newValues.SamplID_2_502
        this.newSampleColumns[1].title=newValues.SamplName_2_503
        this.newSampleColumns[2].title=newValues.Clien_1_505
        this.newSampleColumns[3].title=newValues.ArrivDate_5_535
        this.newSampleColumns[4].title=newValues.Docum_1_507
        this.newSampleColumns[5].title=newValues.Actio_1_220

        this.phases[0].name=newValues.inboushipm_2_302
        this.phases[1].name=newValues.ProceSampl_2_499
        this.phases[2].name=newValues.StoreSampl_2_579

        this.outboundSteps[0].name=newValues.StoreSampl_2_579
        this.outboundSteps[1].name=newValues.OutboProce_2_514
        this.outboundSteps[2].name=newValues.Couri_1_234
      }
    }
  },  
  mounted() {
    this.getTranslationData()
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
      this.showModalImage = show
    },
    handleOk(){
      this.showModal=false
    },
    openViewModal(id) {
      this.showModalImage = true
      this.qrUrl = id
      // LabelServices.scheduling(id);
    },
    openPopViewModal(val){
      this.showModal=val
    },
    getTranslationData(){
        this.phases[0].name=this.translation.inboushipm_2_302
        this.phases[1].name=this.translation.ProceSampl_2_499
        this.phases[2].name=this.translation.StoreSampl_2_579

        this.outboundSteps[0].name=this.translation.StoreSampl_2_579
        this.outboundSteps[1].name=this.translation.OutboProce_2_514
        this.outboundSteps[2].name=this.translation.Couri_1_234
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
