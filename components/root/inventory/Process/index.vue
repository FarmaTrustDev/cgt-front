<template>
  <div class="collection-processing-steps" style="margin-top:10px">
    <a-form :form="form" layout="horizontal">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="collections"
        :pagination="false"
        :loading="loading"
        class="rounded-table"
      >
        <template slot="collected" slot-scope="name, row">
          <!-- {{ row }} -->
          <a-form-item class="mt-20">
            <a-switch
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][collect]`,
                {
                  initialValue: row.isCollected,
                  valuePropName: 'checked',
                  rules: [
                    {
                      required: !notesRequired[row.id],
                      message: promptMessage,
                    },
                  ],
                },
              ]"
              :checked-children="translation.yes_1_654"
              :un-checked-children="translation.no_1_656"
              @change="(value) => handleCheck(value, row.id)"
            />

            <a-icon
              v-else-if="row.action"
              class="text-success"
              style="font-size: 1rem"
              type="check"
            ></a-icon>
            <a-icon
            v-else
            type="close"
            style="font-size: 1rem"
            class="color-red"
            >

            </a-icon>
          </a-form-item>
        </template>
        <template slot="notes" slot-scope="name, row">
          <a-form-item class="mt-20">
            <a-input
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][notes]`,
                {
                  initialValue: row.notes,
                  rules: [
                    {
                      required: !notesRequired[row.id],
                      message: promptMessage,
                    },
                  ],
                },
              ]"
              :placeholder="translation.Enternote_3_588"
              @blur="(e) => handleInput(row.id,e)"
            />
            <span v-else>{{ row.notes }}</span>
            <a-input
              v-decorator="[
                `collection[id-${row.id}][id]`,
                {
                  initialValue: row.id,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
        </template>

        <template slot="email" slot-scope="name, row">
          <!-- <InstantUpload
            :saved-list="row.uploads"
            :show-button="false"
            :action="bagService.uploads(row.id)"
            >
            <a-button slot="button" type="">
              <a-icon type="upload" />
            </a-button>
          </InstantUpload> -->
          <a-upload
            
            name="file"
            :before-upload="beforeUploadWithParam(row.id)"
            :multiple="true"
            :default-file-list="savedList"
            @change="handleChange(row.id, $event)"
          ><a-button :disabled="row.isCollected"> <a-icon type="upload" /> </a-button>
             <slot name="button"></slot>
            </a-upload> 
        </template>
        <template slot="action" slot-scope="name, row">
          <a-button
            :disabled="row.isCollected || btnLoading"
            shape="round"
            icon="sync"
            @click="handleCollectionSubmit(row)"
          />
        </template>
      </a-table>
      <a-form-item class="mt-15">
        <FormActionButton
        v-if="!isEmpty(collections[0]) ? !collections[0].isCollected : true"
          :disabled="buttonEnable"
          text="Submit for QP Approval"
          @click="submit"
          :loading="loading"
        />
      </a-form-item>

    </a-form>
    <a-modal
      title="Notify"
      :footer="null"
      :destroy-on-close="true"
      :visible="showEmailModal"
      @cancel="handleEmailModal(false)"
    >
      <email
        :content="{ body }"
        :bag-id="bagId"
        @closeModal="handleEmailModal"
      />
    </a-modal>


   
    <a-modal :visible="showSchedulingModal" :cancel-text="translation.Print_1_111" :ok-text="translation.Submi_1_248" class="modal-design-smart-lab" :dialog-style="{ right: '20%', top:'5%' }" @cancel="handleSchedulingModal(false)" @ok="handleScheOk(false)">
          <a-card class="grey-card-smart-lab">
            <status-detail :heading-title="translation.Order_1_727" :statusDetails="statusDetails" :status="translation.Sched_1_681" />
            <hr class="mt-15">
            <h2 class="mt-15">{{translation.Order_1_727}}</h2>
            <CustomDisplay :headingTitle="''" :colVal="12" :customDisplayData="customDisplayDataShipInfo" />
            <treatment-table :columns="orderTableDataColumns" :dataSource="orderTableData" :heading-title="''" />
            <treatment-table :columns="orderProductTableDataColumns" :dataSource="orderProductTableData" :heading-title="translation.OrderProdu_2_743" />
            <h2 class="mt-15">{{translation.OrderIniti_2_746}}</h2>

            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataOrderInit" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >{{translation['Initiby:_2_661']}} </a-col><a-col :span="5">{{custDD.initiatedBy}}</a-col>
                  <a-col :span="1" class="text-muted" >{{translation['Date:_1_664']}} </a-col><a-col :span="5">{{custDD.date}}</a-col>
                  <a-col :span="4" class="text-muted" >{{translation.OrderAccep_2_747}} </a-col><a-col :span="6">
                  <img :src="getImageUrl(custDD.orderAcceptable)" width="20" height="20" class="img-responsive" style="border-radius:5px" />
                  </a-col>
                </a-row>
            </a-card>
            <h2 class="mt-15">{{translation.OrderRevie_2_748}}</h2>

            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataOrderReview" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >{{translation['RevieBy:_2_749']}} </a-col><a-col :span="5">{{custDD.reviewBy}}</a-col>
                  <a-col :span="1" class="text-muted" >{{translation['Date:_1_664']}} </a-col><a-col :span="8">{{custDD.date}}</a-col>
                </a-row>
            </a-card>
      </a-card> 

          <template slot="footer">
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
            <a-button type="primary" @click="handleScheOk(false)">{{translation.Submi_1_248}}</a-button>
          </template>

    </a-modal>
    <a-modal
      :title="translation.Youhave_5_625"
      :visible="showQuaranitineModal"
      @cancel="handleErrorShowModal(false)"
    >
      <p v-if="inboundCheck">{{translation.Doyou_7_626}}</p>
      <template #footer>
        <a-button key="back" @click="handleErrorShowModal(false)">{{translation.no_1_656}}</a-button>
        <a-button v-if="inboundCheck" key="submit" type="primary" :loading="loading" @click="handleErrorShowModal(false)">{{translation.yes_1_654}}</a-button>
      </template>      
    </a-modal>
    <a-modal
      :width="1200"
      :footer="null"
      :visible="showQuarantine"
      :title="translation.Selecquara_3_627+':'"
      @cancel="handleQuarantineModal(false)"
    >
      <!-- <showQuarantine /> -->
      <a-form-item>
        <Quarantine text="Submit" @submit="handleQuarantineSubmit" />
      </a-form-item>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import BagCollectionServices from '~/services/API/BagCollectionServices'
import notifications from '~/mixins/notifications'
import Email from '~/components/treatment/collections/bag/Email'
import Quarantine from '~/components/inventory/quarantine'
// import InstantUpload from '~/components/upload/InstantUpload'
import { QUARANTINE_STORAGE } from '~/services/Constant'
import routeHelpers from '~/mixins/route-helpers'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
import treatmentTable from '~/components/inventory/treatment/treatmentTable'
import imagesHelper from '~/mixins/images-helper'
import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
import SampleProcessServices from '~/services/API/SampleProcessServices'
import QPStatusServices from '~/services/API/QPStatusServices'
import approvalHelper from '~/mixins/approval-helper'
import { isEmpty } from '~/services/Helpers'

export const customDisplayDataMRI = [
  {
    title: '',
    value: 'IC-SPC-003',
    key:0,
    url:''
  },
  {
    title: '',
    value: 'Drug B',
    key:1,
    url:''
  },
  {
    title: '',
    value: 'N/A',
    key:2,
    url:''
  },
  {
    title: '',
    value: '123456a',
    key:3,
    url:''
  },  
  {
    title: '',
    value: 'T1',
    key:4,
    url:''
  },
  {
    title: '',
    value: 'Kiet Test',
    key:5,
    url:''
  },
  {
    title: '',
    value: 'Allo Cells',
    key:6,
    url:''
  },
  {
    title: '',
    value: 'Texas Test Project',
    key:7,
    url:''
  },
  {
    title: '',
    value: 'Drug Product',
    key:8,
    url:''
  },  
  {
    title: '',
    value: 'N/A',
    key:9,
    url:''
  },  
  {
    title: '',
    value: ' 1',
    key:10,
    url:''
  }, 
  {
    title: '',
    value: 'Vials',
    key:11,
    url:''
  },
  {
    title: '',
    value: '10',
    key:12,
    url:''
  },
  {
    title: '',
    value: '10',
    key:13,
    url:''
  },
  {
    title: '',
    value: '10',
    key:14,
    url:''
  },
  {
    title: '',
    value: 'Yes',
    key:15,
    url:'web/icons/greenTick.png',
  },
  {
    title: 'Unit of Measure:',
    value: '1 bag',
    key:16,
    url:''
  },
  {
    title: '',
    value: 'Cryogenic',
    key:17,
    url:''
  },
  {
    title: '',
    value: 'Cryogenic',
    key:18,
    url:''
  }, 
  {
    title: '',
    value: 'R-01',
    key:19,
    url:''
  }, 
  {
    title: '',
    value: '15 min',
    key:20,
    url:''
  },
  {
    title: '',
    value: 'C-01',
    key:21,
    url:''
  },  
  {
    title: '',
    value: 'ABC1',
    key:22,
    url:''
  },  
  {
    title: '',
    value: 'Yes',
    key:23,
    url:'web/icons/greenTick.png',
  },  
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(365,'day')).format("DD/MM/YYYY"),
    key:24,
    url:''
  },
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:25,
    url:''
  }, 
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:26,
    url:''
  }, 
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:27,
    url:'web/icons/greenTick.png',
  },                     
]
export const contentTracking= [
    {
      containerID: '15646541023',
      monitorID: '641625169416',
      temperature: '-180',
      inAlarm: 'No',
      tamperSeal: '151564156',
    },
  ]
