<template>
    <page-layout
      :loading="false"
      class="specific container smartlab_task_inner"
      :create="false"
    >
      <template slot="content">
        <div class="grey-card">
          <div class="patient-details-page" style="margin: 2%; margin-top: 0">
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
                      Kit ID: {{record.patientEnrollmentNumber}}
                    </figcaption>
                  </figure>
                </a-card>
              </a-col>
              <a-col :span="18">
                <a-card :bordered="false" class="default-card details-section">
                  <article class="article">
                    <h2 class="heading pl-0">
                      Dispatch Details
                    </h2>
                  </article>
                  <div>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            Hospital Name:
                          </span>
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6>
                          <span> {{record.hospital}}</span>
                        </h6>
                      </a-col>
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted"
                            >Treatment Type:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6><span>Human Cells</span></h6>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            {{ translation.Email_1_511 }}:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6>
                          <span> {{record.email}}</span>
                        </h6>
                      </a-col>
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted"
                            >Ref:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6><span>TAC8838G</span></h6>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            {{ translation.Phone_1_63 }}:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6><span> +44 289 6655</span></h6>
                      </a-col>
                    </a-row>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
          <a-card
            :bordered="false"
            class="mt-15 default-card inbound-accept-tabs tabs_body"
            style="width: 96%; margin-left: 2%"
          >
            <span>
              <!-- //Steps -->
              <div class="treatment-steps" style="width: 100%">
                <span class="step-col-large">
                  <a-steps size="small" :current="2">
                    <a-step
                      v-for="phase in phases"
                      :key="phase.id"
                      :title="phase.name"
                      :class="
                        phase.id == 1
                          ? 'ant-steps-item-finish-large'
                          : phase.id == 2
                          ? 'ant-steps-item-active-blue-large'
                          : 'ant-steps-horizontal-large'
                      "
                      :status="
                        phase.id == 1 ? 'finish' : phase.id == 2 ? 'wait' : ''
                      "
                      @click="reDirect(phase.id===2? phase.url_slug+'?record='+JSON.stringify(record) : '', phase.alias)"
                    />
                  </a-steps>
                </span>
              </div>
              <!-- //Steps -->
            </span>
          </a-card>
  
          <a-card
            v-if="activeTab == 'KIT_BUILDER'"
            :bordered="false"
            class="mt-15 default-card inbound-accept-tabs"
            style="width: 96%; margin-left: 2%"
          >
            <div><h4 class="heading pl-0"><strong>Pick List</strong></h4></div>
            <div class="collection-processing-steps" style="margin-top:10px">
                <a-form :form="form" layout="horizontal">
                    <a-table
                        :columns="columns"
                        :row-key="(record) => record.id"
                        :data-source="pickList"
                        :pagination="false"
                        :loading="loading"
                        class="borderless-table rounded-table"
                    >
                        <template slot="collected" slot-scope="item, row">
                        <!-- {{ row }} -->
                        <a-form-item class="mt-5" style="height: 20px;">
                            <a-switch
                            v-if="!row.isCollected"
                            v-decorator="[
                                `collection[id-${row.id}][collect]`,
                                {
                                initialValue: row.isCollected,
                                valuePropName: 'checked',
                                rules: [
                                    {
                                    required: false,
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
                        <template slot="notes" slot-scope="item, row" >
                        <a-form-item class="mtminus-2" style="height: 20px;">
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
                        <template slot="itemName" slot-scope="itemName, row" >
                            <div :style="getColor(row.color)" style="display: flex; align-items: left;">
                                <a-col style="height: 60px;">
                                    <div style="display: flex; align-items: center; padding-left: 10px; height: 60px;">
                                        <img :src="getImageUrl(row.url)" style="height: 60px; width: 60px; padding-left: 5px;">
                                        <span style="margin-left: 10px; margin-top: -2px;">{{ row.item }}</span>
                                    </div>
                                </a-col>
                            </div>
                        </template>
                        <template slot="serialNo" slot-scope="serialNo, row" >
                            <div class="mtminus-2">{{ row.serialNo }}</div>
                        </template>
                        <template slot="expiryDate" slot-scope="expiryDate, row" >
                            <div class="mtminus-2">{{ row.expiryDate }}</div>
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
            </div>
          </a-card>
        </div>
      </template>
    </page-layout>
  </template>
  
  <script>
  import moment from 'moment'
  import PageLayout from '~/components/layout/PageLayout'
  import { KIT_COLLECTION_PHASES } from '~/services/Constant/Phases'
  import tabsHelpers from '~/mixins/tabs-helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import { isEmpty } from '~/services/Helpers'
  import StepServices from '~/services/API/StepServices'
  import imagesHelper from '~/mixins/images-helper'
  export default {
    components: {'page-layout': PageLayout},
    mixins: [tabsHelpers, routeHelpers,imagesHelper],
    middleware: 'auth',
    data() {
      return {
        moment,
        btnLoading: false,
        loading: false,
        buttonEnable: false,
        notesRequired: {},
        noteItem:[],
        columns: [
            {
            title: `Items`,
            dataIndex: 'item',
            width: '30%',
            scopedSlots: { customRender: 'itemName' },
            },
            {
            title: `Serial No.`,
            dataIndex: 'serialNo',
            key:'serialNo',
            scopedSlots: { customRender: 'serialNo' },
            },
            {
            title: `Expiry Date`,
            dataIndex: 'expiryDate',
            key:'expiryDate',
            scopedSlots: { customRender: 'expiryDate' },
            },
            {
            title: `${this.$store.getters.getTranslation.Notes_1_350}`,
            dataIndex: 'notes',
            scopedSlots: { customRender: 'notes' },
            },
            {
            title: `Scanned`,
            dataIndex: 'collected',
            scopedSlots: { customRender: 'collected' },
            },
        ],
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
            name: 'bagCollectionProcess',
        }),
        activeTab: 'KIT_BUILDER',
        type: 'inbound',
        phases: KIT_COLLECTION_PHASES,
        record:{},
        pickList: [
        {
          id: 1,
          item: 'Tubes',
          serialNo: '12345',
          expiryDate: '14/09/2025',
          color:'#F5636342',
          url:'web/inventory/tubes.svg',
        },
        {
          id: 2,
          item: 'Needles',
          serialNo: '234567',
          expiryDate: '14/08/2025',
          color:'#2F78E3',
          url:'web/inventory/needles.svg',
        },
        {
          id: 3,
          item: 'Masks',
          serialNo: '352683',
          expiryDate: '14/07/2025',
          color:'#FFFBD4',
          url:'web/inventory/masks.svg',
        },
        {
          id: 4,
          item: 'Plasters',
          serialNo: '837582',
          expiryDate: '14/10/2025',
          color:'#CDF4DC',
          url:'web/inventory/plaster.svg',
        },
        {
          id: 5,
          item: 'Gloves',
          serialNo: '374826',
          expiryDate: '14/12/2024',
          color:'#FFDBB0',
          url:'web/inventory/gloves.svg',
        },
        {
          id: 6,
          item: 'Liquid bags',
          serialNo: '836837',
          expiryDate: '14/06/2025',
          color:'#98DCBC',
          url:'web/inventory/liquid.svg',
        },
        {
          id: 7,
          item: 'Antiseptic wipes',
          serialNo: '264725',
          expiryDate: '14/09/2025',
          color:'#D06DFF42',
          url:'web/inventory/antiseptic.svg',
        },
        {
          id: 8,
          item: 'Containers',
          serialNo: '284612',
          expiryDate: '14/09/2025',
          color:'#D298FF',
          url:'web/inventory/container.svg',
        },
        {
          id: 9,
          item: 'Labels',
          serialNo: '987653',
          expiryDate: '14/09/2025',
          color:'#FFA9A9',
          url:'web/inventory/label.svg',
        },
      ],
      filledData:0,
        
        promptMessage:`${this.$store.getters.getTranslation.Pleasinput_4_578}`,
        
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.handleActiveTab()
      // this.getTranslationData()
      this.$store.commit('setSelectedMenu', [`2`])
      // this.getSteps()
    },
    methods: {
      handleActiveTab() {
        this.activeTab = this.$route.query.view
        // this.record= this.$route.query.record
        const obj=this.$route.query.record
        this.record=JSON.parse(obj)
        console.log(this.record)
        if (this.record && this.record.projectId) {
          this.getSteps(this.record.projectId);
        }
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
    getColor(color){
        return {
          backgroundColor: color, // Set another background color for a different condition
          height: '60px',
          borderRadius: '10px',
          marginLeft:'20px'
        };
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
    submit() {
      this.form.validateFields((err,values)=>{
        if(!err){
          console.log(this.$route.query.record)
          
          // console.log(this.typeId)
          if ((this.typeId === 'inbound')) {
            this.showInventoryModal=true
          }
          if (this.typeId === 'outbound') {
            this.showSchedulingModal=true
          }
        }else{
          if(this.typeId==='inbound'){
            this.inboundCheck=true
            this.showInventoryModal=true
            // this.showQuaranitineModal=true
          }
          if(this.typeId!=='inbound'){
            this.error()
          }
          
          // console.log(this.typeId)
          // alert("You have missed the option(s) 'No'. Do you want to quarantine the sample?")
        }
      })
    },
      getSteps(projectId){
          console.log(this.dummyCollection)
          StepServices.getByProjectId(projectId).then((response) => {
              console.log(response)
              this.dummyCollection=response.data
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
      setActiveTav(tab) {
        this.activeTab = tab
      },
      reDirect(url, alias) {
        if (!isEmpty(url)) {
          this.activeTab = alias
          this.goto(url)
        }
      },
    },
  }
  </script>
  <style scoped>
  .borderless-table {
    border: none; /* Remove the border */
  }
  </style>
  