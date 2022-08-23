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
              v-else
              class="text-success"
              style="font-size: 1rem"
              type="check"
            ></a-icon>
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
          <InstantUpload
            :saved-list="row.uploads"
            :action="bagService.uploads(row.id)"
            :show-button="false"
          >
            <a-button slot="button" type="">
              <a-icon type="upload" />
            </a-button>
          </InstantUpload>
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
        :disabled="buttonEnable"
        :text="translation['Submi_1_248']"
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


    <a-modal :visible="showInventoryModal" class="modal-design-smart-lab" :cancel-text="'Print'" :ok-text="'Submit'" :dialog-style="{ right: '20%', top:'5%' }" @cancel="handleInventorygModal(false)" @ok="handleInventoryOk(false)">
          <a-card class="grey-card-smart-lab">
            <status-detail :heading-title="'Material Receipt'" :statusDetails="statusDetails" :status="'Inventory'" />
            <hr class="mt-15">
            <h2>1. Material Receipt and Identification</h2>
            <CustomDisplay :headingTitle="''" :colVal="6" :customDisplayData="customDisplayDataMRI" />
            <h2>2. Material Unpacking</h2>
            <treatment-table :columns="contentTrackingColumns" :dataSource="contentTracking" :heading-title="'Content Tracking'" />
            <treatment-table :columns="contentTrackingColumns2" :dataSource="contentTracking2" :heading-title="''" />
            <h2>3. QA Disposition</h2>
            <treatment-table :columns="contentTrackingColumns2" :dataSource="contentTracking2" :heading-title="''" />
            <h2>4. Material Release</h2>
            <a-row><a-col :span="6"><h2 style="line-height:50px">Release Location </h2></a-col><a-col :span="14"><h2><a-input style="border-radius:10px; height:50px" /></h2></a-col></a-row>
            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataReleaseBy" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >Release By: </a-col><a-col :span="5">{{custDD.releaseBy}}</a-col>
                  <a-col :span="1" class="text-muted" >Date: </a-col><a-col :span="8">{{custDD.date}}</a-col>
                </a-row>
            </a-card>
      </a-card>    
          <template slot="footer">
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
            <a-button type="primary" @click="handleInventoryOk(false)">Submit</a-button>
          </template>
    </a-modal>
    <a-modal :visible="showSchedulingModal" :cancel-text="'Print'" :ok-text="'Submit'" class="modal-design-smart-lab" :dialog-style="{ right: '20%', top:'5%' }" @cancel="handleSchedulingModal(false)" @ok="handleScheOk(false)">
          <a-card class="grey-card-smart-lab">
            <status-detail :heading-title="'Order'" :statusDetails="statusDetails" :status="'Scheduling'" />
            <hr class="mt-15">
            <h2>Order</h2>
            <CustomDisplay :headingTitle="''" :colVal="12" :customDisplayData="customDisplayDataShipInfo" />
            <treatment-table :columns="orderTableDataColumns" :dataSource="orderTableData" :heading-title="''" />
            <treatment-table :columns="orderProductTableDataColumns" :dataSource="orderProductTableData" :heading-title="'Ordered Produts'" />
            <h2>Order Initiation</h2>

            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataOrderInit" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >Initiated by: </a-col><a-col :span="5">{{custDD.initiatedBy}}</a-col>
                  <a-col :span="1" class="text-muted" >Date: </a-col><a-col :span="5">{{custDD.date}}</a-col>
                  <a-col :span="4" class="text-muted" >Order Acceptable? </a-col><a-col :span="6">
                  <img :src="getImageUrl(custDD.orderAcceptable)" width="20" height="20" class="img-responsive" style="border-radius:5px" />
                  </a-col>
                </a-row>
            </a-card>
            <h2>Order Review</h2>

            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataOrderReview" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >Review By: </a-col><a-col :span="5">{{custDD.reviewBy}}</a-col>
                  <a-col :span="1" class="text-muted" >Date: </a-col><a-col :span="8">{{custDD.date}}</a-col>
                </a-row>
            </a-card>
      </a-card> 

          <template slot="footer">
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
            <a-button type="primary" @click="handleScheOk(false)">Submit</a-button>
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
        <a-button v-if="inboundCheck" key="submit" type="primary" :loading="loading" @click="handleErrorShowModal(false), handleQuarantineModal(true)">{{translation.yes_1_654}}</a-button>
      </template>      
    </a-modal>
    <a-modal
      :width="1200"
      :footer="null"
      :visible="showQuarantine"
      title="Select quarantine storage:"
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
import BagCollectionServices from '~/services/API/BagCollectionServices'
import notifications from '~/mixins/notifications'
import Email from '~/components/treatment/collections/bag/Email'
import Quarantine from '~/components/inventory/quarantine'
import InstantUpload from '~/components/upload/InstantUpload'
import { QUARANTINE_STORAGE } from '~/services/Constant'
import routeHelpers from '~/mixins/route-helpers'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
import treatmentTable from '~/components/inventory/treatment/treatmentTable'
import imagesHelper from '~/mixins/images-helper'