export const contentTracking2= [
    {
      intvtmlID: '221144',
      lot: 'ABC1',
      package: 'Vial 1',
      subPackage: 'N/A',
      containerID: 'Vial 1',
      description:'Drug Product',
      temperature:'Frozen',
    },
]
export const contentTrackingQA= [
    {
      createdEvent: 'PR.'+moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD.MM.YYYY"),
      dateCreated: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY") + ' at 13:34',
      createdBy: 'David Handerson',
      fromStep: 'New Event',
      status: 'Review',
    },
]
export const customDisplayDataShipInfo = [
  {
    title: '',
    value: 'Clinical Site 1',
    key:0,
    url:'',
  },
  {
    title: '',
    value: 'Mrs Dr',
    key:1,
    url:'',
  },
  {
    title: '',
    value: 'Text here...',
    key:2,
    url:'',
  },
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:3,
    url:'',
  },  
  {
    title: '',
    value: 'CRYOPDP',
    key:4,
    url:'',
  },
  {
    title: '',
    value: 'Cryogenic',
    key:5,
    url:'',
  },
  {
    title: '',
    value: '07700000000',
    key:6,
    url:'',
  },
  {
    title: '',
    value: 'Andrea Marosan',
    key:7,
    url:'',
  },
  {
    title: '',
    value: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:8,
    url:'',
  },              
]




