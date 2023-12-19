<template>
    <div class="collection-processing-steps" style="margin-top:10px">
      <a-form :form="form" @submit="onSubmit" layout="horizontal">
        <a-table style="display: none;"
          :columns="columns"
          :data-source="collections"
          :pagination="false"
          :loading="loading"
          class="rounded-table"
        >
          <template slot="collected" slot-scope="name, row">
            <!-- {{ row }} -->
            <a-form-item class="mt-20">
              <a-switch v-if="!row.isCollected"
                v-decorator="[
                  `collection[id-${row.id}][collect]`,
                  {
                    
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: false,
                        message: 'this is rquired',
                      },
                    ],
                  },
                ]"
                checked-children="yes"
                un-checked-children="no"
                @change="handleCheckboxChange(row.id, $event)"
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
            ></a-icon>
            </a-form-item>
          </template>
          <template slot="notes" slot-scope="name, row">
            <a-form-item class="mt-20">
              <a-input  v-if="!row.isCollected"
               
                v-decorator="[
                  `collection[id-${row.id}][notes]`,
                  {
                    
                    rules: [
                      {
                        required: false,
                        message: 'this is required',
                      },
                    ],
                  },
                ]"
                placeholder="note"
                
              />
              <span v-else>{{ row.notes }}</span>
            </a-form-item>
          </template>
  
          <template slot="docs">
            
              <a-button slot="button" type="">
                <a-icon type="upload" />
              </a-button>
            
          </template>
          <template slot="action" >
            <a-button
              shape="round"
              icon="sync"
            />
          </template>
        </a-table>
        <div v-if="qPStatusData.status === 'Approved'">
          <a-row >
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Approved By:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ qPStatusData.createdBy }}</h3></div>
              </a-col>
              </div>
          </a-row>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Approved On:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ _getFormatMoment(qPStatusData.createdAt).format("DD/MM/YYYY hh:mm:ss") }}  </h3></div>
              </a-col>
              </div>
          </a-row>
        </div>
        <div v-else-if="qPStatusData.status === 'Rejected'">
          <a-row >
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Rejected By:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ qPStatusData.createdBy }}</h3></div>
              </a-col>
              </div>
          </a-row>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Rejected On:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ _getFormatMoment(qPStatusData.createdAt).format("DD/MM/YYYY  hh:mm:ss") }}</h3></div>
              </a-col>
              </div>
          </a-row>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Reason</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ qPStatusData.reason }}</h3></div>
              </a-col>
              </div>
          </a-row>
        </div>
        <div v-else-if="qPStatusData.status === 'Quarantine'">
          <a-row >
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Quarantine By:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ qPStatusData.createdBy }}</h3></div>
              </a-col>
              </div>
          </a-row>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Quarantine At:</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ _getFormatMoment(qPStatusData.createdAt).format("DD/MM/YYYY hh:mm:ss") }}</h3></div>
              </a-col>
              </div>
          </a-row>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="1" :span="11">
              <div class="pt-3"><h3>Reason</h3></div>
              </a-col>
              <a-col :span="10">
              <div class="pt-3"><h3>{{ qPStatusData.reason }}</h3></div>
              </a-col>
              </div>
          </a-row>
        </div>
        <div v-else>
          <a-row class="mt-20">
              <div class="consentClass">
              <a-col :offset="9" :span="11">
              <div class="pt-3"><h3>QP Status is pending</h3></div>
              </a-col>
              
              </div>
          </a-row>
        </div>
      <a-form-item class="mt-15">
        <FormActionButton v-if="qPStatusData.status==='Approved'"
          
          text="Proceed"
          
          :loading="loading"
        />
      </a-form-item>
      </a-form>
      <a-modal :visible="showInventoryModal" class="modal-design-smart-lab" :cancel-text="'Print'" :ok-text="'Submit'" :dialog-style="{ right: '20%', top:'5%' }" @cancel="handleInventorygModal(false)" @ok="handleInventoryOk(false)">
          <a-card class="grey-card-smart-lab">
            <status-detail :heading-title="translation.MaterRecei_2_677" :statusDetails="statusDetails" :status="translation.Inven_1_538" />
            <hr class="mt-15">
            <h2 class="mt-15">{{translation['1.Mater_5_683']}}</h2>
            <CustomDisplay :headingTitle="''" :colVal="6" :customDisplayData="customDisplayDataMRI" />
            <h2 class="mt-15">{{translation['2.Mater_3_712']}}</h2>
            <treatment-table :columns="contentTrackingColumns" :dataSource="contentTracking" :heading-title="translation.ConteTrack_2_713" />
            <treatment-table :columns="contentTrackingColumns2" :dataSource="contentTracking2" :heading-title="''" />
            <h2 class="mt-15">{{translation['3.QA_3_721']}}</h2>
            <treatment-table :columns="contentTrackingColumnsQA" :dataSource="contentTrackingQA" :heading-title="''" />
            <h2 class="mt-15">{{translation['4.Mater_3_724']}}</h2>
            <a-row><a-col :span="6"><h2 style="line-height:50px">{{translation.ReleaLocat_2_725}} </h2></a-col><a-col :span="14"><h2><a-input style="border-radius:10px; height:50px" /></h2></a-col></a-row>
            <a-card class="white-card-smart-lab">
                <a-row v-for="custDD in customDisplayDataReleaseBy" :key="custDD.key">
                  <a-col :span="2" class="text-muted" >{{translation['ReleaBy:_2_726']}} </a-col><a-col :span="5">{{custDD.releaseBy}}</a-col>
                  <a-col :span="1" class="text-muted" >{{translation['Date:_1_664']}} </a-col><a-col :span="8">{{custDD.date}}</a-col>
                </a-row>
            </a-card>
      </a-card>    
          <template slot="footer">
            <a-button @click="printWindow()">{{translation.Print_1_111}}</a-button>
            <a-button type="primary" @click="handleInventoryOk(false)">{{translation.Submi_1_248}}</a-button>
          </template>
    </a-modal>
    </div>
  </template>
  <script>
  import moment from 'moment'
  import QPProcessServices from '~/services/API/QPProcessServices'
  import QPStatusServices from '~/services/API/QPStatusServices'
  import SampleQPProcessServices from '~/services/API/SampleQPProcessServices'
  import { isEmpty } from '~/services/Helpers'
  // import Email from '~/components/treatment/collections/bag/Email'
  import StatusDetail from '~/components/inventory/treatment/statusDetail'
  import CustomDisplay from '~/components/inventory/treatment/customDisplay'
  import treatmentTable from '~/components/inventory/treatment/treatmentTable'
  import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
  import {_getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import routeHelpers from '~/mixins/route-helpers'
  import SampleServices from '~/services/API/SampleServices'
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
export const customDisplayDataReleaseBy = [
  {    
    releaseBy: 'David Handerson',
    date: moment(_getFutureMomentStandardFormatted(-5,'day')).format("DD/MM/YYYY"),
    key:0,
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
  export default {
  components: { StatusDetail,CustomDisplay,treatmentTable },
  mixins: [routeHelpers],
  props: {
    projId: { required: true, type: String },
    sampleId: { required: true, type: Number },
    samplePuid: { required: true, type: String },
    sampleName: { required: true, type: String },
    typeId: { required: true, type: String },
    stageId:{ required:true, type: Number},
  },
  data() {
    return {
      columns: [
        {
          title: 'Questions',
          dataIndex: 'question',
          key:'question',
          width: '30%',
        },
        {
          title: `Check`,
          scopedSlots: { customRender: 'collected' },
        },
        {
          title: 'Notes',
          scopedSlots: { customRender: 'notes' },
        },
        {
          title: 'Supporting Documents',
          scopedSlots: { customRender: 'docs' },
        },
        /* {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          scopedSlots: { customRender: 'action' },
        }, */
      ],
      contentTrackingColumns:[
        {
          title: `${this.$store.getters.getTranslation.ContaID_2_719}`,
          dataIndex: 'containerID',
          key: 'containerID',
        },
        {
          title: `${this.$store.getters.getTranslation.MonitID_2_714}`,
          dataIndex: 'monitorID',
          key: 'monitorID',
        },
        {
          title: `${this.$store.getters.getTranslation.Tempe_1_605}`,
          dataIndex: 'temperature',
          key: 'temperature',
        }, 
        {
          title: `${this.$store.getters.getTranslation.InAlarm_2_716}`,
          dataIndex: 'inAlarm',
          key: 'inAlarm',
        },
        {
          title: `${this.$store.getters.getTranslation.TampeSeal_2_720}`,
          dataIndex: 'tamperSeal',
          key: 'tamperSeal',
        },                                     
      ],
      contentTrackingColumnsQA:[
        {
          title: `${this.$store.getters.getTranslation.CreatEvent_2_780}`,
          dataIndex: 'createdEvent',
          key: 'createdEvent',
        },
        {
          title: `${this.$store.getters.getTranslation.DateCreat_2_781}`,
          dataIndex: 'dateCreated',
          key: 'dateCreated',
        },
        {
          title: `${this.$store.getters.getTranslation.CreatBy_2_782}`,
          dataIndex: 'createdBy',
          key: 'createdBy',
        }, 
        {
          title: `${this.$store.getters.getTranslation.FromStep_2_783}`,
          dataIndex: 'fromStep',
          key: 'fromStep',
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          key: 'status',
        },                                     
      ],




      contentTrackingColumns2:[
        {
          title: `${this.$store.getters.getTranslation.IntvtID_2_715}`,
          dataIndex: 'intvtmlID',
          key: 'intvtmlID',
        },
        {
          title: 'Lot',
          dataIndex: 'lot',
          key: 'lot',
        },
        {
          title: `${this.$store.getters.getTranslation.Packa_1_717}`,
          dataIndex: 'package',
          key: 'package',
        }, 
        {
          title: `${this.$store.getters.getTranslation['Sub-P_1_718']}`,
          dataIndex: 'subPackage',
          key: 'subPackage',
        },
        {
          title: `${this.$store.getters.getTranslation.ContaID_2_719}`,
          dataIndex: 'containerID',
          key: 'containerID',
        },
        {
          title: `${this.$store.getters.getTranslation.Descr_1_69}`,
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: `${this.$store.getters.getTranslation.Tempe_1_605}`,
          dataIndex: 'temperature',
          key: 'temperature',
        },                                        
      ],
      collections:[],
      projectId:this.projId,
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
      qPStatusData:{},
      btnLoading: false,
      showEmailModal: false,
      body: null,
      checkboxValuesda:[],   
      outputArray:[] , 
      isAllreadyFill:false,
      showInventoryModal: false,
      customDisplayDataMRI,
      contentTracking,
      contentTracking2,
      contentTrackingQA,
      customDisplayDataReleaseBy,
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


      //   this.contentTrackingColumns2[0].title=newValues.IntvtID_2_715
      //   // this.contentTrackingColumns2[1].title=newValues
      //   this.contentTrackingColumns2[2].title=newValues.Packa_1_717
      //   this.contentTrackingColumns2[3].title=newValues['Sub-P_1_718']
      //   this.contentTrackingColumns2[4].title=newValues.ContaID_2_719
      //   this.contentTrackingColumns2[5].title=newValues.Descr_1_69
      //   this.contentTrackingColumns2[6].title=newValues.Tempe_1_605


      //   this.contentTrackingColumns[0].title=newValues.ContaID_2_719
      //   // this.contentTrackingColumns2[1].title=newValues
      //   this.contentTrackingColumns[1].title=newValues.MonitID_2_714
      //   this.contentTrackingColumns[2].title=newValues.Tempe_1_605
      //   this.contentTrackingColumns[3].title=newValues.InAlarm_2_716
      //   this.contentTrackingColumns[4].title=newValues.TampeSeal_2_720


      //   this.customDisplayDataShipInfo[0].title=newValues.ReceiInsti_2_728
      //   this.customDisplayDataShipInfo[1].title=newValues.Consi_1_729
      //   this.customDisplayDataShipInfo[2].title=newValues.AdditInfor_2_751
      //   this.customDisplayDataShipInfo[3].title=newValues.PlannDate_4_731
      //   this.customDisplayDataShipInfo[4].title=newValues['CouriName:_2_732']
      //   this.customDisplayDataShipInfo[5].title=newValues.ShippTempe_2_733
      //   this.customDisplayDataShipInfo[6].title=newValues.CouriPhone_2_734
      //   this.customDisplayDataShipInfo[7].title=newValues['Initiby:_2_661']
      //   this.customDisplayDataShipInfo[8].title=newValues['Date:_1_664']






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
    this.getQPDataFilled(this.samplePuid)
    this.getTranslationData()
    this.getQPApproval(this.sampleId)
  },   
  methods: {
    _getFormatMoment,
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


      //   this.contentTrackingColumns2[0].title=this.translation.IntvtID_2_715
      //   // this.contentTrackingColumns2[1].title=newValues
      //   this.contentTrackingColumns2[2].title=this.translation.Packa_1_717
      //   this.contentTrackingColumns2[3].title=this.translation['Sub-P_1_718']
      //   this.contentTrackingColumns2[4].title=this.translation.ContaID_2_719
      //   this.contentTrackingColumns2[5].title=this.translation.Descr_1_69
      //   this.contentTrackingColumns2[6].title=this.translation.Tempe_1_605

      //   this.contentTrackingColumns[0].title=this.translation.ContaID_2_719
      //   // this.contentTrackingColumns2[1].title=newValues
      //   this.contentTrackingColumns[1].title=this.translation.MonitID_2_714
      //   this.contentTrackingColumns[2].title=this.translation.Tempe_1_605
      //   this.contentTrackingColumns[3].title=this.translation.InAlarm_2_716
      //   this.contentTrackingColumns[4].title=this.translation.TampeSeal_2_720

      //   this.customDisplayDataShipInfo[0].title=this.translation.ReceiInsti_2_728
      //   this.customDisplayDataShipInfo[1].title=this.translation.Consi_1_729
      //   this.customDisplayDataShipInfo[2].title=this.translation.AdditInfor_2_751
      //   this.customDisplayDataShipInfo[3].title=this.translation.PlannDate_4_731
      //   this.customDisplayDataShipInfo[4].title=this.translation['CouriName:_2_732']
      //   this.customDisplayDataShipInfo[5].title=this.translation.ShippTempe_2_733
      //   this.customDisplayDataShipInfo[6].title=this.translation.CouriPhone_2_734
      //   this.customDisplayDataShipInfo[7].title=this.translation['Initiby:_2_661']
      //   this.customDisplayDataShipInfo[8].title=this.translation['Date:_1_664']

        
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
       getQPData(id)
       {
        QPProcessServices.getByProjectId(id).then((response)=>{
            this.collections = response.data
            this.checkboxValuesda=new Array(response.data.length).fill(false)
        })
       },
       getQPApproval(id){
        QPStatusServices.getBySample(id).then((response)=>{
          this.qPStatusData=response.data
        })
       },
       getQPDataFilled(id)
       {
        SampleQPProcessServices.getBySampleId(id).then((response)=>{
          if(isEmpty(response.data)){
            this.getQPData(this.projectId)
          }
          else{
            this.collections = response.data
            this.isAllreadyFill = true
            this.checkboxValuesda=new Array(response.data.length).fill(false)
          }
        })
       },

       handleCheckboxChange(id, value) {
        this.checkboxValuesda[id] = value;
        console.log(this.checkboxValuesda)
    },
    onSubmit(e) {
        
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
             // console.log(values)
             const data = JSON.parse(JSON.stringify(this.collections))
            if(values.length!==undefined){
              for (const question of data) {
                const id = question.id
                const action = values.collection[`id-`+question.id].collect !== undefined ? values.collection[`id-`+question.id].collect :false
                const notes =  values.collection[`id-`+question.id].notes !== undefined ? values.collection[`id-`+question.id].notes : null
                const qPProcessName = question.question
                const sampleId = this.sampleId
                const samplePUID = this.samplePuid
                const sampleName = this.sampleName
                this.outputArray.push({
                  notes,
                  action,
                  id,
                  qPProcessName,
                  sampleId,
                  samplePUID,
                  sampleName,
                })
              // console.log(this.outputArray)
              }
            }

          

          if ((this.typeId === 'inbound')) {
            
            this.showInventoryModal=true
          }
          if (this.typeId === 'outbound') {
            this.handleActiveTab('COURIER')
            this.loading = true
            // if(this.outputArray.length>0){
              // SampleQPProcessServices.create(this.outputArray).then((response)=>{
                this.outputArray = []
              // }).catch(this.error).finally(this.loading = false)
            // }
            const request = JSON.parse(JSON.stringify({sampleId: this.samplePuid}))
            SampleServices.update(request).then((response)=>{
            }).catch(this.error)
          } 
          if(this.typeId === 'QP_SK_PROCESS')
          {
            this.handleActive('isSubmit')
            const request = JSON.parse(JSON.stringify({sampleId: this.samplePuid}))
            SampleServices.update(request).then((response)=>{
            // 
            }).catch(this.error)
            
            
            // this.$emit('handleActive',true)
          }
        }
        })
        // this.loading = false
      },
      handleActive(out){
        this.$emit('handleActive',true, out, this.stageId+1 )
      },
      handleActiveTab(out){
        this.$emit('handleActiveTab',out,this.stageId+1 )
        const obj=this.$route.query.record
        this.goto('/inventory/treatment/outboundProcess?view=COURIER&record='+obj)
        
      },
      submitProcess(){
        this.loading = true
            SampleQPProcessServices.create(this.outputArray).then((response)=>{
                this.outputArray = []
              }).catch(this.error).finally(this.loading = false)
      },
      handleInventorygModal(){
      this.showInventoryModal=false
    },
    handleInventoryOk(){
      /* if(this.inboundCheck===true){
        this.showQuaranitineModal=true
        this.showInventoryModal=false
      }else{ */
        this.loading = true
        const request = JSON.parse(JSON.stringify({sampleId: this.samplePuid}))
            SampleServices.update(request).then((response)=>{
            }).catch(this.error)
        /* SampleQPProcessServices.create(this.outputArray).then((response)=>{
            this.outputArray = []
          }).catch(this.error).finally(this.loading = false) */
        this.showInventoryModal=false
        const obj=JSON.stringify(this.$route.query.record)
        console.log(obj)
        this.goto('/inventory/storage/ColorFridge?inbound=true&record='+obj)
      // }
    },
    printWindow(){
      window.print()
    },
    
  },
}
  
  
  </script>