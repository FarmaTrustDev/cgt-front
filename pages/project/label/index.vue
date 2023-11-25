<template>
    <page-layout
      :create="false"
      :loading="false"
      :bordered="false"
      :title="translation.Label_1_27"
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
            
              <a-table
                class="rounded-table"
                :columns="newSampleColumns"
                :data-source="inbound"
                :should-fetch="false"
              >
                <template slot="print" slot-scope="record, print">
                  <a-button @click="openPopViewModal(true, record, print)">
                    <img :src="getImageUrl('Icons/Union.svg')"/>
                  </a-button>
                </template>
                <template slot="action" slot-scope="action">
                  <a-dropdown>
                    <a-button class="action-button" @click="preventDefault">
                      Admin <a-icon type="down" />
                    </a-button>
                    <a-menu slot="overlay">
                      <a-menu-item key="1">
                        <a-popconfirm
                          title="Are you sure you want to return this label ?"
                          ok-text="Yes"
                          cancel-text="No"
                          placement="topLeft"
                          @confirm="returnLabel(action)"
                          >
                        <span>Return</span>
                        </a-popconfirm>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a-popconfirm
                          title="Are you sure you want to destroy this label ?"
                          ok-text="Yes"
                          cancel-text="No"
                          placement="topLeft"
                          @confirm="destroyLabel(action)"
                          >
                        <span>Destroy</span>
                        </a-popconfirm>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </template>
              </a-table>
          <a-modal
            :visible="showModal"
            class="modal-design-smart-lab-label"
            :dialog-style="{ right: '10%', top: '10%' }"
            @cancel="handelCancel(false)"
            @ok="handleOk(false)"
          >
              <a-card class="white-card-smart-lab-label">
                <a-row>
                    <a-col :span="6"></a-col>
                    <a-col :span="12"><img :src="getImageUrl('label/cryoheader.svg')" width="200" height="125" /></a-col>
                    <a-col :span="6"></a-col>
                </a-row>
                <a-row>
                    <a-col :span="6"><img :src="getImageUrl('label/qrCode.svg')" width="200" height="75" /></a-col>
                    <a-col :span="18">
                    <a-row>
                        <a-col>{{labelData.treatmentType}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="6">LOT: {{labelData.patientEnrollmentNumber}}</a-col>
                        <a-col :span="6">SN: {{labelData.serialNumber}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="6"><img :src="getImageUrl('label/dated.svg')"> {{ moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY") }}</a-col>
                        <a-col :span="4"><img :src="getImageUrl('label/temp.svg')"> {{ labelData.temp }}</a-col>
                        <a-col :span="4"><img :src="getImageUrl('label/umbrella.svg')"> {{ labelData.status }}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Internal Batch No: {{labelData.internalBatch}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Project Code: {{labelData.projectCode}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>{{ (!isEmpty(company)) ? company: labelData.hospital}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>{{ (!isEmpty(address)) ? address: labelData.address}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Cell Number: {{ (!isEmpty(phoneNo)) ? phoneNo : labelData.cell}}</a-col>
                    </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col>&nbsp;</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4"></a-col>
                    <a-col :span="18"><img :src="getImageUrl('label/bar.png')" width="500" height="90" /></a-col>
                </a-row>
              </a-card>
          </a-modal>
          
        </div>
      </div>
    </page-layout>
  </template>
  
  <script>
  import moment from 'moment'
  import PageLayout from '~/components/layout/PageLayout'
  import LabelServices from '~/services/API/LabelServices'
  // import treatmentTable from '~/components/inventory/treatment/treatmentTable'
  import {
    SMART_LAB_TREATMENT_PENDING_PHASES,
    INVENTORY_OUTBOUND_STATUS_STEPS,
  } from '~/services/Constant/Phases'
  import routeHelpers from '~/mixins/route-helpers'
  import imagesHelper from '~/mixins/images-helper'
  import { preventDefault } from '~/services/Helpers'
  import { isEmpty } from '~/services/Utilities'
  import { isNumber } from '~/services/Helpers'
  import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
  
  export const customDisplayData = [
    {
      title: '',
      value: 'Yes',
      key: 0,
      url: 'web/icons/greenTick.png',
    },
    {
      title: '',
      value: 'Andrea Marosan',
      key: 1,
      url: '',
    },
    {
      title: '',
      value: moment(_getFutureMomentStandardFormatted(1,'day')).format("DD/MM/YYYY"),
      key: 2,
      url: '',
    },
    {
      title: '',
      value: 'Lonza',
      key: 3,
      url: '',
    },
    {
      title: '',
      value: 'Najib Rehman',
      key: 4,
      url: '',
    },
    {
      title: '',
      value: moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY"),
      key: 5,
      url: '',
    },
    {
      title: '',
      value: 'fedEx',
      key: 6,
      url: '',
    },
    {
      title: '',
      value: 'DAC-654',
      key: 7,
      url: '',
    },
    {
      title: '',
      value: 'Novartis',
      key: 8,
      url: '',
    },
    {
      title: '',
      value: '1984916419',
      key: 9,
      url: '',
    },
    {
      title: '',
      value: '123456a',
      key: 10,
      url: '',
    },
    {
      title: '',
      value: 'Texas Test Project',
      key: 11,
      url: '',
    },
    {
      title: '',
      value: 'T1',
      key: 12,
      url: '',
    },
    {
      title: 'ARN #:',
      value: 'ARN-0633-003',
      key: 13,
      url: '',
    },
    {
      title: '',
      value: 'Cryoport - London',
      key: 14,
      url: '',
    },
    {
      title: '',
      value: 'Kiet Test',
      key: 15,
      url: '',
    },
    {
      title: '',
      value: 'Novartis Receipt',
      key: 16,
      url: '',
    },
    {
      title: '',
      value: '1',
      key: 17,
      url: '',
    },
  ]
  
  export const customDisplayDataMat = [
    {
      title: 'Client Products:',
      value: 'Yes',
      key: 0,
      url: 'web/icons/greenTick.png',
    },
    {
      title: 'Supplies:',
      value: 'Yes',
      key: 1,
      url: 'web/icons/greenTick.png',
    },
  ]
  
  export const newSampleData = [
    {
      patientEnrollmentNumber: 'DAC7994',
      serialNumber:'AAD2345',
      bar:'label/bar.png',
      qrCode:'label/qrCode.svg',
      dated:'01/02/2024',
      temp:'-20C',
      status:'Keep Dry',
      projectCode:'AA23416',
      internalBatch:'AA23428',
      address:'12 Kennedy Street, Washington, 213421',
      cell:'+1 206 203 5278',
      barCodeNo:'(01) 95012345678903 (3103) 00123',
      treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
      hospital: 'Baystate Clinic',
      collectionDate:moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY"),
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      processSample: 'green',
    },
    {
      patientEnrollmentNumber: 'DAC7986',
      serialNumber:'AAD2534',
      bar:'label/bar.png',
      qrCode:'label/qrCode.svg',
      dated:'01/02/2024',
      temp:'-18C',
      status:'Keep Dry',
      projectCode:'AA23428',
      internalBatch:'AA23416',
      address:'The WestWorks, 195 Wood Ln, London W12 7FQ',
      cell:'+44 289 6655',
      barCodeNo:'(01) 95012345678903 (3103) 00123',
      treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
      hospital: 'Novartis',
      collectionDate:moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY"),
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(8,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      processSample: 'green',
    },
    {
      patientEnrollmentNumber: 'DAC9874',
      serialNumber:'AAD2634',
      bar:'label/bar.png',
      qrCode:'label/qrCode.svg',
      dated:'01/02/2024',
      temp:'-22C',
      status:'Keep Dry',
      projectCode:'AA23448',
      internalBatch:'AA25466',
      address:'CGT Catapult Stevenage SG1 2FX',
      cell:'+44 289 6655',
      barCodeNo:'(01) 95012345678903 (3103) 00123',
      treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
      hospital: 'Autolus',
      collectionDate:moment(_getFutureMomentStandardFormatted(1,'day')).format("DD/MM/YYYY"),
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(1,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(12,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      processSample: 'red',
    },
    {
      patientEnrollmentNumber: 'DAC7996',
      serialNumber:'AAD6345',
      bar:'label/bar.png',
      qrCode:'label/qrCode.svg',
      dated:'01/02/2024',
      temp:'-17C',
      status:'Keep Dry',
      projectCode:'AA25466',
      internalBatch:'AA23448',
      address:'12 Kennedy Street, Washington, 213421',
      cell:'+1 206 203 5278',
      barCodeNo:'(01) 95012345678903 (3103) 00123',
      treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
      hospital: 'Baystate Clinic',
      collectionDate:moment(_getFutureMomentStandardFormatted(2,'day')).format("DD/MM/YYYY"),
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(2,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      processSample: 'default',
    },
    {
      patientEnrollmentNumber: 'DAC9874',
      serialNumber:'AAD2234',
      bar:'label/bar.png',
      qrCode:'label/qrCode.svg',
      dated:'01/02/2024',
      temp:'-19C',
      status:'Keep Dry',
      projectCode:'AA22426',
      internalBatch:'AA23450',
      address:'12 Kennedy Street, Washington, 213421',
      cell:'+1 206 203 5278',
      barCodeNo:'(01) 95012345678903 (3103) 00123',
      treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
      hospital: 'Baystate Clinic',
      collectionDate:moment(_getFutureMomentStandardFormatted(3,'day')).format("DD/MM/YYYY"),
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(3,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(7,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      processSample: 'default',
    },
    {
      patientEnrollmentNumber: 'KIT341',
      serialNumber:'AAC3245',
      treatmentType: 'Laeuka Kit',
      hospital: 'Adaptimmune',
      temp:'-20C',
      status:'Keep Dry',
      internalBatch:'AX25429',
      hospitalName:'The Royal Hospital',
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(2,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      inbound:false,
      projectName:'BayState USA OUT89873',
      projectId:'2440',
      processSample: 'green',
      email:'baystate@gmail.com',
      type:2,
    },
    {
      patientEnrollmentNumber: 'KIT246',
      serialNumber:'AAK2235',
      treatmentType: 'Aphresis Kit',
      temp:'-20C',
      status:'Keep Dry',
      internalBatch:'AX25430',
      hospital: 'Syneous',
      hospitalName:'The Royal Hospital',
      collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(3,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(7,'month')).format("DD/MM/YYYY"),
      print: 'Uploads/DocumentURL/shipping notice.jpg',
      inbound:false,
      projectName:'BayState UK OUT89873',
      projectId:'2456',
      processSample: 'green',
      email:'baystate@gmail.com',
      type:2,
    },
    {
    patientEnrollmentNumber: 'DAC65198',
    serialNumber:'AAX3235',
    treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
    temp:'-20C',
    status:'Keep Dry',
    internalBatch:'AC36421',
    productionLine: 'Zone A',
    hospital: 'Adaptimmune',
    collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY"),
    projectName:'Autolus Project Out89343',
    projectId:'2440',
    dispatchedBy: 'Ben Hawkins',
    email:'adaptimmune@gmail.com',
    type:1,
  },
  {
    patientEnrollmentNumber: 'DAC2237',
    serialNumber:'AAX8654',
    treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
    temp:'-20C',
    status:'Keep Dry',
    internalBatch:'AC66441',
    productionLine: 'Zone C',
    hospital: 'Adaptimmune',
    collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(1,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(7,'month')).format("DD/MM/YYYY"),
    projectName:'Autolus Project Out89343',
    projectId:'2440',
    dispatchedBy: 'Shawn David',
    email:'adaptimmune@gmail.com',
    type:1,
  },
  {
    patientEnrollmentNumber: 'DAC85597',
    serialNumber:'AAX6435',
    treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
    temp:'-20C',
    status:'Keep Dry',
    internalBatch:'AC76423',
    productionLine: 'Zone A',
    hospital: 'Kite',
    collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(2,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(12,'month')).format("DD/MM/YYYY"),
    projectName:'Kite Out Washington Clinical Trial Ref:2343',
    projectId:'594',
    dispatchedBy: 'Chris Murphy',
    email:'kite@gmail.com',
    type:1,
  },
  {
    patientEnrollmentNumber: 'DAC39647',
    serialNumber:'AAX3637',
    treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
    temp:'-20C',
    status:'Keep Dry',
    internalBatch:'AC37428',
    productionLine: 'Zone C',
    hospital: 'Kite',
    collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted(3,'day')).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(7,'month')).format("DD/MM/YYYY"),
    projectName:'Kite Out Washington Clinical Trial Ref:2343',
    projectId:'594',
    dispatchedBy: 'Allen Braun',
    email:'kite@gmail.com',
    type:1,
  },
  ]
  
  
  
  export default {
    components: {
      PageLayout,
    },
  
    mixins: [routeHelpers, imagesHelper],
  
    data() {
      return {
        loading: false,
        treatmentTypes: [],
        filters: {},
        qrUrl: '/Uploads/DocumentURL/shipping notice.png',
        showModalImage: false,
        showModal: false,
        phoneNo:'',
        company:'',
        address:'',
        phases: SMART_LAB_TREATMENT_PENDING_PHASES,
        outboundSteps: INVENTORY_OUTBOUND_STATUS_STEPS,
        customDisplayData,
        customDisplayDataMat,
    
        newSampleColumns: [
        {
            title: `Label ID`,
            dataIndex: 'labelId',
            key: 'labelId',
          },  
        {
            title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
            dataIndex: 'sampleId',
            key: 'sampleId',
          },
          {
            title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
            dataIndex: 'sampleName',
            key: 'sampleName',
          },
          {
            title: `${this.$store.getters.getTranslation.Clien_1_505}`,
            dataIndex: 'clientName',
            key: 'clientName',
          },
          {
            title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
          },
          {
            title: `Status`,
            dataIndex: 'labelStatus',
            key: 'labelStatus',
          },
          {
            title: `Created At`,
            dataIndex: 'createdAt',
            key: 'createdAt',
          },
          {
            title: `Updated At`,
            dataIndex: 'updatedAt',
            key: 'updatedAt',
          },
          {
            title: `${this.$store.getters.getTranslation.Print_1_111}`,
            dataIndex: 'print',
            key: 'print',
            scopedSlots: { customRender: 'print' },
          },
          {
            title: `Update Status`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        
        inbound: [],
        labelData:{},
        statusDetails: [
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
          },
        ],
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    watch: {
      translation(newValues, oldValue) {
        if (newValues !== oldValue) {
          this.newSampleColumns[1].title = newValues.SamplID_2_502
          this.newSampleColumns[2].title = newValues.SamplName_2_503
          this.newSampleColumns[3].title = newValues.Clien_1_505
          this.newSampleColumns[4].title = newValues.ArrivDate_5_535
          this.newSampleColumns[8].title = newValues.Print_1_111
          // this.newSampleColumns[5].title = newValues.Actio_1_220
  
          this.phases[0].name = newValues.inboushipm_2_302
          this.phases[1].name = newValues.ProceSampl_2_499
          this.phases[2].name = newValues.StoreSampl_2_579
  
          this.outboundSteps[0].name = newValues.StoreSampl_2_579
          this.outboundSteps[1].name = newValues.OutboProce_2_514
          this.outboundSteps[2].name = newValues.Couri_1_234
  
          this.customDisplayData[0].title = newValues.ReturMater_2_660
          this.customDisplayData[1].title = newValues['Initiby:_2_661']
          this.customDisplayData[2].title = newValues['Date:_1_664']
          this.customDisplayData[3].title = newValues.Origi_1_662
          this.customDisplayData[4].title = newValues['Complby:_2_663']
          this.customDisplayData[5].title = newValues['Date:_1_664']
          this.customDisplayData[6].title = newValues.Couri_1_665
          this.customDisplayData[7].title = newValues['ClienID:_2_678']
          this.customDisplayData[8].title = newValues.Clien_1_666
          this.customDisplayData[9].title = newValues['TrackID:_2_667']
          this.customDisplayData[10].title = newValues['ProjeID:_2_668']
          this.customDisplayData[11].title = newValues.Proje_1_669
          this.customDisplayData[12].title = newValues['ProtoID:_2_682']
          this.customDisplayData[14].title = newValues.Locat_1_671
          this.customDisplayData[15].title = newValues.Proto_1_686
          this.customDisplayData[16].title = newValues.Descr_1_655
          this.customDisplayData[17].title = newValues.Numbeof_3_673
  
          this.customDisplayDataMat[0].title = newValues.ClienProdu_2_675
          this.customDisplayDataMat[1].title = newValues.Suppl_1_676
        }
      },
    },
    mounted() {
      this.getTranslationData()
      this.getLabels()
    },
    methods: {
      _getFutureMomentStandardFormatted,
      moment,
      isEmpty,
      preventDefault,
      getLabels(){
        LabelServices.getAllLabels().then((response)=>{
          console.log(response.data , 'labels response')
          this.inbound=response.data
        })
      },
      searchTreatment() {},
      stepClick(record, phase) {
        if (record === 'error') {
          this.goto(phase)
        } else {
          this.goto(phase.url_slug)
        }
      },
      returnLabel(record){
        console.log(record.id)
        LabelServices.update('Returned', record.id).then((response)=>{
          console.log(response.data)
          this.getLabels()
        })
      },
      destroyLabel(record){
        LabelServices.update('Destroyed', record.id).then((response)=>{
          console.log(response.data)
          this.getLabels()
        })
      },
      clickImage(record) {
        this.qrUrl = record.qrUrl
        this.handleModal(true)
      },
      handleModal(show) {
        this.showModalImage = show
      },
      handleOk() {
        this.showModal = false
      },
      handelCancel(val){
        this.showModal = val
      },
      openViewModal(id) {
        this.showModalImage = true
        this.qrUrl = id
        // LabelServices.scheduling(id);
      },
      openPopViewModal(val, record, print) {
        this.showModal = val
        this.labelData=newSampleData.find((key)=>key.patientEnrollmentNumber===print.sampleId)
        this.company=print.company
        this.address=print.address
        this.phoneNo=print.phoneNo
        console.log(record)
        console.log(print)
      },
      getTranslationData() {
        this.phases[0].name = this.translation.inboushipm_2_302
        this.phases[1].name = this.translation.ProceSampl_2_499
        this.phases[2].name = this.translation.StoreSampl_2_579
  
  
        this.customDisplayData[0].title = this.translation.ReturMater_2_660
        this.customDisplayData[1].title = this.translation['Initiby:_2_661']
        this.customDisplayData[2].title = this.translation['Date:_1_664']
        this.customDisplayData[3].title = this.translation.Origi_1_662
        this.customDisplayData[4].title = this.translation['Complby:_2_663']
        this.customDisplayData[5].title = this.translation['Date:_1_664']
        this.customDisplayData[6].title = this.translation.Couri_1_665
        this.customDisplayData[7].title = this.translation['ClienID:_2_678']
        this.customDisplayData[8].title = this.translation.Clien_1_666
        this.customDisplayData[9].title = this.translation['TrackID:_2_667']
        this.customDisplayData[10].title = this.translation['ProjeID:_2_668']
        this.customDisplayData[11].title = this.translation.Proje_1_669
        this.customDisplayData[12].title = this.translation['ProtoID:_2_682']
        // this.customDisplayData[13].title=newValues.ReturMater_2_660
        this.customDisplayData[14].title = this.translation.Locat_1_671
        this.customDisplayData[15].title = this.translation.Proto_1_686
        this.customDisplayData[16].title = this.translation.Descr_1_655
        this.customDisplayData[17].title = this.translation.Numbeof_3_673
  
        this.customDisplayDataMat[0].title = this.translation.ClienProdu_2_675
        this.customDisplayDataMat[1].title = this.translation.Suppl_1_676
      },
      inboundSearch(value, key) {
        // console.log(value.toUpperCase())
        let filters = this.filters
        filters[key] = value.toUpperCase()
        filters = JSON.stringify(filters)
        filters = JSON.parse(filters)
        this.filters = filters
  
        if (!isEmpty(filters)) {
          let storages = []
          for (const filter in filters) {
            const filterValue = filters[filter]
  
            storages = newSampleData.filter((storage) => {
              if (isEmpty(filterValue) && !isNumber(filterValue)) {
                return storage[filter].match(value.toUpperCase())
              }
              // eslint-disable-next-line eqeqeq
              return storage[filter].match(value.toUpperCase()) == filterValue.toUpperCase()
            })
          }
          storages = JSON.stringify(storages)
          this.inbound = JSON.parse(storages)
        } else {
          this.inbound = newSampleData
        }
      },
      
      
      redirect() {
        this.goto('/inventory/storage/location')
      },
      printWindow() {
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
  