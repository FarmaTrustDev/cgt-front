<template>
    <div class="ant-card">
      <div class="ant-card-body  bg-grey"> 
        <a-row>
                  <a-col :span="12">
                    <a-form-item 
                    label="Sample Name *:"
                    class="selChange"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    >
                      <a-input
                        v-decorator="[
                          'sampleName',
                          {
                            initialValue: entity.name,
                            rules:[
                              {
                                required: true,
                                message: 'Please enter name'
                              },
                            ],
                          }
                        ]"
                        placeholder="Sample Name"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item class="selChange"
                        label="Ideal Temperature *:"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"
                    >
                    <a-select :getPopupContainer="trigger => trigger.parentNode"
                        v-decorator="[
                            'idealTemperature',
                            {
                            initialValue: entity.idealTemprature,
                            rules: [
                                {
                                required: true,
                                message: 'Please select ideal temperature',
                                },
                            ],
                            },
                        ]"
                        :show-search="true"
                        :filter-option="filterOption"
                        @search="handleSearch"
                        placeholder="Ideal Temperature"
                        class="selOther"
                        >
                        <!-- @change = "(id) => getLocations(id)" -->
                        <a-select-option v-for="fridgeType in temperatures" :key="fridgeType.name">
                            {{ fridgeType.name }}
                        </a-select-option>
                    </a-select>
            </a-form-item>
            </a-col>
                </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Expiry Date *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                >
          <a-date-picker 
            v-decorator="[
              'expiryDate',
              {
                initialValue: entity.expiryDate,
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disablePreviousDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Quantity *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'quantity',
                {
                    initialValue: entity.quantity,
                    rules: [
                    {
                        required: true,
                        message: 'Required Quantity',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Quantity"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Arrival Date *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    
                >
          <a-date-picker
            v-decorator="[
              'arrivalDate',
              {
                initialValue: entity.arrivalDate,
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disableFutureDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Project *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <!-- <a-select
                v-decorator="[
                    projectId,
                    
                ]"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Project"
                size="large"
                class="default-select"
                style="max-width: 100%"
                @click="cancelSelectProjectModel(true)"
                >
                <a-select-option v-for="project in projects" :key="project.id">
                  {{ project.description }}
                </a-select-option>
              </a-select> -->
              <a-input
              v-decorator="[
                'projectId',
                {
                    initialValue: projectId,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your project',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input
              v-decorator="[
                'projectName',
                {
                    initialValue: selectedProject,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your project',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedProject"
                placeholder="Project"
                size="large"
                style="max-width: 100%"
                @click="projectModal(true)"
                />
                <span v-if="projectRequired" class="color-red">Please select your project</span>
            </a-form-item>
          </a-col> 
        </a-row>       
        <a-row>
          <a-col :span="12">
                <a-form-item class="selChange"
                label="Donor *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'donorId',
                    {
                    initialValue: entity.patientId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your patient',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Patient"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="patient in donors" :key="patient.id">
                  {{ patient.name }}
                </a-select-option>
                </a-select>
                <!-- v-model="patientId" -->
                <!-- :value="selectedPatient" -->

                <!-- @click="cancelSelectPatientModel(true)" -->
                <!-- <span v-if="patientRequired" class="color-red">Please select patient</span> -->
            </a-form-item>
          </a-col>
            <a-col :span="12">
              <a-form-item class="selChange"
                label="Production Line *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'location',
                    {
                    initialValue: entity.locationId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your location',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Location"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="location in locations" :key="location.name">
                    {{ location.name }}
                </a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Collected At *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    
                >
                <a-time-picker
        v-decorator="[
          'collectedAt',
          {
            rules: [
              {
                required: true,
                message: ' select your Collection time',
              },
            ],
          },
        ]"
        use12-hours
        style="width: 100%"
        size="large"
        format="h:mm A"
      >
      </a-time-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
                    <a-form-item 
                    label="Equipment Name *"
                    class="selChange"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    >
                     <a-select
                     :getPopupContainer="trigger => trigger.parentNode"
                        v-decorator="[
                            'equipmentName',
                            {
                            initialValue: entity.equipmentName,
                            rules: [
                                {
                                required: true,
                                message: 'Please select equipment',
                                },
                            ],
                            },
                        ]"
                        :show-search="true"
                        :filter-option="filterOption"
                        placeholder="Equipment"
                        class="selOther"
                     >
                     <a-select-option v-for="equip in equipments" :key="equip.name">
                            {{ equip.name }}
                        </a-select-option>
                     </a-select>

                    </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                    <a-form-item 
                    label="Collected By *"
                    class="selChange"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    >
                      <a-input
                        v-decorator="[
                          'collectedBy',
                          {
                            initialValue: entity.collectedBy,
                            rules:[
                              {
                                required: true,
                                message: 'Please enter name'
                              },
                            ],
                          }
                        ]"
                        placeholder="Collected By"
                      />
                    </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Collection Date *"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    
                >
          <a-date-picker
            v-decorator="[
              'collectionDate',
              {
                initialValue: entity.dateReceived,
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disableFutureDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
        </a-row>
      </div>
      <div>
  </div>
  <a-modal 
  :visible="visibleProjedModal"
  title="Select Project"
  :dialog-style="{ top: '20px'}"
  :width="600"
  @cancel="projectModal(false)"
  >
  <a-table 
  :columns="columnsProject"
  :data-source="projects"
  :row-key="(record)=> record.id"
  class="rounded-table"
  :width="750"
  :loading="loading"
  :show-header="false"
  :custom-row="getProjectId"
  :pagination="{
      defaultPageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20', '30'],
    }"
  >
  <template slot="partners" slot-scope="partners">
    <span v-for="partner in partners.partners" :key="partner.partnerId">({{ partner.partnerName }})</span>
  </template>
  <template slot="investigators" slot-scope="investigators">
    <span v-for="investigator in investigators.investigators" :key="investigator.investigatorId">({{ investigator.investigatorName }})</span>
  </template>
  </a-table>
    <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
      <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
          </a-radio-group> -->
  </a-modal>
    </div>
  </template>
  <script>
 
 import ProjectServices from '~/services/API/ProjectServices'
 import DonorServices from '~/services/API/DonorServices'
 import { filterOption} from '~/services/Helpers'
 import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
 import { _disabledFutureDate,_disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
  export default {
    // components: { ErrorModal },
    mixins: [nullHelper,notifications,routeHelpers],
    props: {
      entity: {
        type: Object,
        default: () => ({}),
      },
      form: {
        type: Object,
        default: () => ({}),
      },
      projectRequired :{type: Boolean, default : false},
    },
    data() {
      
      return {
        projects:[],
        visibleProjedModal: false,
        projectId: 0,
        donorName: '',
        selectedProject: '',
        donors:[],
        loading: false,
        columnsProject: [
          {
            title: 'Project Name',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Partners',
            key: 'partners',
            scopedSlots: {customRender: 'partners'},
          },
          {
            title: 'Investigators',
            key: 'investigators',
            scopedSlots: {customRender: 'investigators'},
          },
        ],
        temperatures:[
            {
                id: 1,
                name : '-20°C'
            },
            {
                id: 2,
                name : '-80°C'
            },
            {
                id: 3,
                name : 'LN2°C'
            },
        ],
        equipments:[
            {
                id: 1,
                name: 'Freezer Atara 001'
            },
            {
                id: 2,
                name: 'Freezer Atara 002'
            },
            {
                id: 3,
                name: 'Freezer Atara 003'
            },
            {
                id: 4,
                name : 'Freezer Atara 004'
            },
            {
                id: 5,
                name: 'Freezer Baystate 001'
            },
            {
                id: 6,
                name: 'Freezer Baystate 002'
            },
            {
                id: 7,
                name:'Freezer Baystate 003'
            },
            {
                id: 8,
                name: 'Freezer Baystate 004'
            },
            {
                id: 9,
                name:'Freezer Bayer 001'
            },
            {
                id: 10,
                name: 'Freezer Bayer 002'
            },
            {
                id: 11,
                name: 'Freezer Bayer 003'
            },
            {
                id: 12,
                name: 'Freezer Bayer 004'
            },
        ],
        locations:[
            {
                id: 1,
                name:'Cellfuse Germany Site - 01'
            },
            {
                id: 2,
                name: 'Cellfuse US Site - 01'
            },
            {
                id: 3,
                name: 'Cellfuse UK Site - 01'
            }
        ]
      }
    },
    computed: {
      
      translation() {
        return this.$store.getters.getTranslation
      },
      users() {
        return this.$store.getters.getUser
      },
    },
    watch:{
     
    },
    mounted() {
        this.fetch()
        this.getDonors()
    },
    methods: {
        filterOption,
        disableFutureDate: _disabledFutureDate,
        disablePreviousDate: _disabledPreviousDate,
        fetch() {
        ProjectServices.get()
          .then((response) => {
            this.projects = response.data
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
      projectModal(e){
        this.visibleProjedModal  = e
      },
      getProjectId(record){
      return {
        on: {
          click: (event) => {
            this.projectId = record.id
            this.selectedProject = record.description
            // this.projectRequired = false
            this.projectModal(false)
            this.$emit('projRequired',false,record.id)
          },
        },
      }
    },
    handleSearch(value) {
      fetch(value, data => (this.data = data));
    },
    getDonors(){
        DonorServices.get().then((response)=>{
            this.donors = response.data
        }).catch(this.error)
    },
    }
  }
  </script>
  