export const customDisplayDataMRI = [
  {
    title: 'Item #:',
    value: 'IC-SPC-003',
    key:0,
    url:''
  },
  {
    title: 'Description:',
    value: 'Drug B',
    key:1,
    url:''
  },
  {
    title: 'Purchase Order:',
    value: 'N/A',
    key:2,
    url:''
  },
  {
    title: 'Project ID:',
    value: '123456a',
    key:3,
    url:''
  },  
  {
    title: 'Protocol ID:',
    value: 'T1',
    key:4,
    url:''
  },
  {
    title: 'Protocol:',
    value: 'Kiet Test',
    key:5,
    url:''
  },
  {
    title: 'Manufacturer:',
    value: 'Allo Cells',
    key:6,
    url:''
  },
  {
    title: 'Project:',
    value: 'Texas Test Project',
    key:7,
    url:''
  },
  {
    title: 'Product Class:',
    value: 'Drug Product',
    key:8,
    url:''
  },  
  {
    title: 'Manufacturer #:',
    value: 'N/A',
    key:9,
    url:''
  },  
  {
    title: 'Package levels:',
    value: ' 1',
    key:10,
    url:''
  }, 
  {
    title: 'Type:',
    value: 'Vials',
    key:11,
    url:''
  },
  {
    title: ' Quantity:',
    value: '10',
    key:12,
    url:''
  },
  {
    title: 'Stated Quantity:',
    value: '10',
    key:13,
    url:''
  },
  {
    title: 'Total Quantity:',
    value: '10',
    key:14,
    url:''
  },
  {
    title: 'Same quantity in each container:',
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
    title: 'Storage Temperature:',
    value: 'Cryogenic',
    key:17,
    url:''
  },
  {
    title: 'Receipt Temperature:',
    value: 'Cryogenic',
    key:18,
    url:''
  }, 
  {
    title: 'Workstation ID:',
    value: 'R-01',
    key:19,
    url:''
  }, 
  {
    title: 'Time to receipt:',
    value: '15 min',
    key:20,
    url:''
  },
  {
    title: 'Transport Vessel ID:',
    value: 'C-01',
    key:21,
    url:''
  },  
  {
    title: 'Lot number:',
    value: 'ABC1',
    key:22,
    url:''
  },  
  {
    title: 'Multiple Lots',
    value: 'Yes',
    key:23,
    url:'web/icons/greenTick.png',
  },  
  {
    title: 'Expiration Date:',
    value: '27/06/2022',
    key:24,
    url:''
  },
  {
    title: 'Date Received:',
    value: '27/06/2022',
    key:25,
    url:''
  }, 
  {
    title: 'Date Received by LC:',
    value: '27/06/2022',
    key:26,
    url:''
  }, 
  {
    title: 'Line Clearance performed:',
    value: '27/06/2022',
    key:27,
    url:'web/icons/greenTick.png',
  },                     
]