export const orderTableData= [
    {
      shippingDestination: 'Cryoport MP: Eric Nilsen',
      address1: '900 The American Way',
      city: 'Morris Planes',
      stateProvince: 'NJ',
      zip: '12345',
      contact: 'Primary',
    },
    {
      shippingDestination: 'Clinical Site 1: Mrs Dr',
      address1: '1 Hospital Way',
      city: 'London',
      stateProvince: 'TX',
      zip: '67890',
      contact: 'Primary',
    },
  ]

export const customDisplayDataReleaseBy = [
  {    
    releaseBy: 'David Handerson',
    date: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:0,
  },        
]
export const orderProductTableData= [
    {
      itemNumber: 'Cryoport MP: Eric Nilsen',
      receiptID: '900 The American Way',
      itemDescription: 'Morris Planes',
      lot: 'NJ',
      availability: '12345',
    },
]
export const customDisplayDataOrderInit = [
  {
    initiatedBy: 'Andrea Marosan',
    date: '27/06/2023 at 14:00',
    orderAcceptable:'web/icons/greenTick.png',
    key:0,
  },
]

export const customDisplayDataOrderReview = [
  {
    reviewBy: 'Najib Rehman',
    date: '27/06/2022 at 14:00',
    key:0,
  },          
]
export default {
  components: { Email, 
    // InstantUpload, 
  Quarantine,StatusDetail,CustomDisplay,treatmentTable },
  mixins: [approvalHelper, notifications, routeHelpers,imagesHelper],
  props: {
    collections: { required: true, type: Array },
    bagId: { required: true, type: String },
    activeTab: { type: String },
    typeId: { type: String },
    record:{type: Object},
  },
  data() {
    return {
      isEmpty,
      columns: [
        {
          title: `${this.$store.getters.getTranslation.Quest_1_580}`,
          dataIndex: 'name',
          width: '30%',
        },
        {
          title: `${this.$store.getters.getTranslation.Check_1_454}`,
          dataIndex: 'collected',
          scopedSlots: { customRender: 'collected' },
        },
        {
          title: `${this.$store.getters.getTranslation.Notes_1_350}`,
          dataIndex: 'notes',
          scopedSlots: { customRender: 'notes' },
        },
        {
          title: `${this.$store.getters.getTranslation.SuppoDocum_2_581}`,
          scopedSlots: { customRender: 'email' },
        },
        /* {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          scopedSlots: { customRender: 'action' },
        }, */
      ],
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
        createdOn: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
        location: 'Cryoport - London',
      }],
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),

      
      orderTableDataColumns:[
        {
          title: `${this.$store.getters.getTranslation.ShippDesti_2_735}`,
          dataIndex: 'shippingDestination',
          key: 'shippingDestination',
        },
        {
          title: `${this.$store.getters.getTranslation.Addre1_2_736}`,
          dataIndex: 'address1',
          key: 'address1',
        },
        {
          title: `${this.$store.getters.getTranslation.City_1_446}`,
          dataIndex: 'city',
          key: 'city',
        }, 
        {
          title: `${this.$store.getters.getTranslation.State_1_737}`,
          dataIndex: 'stateProvince',
          key: 'stateProvince',
        },
        {
          title: `${this.$store.getters.getTranslation.Zip_1_738}`,
          dataIndex: 'zip',
          key: 'zip',
        },
        {
          title: `${this.$store.getters.getTranslation.ContaNumbe_2_404}`,
          dataIndex: 'contact',
          key: 'contact',
        },
      ],

      orderProductTableDataColumns:[
        {
          title: `${this.$store.getters.getTranslation.ItemNumbe_2_744}`,
          dataIndex: 'itemNumber',
          key: 'itemNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.ReceiID_2_740}`,
          dataIndex: 'receiptID',
          key: 'receiptID',
        },
        {
          title: `${this.$store.getters.getTranslation.ItemDescr_2_741}`,
          dataIndex: 'itemDescription',
          key: 'itemDescription',
        }, 
        {
          title: `${this.$store.getters.getTranslation.Lot_1_785}`,
          dataIndex: 'lot',
          key: 'lot',
        },
        {
          title: `${this.$store.getters.getTranslation.Avail_1_450}`,
          dataIndex: 'availability',
          key: 'availability',
        },
      ],
      checkboxValues:new Array(8).fill(false),
      btnLoading: false,
      showEmailModal: false,
      body: null,
      bagService: BagCollectionServices,
      showQuarantine: false,
      buttonEnable: false,
      notesRequired: {},
      filledData:0,
      noteItem:[],
      showQuaranitineModal:false,
      showInventoryModal:false,
      showSchedulingModal:false,
      showCourierModal:false,
      inboundCheck:false,
      customDisplayDataMRI,
      contentTracking,
      contentTracking2,
      contentTrackingQA,
      customDisplayDataReleaseBy,
      orderTableData,
      orderProductTableData,
      customDisplayDataOrderInit,
      customDisplayDataOrderReview,
      customDisplayDataShipInfo,
      errorMessage:`${this.$store.getters.getTranslation.Thecheck_10_582}`,
      promptMessage:`${this.$store.getters.getTranslation.Pleasinput_4_578}`,  
      imgData: [] ,
      images: {},
      savedList:[],   
      outputArray :[]
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
        this.columns[0].title=newValues.Quest_1_580
        this.columns[1].title=newValues.Check_1_454
        this.columns[2].title=newValues.Notes_1_350
        this.columns[3].title=newValues.SuppoDocum_2_581
        this.errorMessage=newValues.Thecheck_10_582
        this.promptMessage=newValues.Pleasinput_4_578

  
        this.customDisplayDataMRI[0].title=newValues['Item#:_2_684']
        this.customDisplayDataMRI[1].title=newValues.Descr_1_655
        this.customDisplayDataMRI[2].title=newValues.PurchOrder_2_685
        this.customDisplayDataMRI[3].title=newValues['ProjeID:_2_668']
        this.customDisplayDataMRI[4].title=newValues['ProtoID:_2_682']
        this.customDisplayDataMRI[5].title=newValues.Proto_1_686
        this.customDisplayDataMRI[6].title=newValues.Manuf_1_688
        this.customDisplayDataMRI[7].title=newValues.Proje_1_669
        this.customDisplayDataMRI[8].title=newValues.ProduClass_2_689
        this.customDisplayDataMRI[9].title=newValues['Manuf#:_2_691']
        this.customDisplayDataMRI[10].title=newValues.Packalevel_2_692
        this.customDisplayDataMRI[11].title=newValues['Type:_1_693']
        this.customDisplayDataMRI[12].title=newValues.Quant_1_657
        this.customDisplayDataMRI[13].title=newValues.StateQuant_2_695
        this.customDisplayDataMRI[14].title=newValues.TotalQuant_2_696
        this.customDisplayDataMRI[15].title=newValues.Samequant_5_697
        this.customDisplayDataMRI[16].title=newValues.Unitof_3_698
        this.customDisplayDataMRI[17].title=newValues.StoraTempe_2_700
        this.customDisplayDataMRI[18].title=newValues.ReceiTempe_2_701
        this.customDisplayDataMRI[19].title=newValues['WorksID:_2_703']
        this.customDisplayDataMRI[20].title=newValues.Timeto_3_705
        this.customDisplayDataMRI[21].title=newValues.TransVesse_3_706
        this.customDisplayDataMRI[22].title=newValues.Lotnumbe_2_652
        this.customDisplayDataMRI[23].title=newValues.MultiLots_2_707
        this.customDisplayDataMRI[24].title=newValues['ExpirDate:_2_708']
        this.customDisplayDataMRI[25].title=newValues.DateRecei_2_709
        this.customDisplayDataMRI[26].title=newValues.DateRecei_4_710
        this.customDisplayDataMRI[27].title=newValues.LineClear_3_711


        // this.contentTrackingColumns2[0].title=newValues.IntvtID_2_715
        // // this.contentTrackingColumns2[1].title=newValues
        // this.contentTrackingColumns2[2].title=newValues.Packa_1_717
        // this.contentTrackingColumns2[3].title=newValues['Sub-P_1_718']
        // this.contentTrackingColumns2[4].title=newValues.ContaID_2_719
        // this.contentTrackingColumns2[5].title=newValues.Descr_1_69
        // this.contentTrackingColumns2[6].title=newValues.Tempe_1_605


        // this.contentTrackingColumns[0].title=newValues.ContaID_2_719
        // // this.contentTrackingColumns2[1].title=newValues
        // this.contentTrackingColumns[1].title=newValues.MonitID_2_714
        // this.contentTrackingColumns[2].title=newValues.Tempe_1_605
        // this.contentTrackingColumns[3].title=newValues.InAlarm_2_716
        // this.contentTrackingColumns[4].title=newValues.TampeSeal_2_720


        // this.customDisplayDataShipInfo[0].title=newValues.ReceiInsti_2_728
        // this.customDisplayDataShipInfo[1].title=newValues.Consi_1_729
        // this.customDisplayDataShipInfo[2].title=newValues.AdditInfor_2_751
        // this.customDisplayDataShipInfo[3].title=newValues.PlannDate_4_731
        // this.customDisplayDataShipInfo[4].title=newValues['CouriName:_2_732']
        // this.customDisplayDataShipInfo[5].title=newValues.ShippTempe_2_733
        // this.customDisplayDataShipInfo[6].title=newValues.CouriPhone_2_734
        // this.customDisplayDataShipInfo[7].title=newValues['Initiby:_2_661']
        // this.customDisplayDataShipInfo[8].title=newValues['Date:_1_664']






      // this.orderProductTableDataColumns[0].title=newValues.ItemNumbe_2_744
      // this.orderProductTableDataColumns[1].title=newValues.ReceiID_2_740
      // this.orderProductTableDataColumns[2].title=newValues.ItemDescr_2_741
      // this.orderProductTableDataColumns[3].title=newValues.Lot_1_785
      // this.orderProductTableDataColumns[4].title=newValues.Avail_1_450

      // this.orderTableDataColumns[0].title=newValues.ShippDesti_2_735
      // this.orderTableDataColumns[1].title=newValues.Addre1_2_736
      // this.orderTableDataColumns[2].title=newValues.City_1_446
      // this.orderTableDataColumns[3].title=newValues.State_1_737
      // this.orderTableDataColumns[4].title=newValues.Zip_1_738
      // this.orderTableDataColumns[5].title=newValues.ContaNumbe_2_404

      // this.contentTrackingColumnsQA[0].title=newValues.CreatEvent_2_780
      // this.contentTrackingColumnsQA[1].title=newValues.DateCreat_2_781
      // this.contentTrackingColumnsQA[2].title=newValues.CreatBy_2_782
      // this.contentTrackingColumnsQA[3].title=newValues.FromStep_2_783
      // this.contentTrackingColumnsQA[4].title=newValues.Statu_1_202

      }
    }
  },  
  mounted() {
    this.getTranslationData()
  },   
  methods: {
    submit() {
      this.form.validateFields((err,values)=>{
        if(!err){
          const data = JSON.parse(JSON.stringify(this.collections))
          for (const question of data) {
            const imageUrl = this.imgData.find(item => item.iBSId === question.id) !== undefined ? this.imgData.find(item => item.iBSId === question.id).imgData : ''
            const stepId = question.id
            const action = values.collection[`id-`+question.id].collect
            const notes =  values.collection[`id-`+question.id].notes
            const stepName = question.name
            const sampleId = JSON.parse(this.$route.query.record).sampleId
            const taskId = JSON.parse(this.$route.query.record).taskId
            const taskName = JSON.parse(this.$route.query.record).taskName
            this.outputArray.push({
            notes,
            action,
            imageUrl,
            stepId,
            stepName,
            sampleId,
            taskId,
            taskName
          })
          }
          // this.loading = true
          //   SampleProcessServices.create(this.outputArray).then((response)=>{
          //     this.outputArray = [] 
          //   }).catch(this.error).finally(this.loading = false)
          // this.success('Submitted successfully')
          
          // console.log(this.typeId)
          // if ((this.typeId === 'inbound')) {
            
          //   this.showInventoryModal=true
          // }
          if(this.typeId === 'quarantine'){
            const obj=JSON.stringify(this.record)
            this.goto('/inventory/storage/ColorFridge?inbound=true&record='+obj)
          }
          if (this.typeId === 'outbound') {
            SampleProcessServices.create(this.outputArray).then((response)=>{
              this.outputArray = [] 
              QPStatusServices.getPending().then((response) => {
                if(response.data.length !== 0){
                  const pendingCount = response.data.length
                  this.$store.commit('setApproval', pendingCount)
                }  
              }).catch(this.error)
            }).catch(this.error).finally(this.loading = false)
            this.goto('/inventory/treatment')
            // this.showSchedulingModal=true
          }
        }
          if(this.typeId==='inbound'){
            SampleProcessServices.create(this.outputArray).then((response)=>{
              this.outputArray = [] 
              QPStatusServices.getPending().then((response) => {
                if(response.data.length !== 0){
                  const pendingCount = response.data.length
                  this.$store.commit('setApproval', pendingCount)
                }  
              }).catch(this.error)
            }).catch(this.error).finally(this.loading = false)
            this.goto('/inventory/treatment')
            // this.showInventoryModal=true
            // this.showQuaranitineModal=true
          }
          else if(this.typeId!=='inbound'){
            console.log('complete')
            // this.error()
          }

          // console.log(this.typeId)
          // alert("You have missed the option(s) 'No'. Do you want to quarantine the sample?")
      })
    },
    getTranslationData(){
        this.customDisplayDataMRI[0].title=this.translation['Item#:_2_684']
        this.customDisplayDataMRI[1].title=this.translation.Descr_1_655
        this.customDisplayDataMRI[2].title=this.translation.PurchOrder_2_685
        this.customDisplayDataMRI[3].title=this.translation['ProjeID:_2_668']
        this.customDisplayDataMRI[4].title=this.translation['ProtoID:_2_682']
        this.customDisplayDataMRI[5].title=this.translation.Proto_1_686
        this.customDisplayDataMRI[6].title=this.translation.Manuf_1_688
        this.customDisplayDataMRI[7].title=this.translation.Proje_1_669
        this.customDisplayDataMRI[8].title=this.translation.ProduClass_2_689
        this.customDisplayDataMRI[9].title=this.translation['Manuf#:_2_691']
        this.customDisplayDataMRI[10].title=this.translation.Packalevel_2_692
        this.customDisplayDataMRI[11].title=this.translation['Type:_1_693']
        this.customDisplayDataMRI[12].title=this.translation.Quant_1_657
        this.customDisplayDataMRI[13].title=this.translation.StateQuant_2_695
        this.customDisplayDataMRI[14].title=this.translation.TotalQuant_2_696
        this.customDisplayDataMRI[15].title=this.translation.Samequant_5_697
        this.customDisplayDataMRI[16].title=this.translation.Unitof_3_698
        this.customDisplayDataMRI[17].title=this.translation.StoraTempe_2_700
        this.customDisplayDataMRI[18].title=this.translation.ReceiTempe_2_701
        this.customDisplayDataMRI[19].title=this.translation['WorksID:_2_703']
        this.customDisplayDataMRI[20].title=this.translation.Timeto_3_705
        this.customDisplayDataMRI[21].title=this.translation.TransVesse_3_706
        this.customDisplayDataMRI[22].title=this.translation.Lotnumbe_2_652
        this.customDisplayDataMRI[23].title=this.translation.MultiLots_2_707
        this.customDisplayDataMRI[24].title=this.translation['ExpirDate:_2_708']
        this.customDisplayDataMRI[25].title=this.translation.DateRecei_2_709
        this.customDisplayDataMRI[26].title=this.translation.DateRecei_4_710
        this.customDisplayDataMRI[27].title=this.translation.LineClear_3_711


        // this.contentTrackingColumns2[0].title=this.translation.IntvtID_2_715
        // this.contentTrackingColumns2[1].title=newValues
        // this.contentTrackingColumns2[2].title=this.translation.Packa_1_717
        // this.contentTrackingColumns2[3].title=this.translation['Sub-P_1_718']
        // this.contentTrackingColumns2[4].title=this.translation.ContaID_2_719
        // this.contentTrackingColumns2[5].title=this.translation.Descr_1_69
        // this.contentTrackingColumns2[6].title=this.translation.Tempe_1_605

        // this.contentTrackingColumns[0].title=this.translation.ContaID_2_719
        // // this.contentTrackingColumns2[1].title=newValues
        // this.contentTrackingColumns[1].title=this.translation.MonitID_2_714
        // this.contentTrackingColumns[2].title=this.translation.Tempe_1_605
        // this.contentTrackingColumns[3].title=this.translation.InAlarm_2_716
        // this.contentTrackingColumns[4].title=this.translation.TampeSeal_2_720

        // this.customDisplayDataShipInfo[0].title=this.translation.ReceiInsti_2_728
        // this.customDisplayDataShipInfo[1].title=this.translation.Consi_1_729
        // this.customDisplayDataShipInfo[2].title=this.translation.AdditInfor_2_751
        // this.customDisplayDataShipInfo[3].title=this.translation.PlannDate_4_731
        // this.customDisplayDataShipInfo[4].title=this.translation['CouriName:_2_732']
        // this.customDisplayDataShipInfo[5].title=this.translation.ShippTempe_2_733
        // this.customDisplayDataShipInfo[6].title=this.translation.CouriPhone_2_734
        // this.customDisplayDataShipInfo[7].title=this.translation['Initiby:_2_661']
        // this.customDisplayDataShipInfo[8].title=this.translation['Date:_1_664']

        
      // this.orderProductTableDataColumns[0].title=this.translation.ItemNumbe_2_744
      // this.orderProductTableDataColumns[1].title=this.translation.ReceiID_2_740
      // this.orderProductTableDataColumns[2].title=this.translation.ItemDescr_2_741
      // this.orderProductTableDataColumns[3].title=this.translation.Lot_1_785
      // this.orderProductTableDataColumns[4].title=this.translation.Avail_1_450

      // this.orderTableDataColumns[0].title=this.translation.ShippDesti_2_735
      // this.orderTableDataColumns[1].title=this.translation.Addre1_2_736
      // this.orderTableDataColumns[2].title=this.translation.City_1_446
      // this.orderTableDataColumns[3].title=this.translation.State_1_737
      // this.orderTableDataColumns[4].title=this.translation.Zip_1_738
      // this.orderTableDataColumns[5].title=this.translation.ContaNumbe_2_404

      // this.contentTrackingColumnsQA[0].title=this.translation.CreatEvent_2_780
      // this.contentTrackingColumnsQA[1].title=this.translation.DateCreat_2_781
      // this.contentTrackingColumnsQA[2].title=this.translation.CreatBy_2_782
      // this.contentTrackingColumnsQA[3].title=this.translation.FromStep_2_783
      // this.contentTrackingColumnsQA[4].title=this.translation.Statu_1_202      
    },    
    handleCollectionSubmit(collection) {
      // console.log(collection.alias)
      const fields = this.form.getFieldsValue()

      const values = fields.collection[`id-${collection.id}`]

      if (collection.alias === QUARANTINE_STORAGE && values.collect) {
        this.handleQuarantineModal(true)
        // this.$emit('updateId', collection.id)
        return false
      }
      this.buttonEnable = false
      this.btnLoading = true
      if (values) {
        this.success('Update Successfully')
        this.$emit('updateId', collection.id)
        // BagCollectionServices.update(collection.id, values)
        //   .then((response) => {
        //     this.success("Update Successfully")
        //     this.$emit('fetchBags')
        //     this.btnLoading = false
        //   })
        //   .catch(() => {
        //     this.btnLoading = false
        //   })
        this.btnLoading = false
      }
    },
    handleCheck(value, rowId,alias) {
      // console.log(alias)
      const notesRequired = this.notesRequired
      notesRequired[rowId] = value
      this.notesRequired = notesRequired
      if(value===true){
        this.filledData=this.filledData+1
      }else{
        this.filledData=this.filledData-1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      this.checkboxValues[rowId] = value
      
      // this.sendData(this.filledData)
    },
    handleInput(rowId,e) {
      if(this.noteItem.includes(rowId)){
        this.noteItem.splice(this.noteItem.indexOf(rowId),1);
        this.filledData=this.filledData - 1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      if(!this.notesRequired[rowId] && e.target.value!==null){
        // console.log(this.noteItem)
        this.noteItem.push(rowId)
        this.filledData=this.filledData + 1
        // this.sendData(this.filledData)
      }
    },        
    handleEmailModal(show, data) {
      if (show) {
        this.body = `${data.name} has been completed against  by Bag ${this.bagId} `
        // console.log(message)
      }
      this.showEmailModal = show
    },
    handleQuarantineModal(show) {
      this.showQuarantine = show
    },
    handleErrorShowModal(show){
      this.showQuaranitineModal=show
    },
    handleSchedulingModal(){
      this.showSchedulingModal=false
    },
    handleScheOk(){
      this.success('Submitted successfully')
      this.showSchedulingModal=false
      this.$emit('handleActiveTab', 'COURIER')
      const obj=JSON.stringify(this.record)
      this.goto('/inventory/treatment/outboundProcess?view=COURIER&record='+obj)
    },    
    handleInventorygModal(){
      this.showInventoryModal=false
    },
    handleInventoryOk(){
      /* if(this.inboundCheck===true){
        this.showQuaranitineModal=true
        this.showInventoryModal=false
      }else{ */
        
        this.showInventoryModal=false
        const obj=JSON.stringify(this.$route.query.record)
        console.log(obj)
        this.goto('/inventory/storage/ColorFridge?inbound=true&record='+obj)
      // }
    },
    handleCourierModal(){
      this.showCourierModal=false
    },
    handleQuarantineSubmit() {
      this.handleQuarantineModal(false)
      this.buttonEnable = true
    },
    printWindow(){
      window.print()
    },
    error() {
    this.$error({
      title: this.errorMessage,
      // content: 'some messages...some messages...',
    });
    },
    beforeUploadWithParam(param) {
      return (file) => {
        const reader = new FileReader();
        reader.onload = (event)=> {
        const resultData = event.target.result;
        const res=resultData.split(',')[1];
        this.pushListImage(res,param)
        };
        reader.readAsDataURL(file);
        return false;

      };
    },
    pushListImage(image,id)
    {
      this.imgData.push({iBSId:id,imgData:image})
    },
    handleChange(id, info) {
      if (info.file.status !== 'uploading') {
        const file = info;
        if(file){ 
          this.images[id] = info
        }
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
}
</script>