export const customDisplayDataShipInfo = [
  {
    title: 'Receiving Institution:',
    value: 'Clinical Site 1',
    key:0,
    url:'',
  },
  {
    title: 'Consignee:',
    value: 'Mrs Dr',
    key:1,
    url:'',
  },
  {
    title: 'Additional Information:',
    value: 'Text here...',
    key:2,
    url:'',
  },
  {
    title: 'Planned Date of Shipment:',
    value: '27/06/2022',
    key:3,
    url:'',
  },  
  {
    title: 'Courier Name:',
    value: 'CRYOPDP',
    key:4,
    url:'',
  },
  {
    title: 'Shipping Temperature:',
    value: 'Cryogenic',
    key:5,
    url:'',
  },
  {
    title: ' Courier Phone:',
    value: '07700000000',
    key:6,
    url:'',
  },
  {
    title: 'Initiated by:',
    value: 'Andrea Marosan',
    key:7,
    url:'',
  },
  {
    title: ' Date:',
    value: '27/06/2022 at 14:00',
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
      createdEvent: 'PR.27.06.2022',
      dateCreated: '27/06/2022 at 13:34',
      createdBy: 'David Handerson',
      fromStep: 'New Event',
      status: 'Review',
    },
]
export const customDisplayDataReleaseBy = [
  {    
    releaseBy: 'David Handerson',
    date: '27/06/2022',
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
    date: '27/06/2022 at 14:00',
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
  components: { Email, InstantUpload, Quarantine,StatusDetail,CustomDisplay,treatmentTable },
  mixins: [notifications, routeHelpers,imagesHelper],
  props: {
    collections: { required: true, type: Array },
    bagId: { required: true, type: String },
    activeTab: { type: String },
    typeId: { type: String },
  },
  data() {
    return {
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
        createdOn: '27/06/2022',
        location: 'Cryoport - London',
      }],
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
      contentTrackingColumns:[
        {
          title: 'Container ID',
          dataIndex: 'containerID',
          key: 'containerID',
        },
        {
          title: 'Monitor ID',
          dataIndex: 'monitorID',
          key: 'monitorID',
        },
        {
          title: 'Temperature',
          dataIndex: 'temperature',
          key: 'temperature',
        }, 
        {
          title: 'In Alarm?',
          dataIndex: 'inAlarm',
          key: 'inAlarm',
        },
        {
          title: 'Tamper Seal',
          dataIndex: 'tamperSeal',
          key: 'tamperSeal',
        },                                     
      ],
      contentTrackingColumnsQA:[
        {
          title: 'Created Event',
          dataIndex: 'createdEvent',
          key: 'createdEvent',
        },
        {
          title: ' Date Created',
          dataIndex: 'dateCreated',
          key: 'dateCreated',
        },
        {
          title: 'Created By',
          dataIndex: 'createdBy',
          key: 'createdBy',
        }, 
        {
          title: 'From Step',
          dataIndex: 'fromStep',
          key: 'fromStep',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },                                     
      ],
      contentTrackingColumns2:[
        {
          title: 'Intvtml ID',
          dataIndex: 'intvtmlID',
          key: 'intvtmlID',
        },
        {
          title: 'Lot',
          dataIndex: 'lot',
          key: 'lot',
        },
        {
          title: 'Package',
          dataIndex: 'package',
          key: 'package',
        }, 
        {
          title: 'Sub-Package',
          dataIndex: 'subPackage',
          key: 'subPackage',
        },
        {
          title: 'Container ID',
          dataIndex: 'containerID',
          key: 'containerID',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Temperature',
          dataIndex: 'temperature',
          key: 'temperature',
        },                                        
      ],
      orderTableDataColumns:[
        {
          title: 'Shipping Destination',
          dataIndex: 'shippingDestination',
          key: 'shippingDestination',
        },
        {
          title: 'Address 1',
          dataIndex: 'address1',
          key: 'address1',
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
        }, 
        {
          title: 'State/Province',
          dataIndex: 'stateProvince',
          key: 'stateProvince',
        },
        {
          title: 'Zip',
          dataIndex: 'zip',
          key: 'zip',
        },
        {
          title: 'Contact',
          dataIndex: 'contact',
          key: 'contact',
        },
      ],
      orderProductTableDataColumns:[
        {
          title: 'Item Number',
          dataIndex: 'itemNumber',
          key: 'itemNumber',
        },
        {
          title: 'Receipt ID',
          dataIndex: 'receiptID',
          key: 'receiptID',
        },
        {
          title: 'Item Description',
          dataIndex: 'itemDescription',
          key: 'itemDescription',
        }, 
        {
          title: 'Lot',
          dataIndex: 'lot',
          key: 'lot',
        },
        {
          title: 'Availability',
          dataIndex: 'availability',
          key: 'availability',
        },
      ],
      
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
      }
    }
  },     
  methods: {
    submit() {
      this.form.validateFields((err,values)=>{
        if(!err){
          // console.log(this.typeId)
          if ((this.typeId === 'inbound') || (this.typeId === 'quarantine')) {
            this.showInventoryModal=true
          }
          if (this.typeId === 'outbound') {
            this.showSchedulingModal=true
          }
        }else{
          if(this.typeId==='inbound'){
            this.inboundCheck=true
            this.showQuaranitineModal=true
          }
          if(this.typeId!=='inbound'){
            this.error()
          }
          
          // console.log(this.typeId)
          // alert("You have missed the option(s) 'No'. Do you want to quarantine the sample?")
        }
      })
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
      this.goto('/inventory/treatment/outboundProcess?view=COURIER')
    },    
    handleInventorygModal(){
      this.showInventoryModal=false
    },
    handleInventoryOk(){
      this.success('Submitted successfully')
      this.showInventoryModal=false
      this.goto('/inventory/storage/ColorFridge?inbound=true')
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
  },
}
</script>