<template>
    <div class="ml-35">
      
        <a-row>
        <a-col :span="12">
          <a-form-item
            label="Project Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'description',
                {
                  initialValue: entity.description,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                    { 
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Project Description"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">


          
          <a-form-item
            label="Date *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          <a-date-picker
            v-decorator="[
              'projectDate',
              {
                initialValue: entity.projectDate,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disabledDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
          
          <a-form-item
            label="Principal Investigator *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select :getPopupContainer="trigger => trigger.parentNode"
              v-decorator="[
                'investigatorId',
                {
                  initialValue: entity.investigatorId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your project investigator',
                    },
                  ],
                },
              ]"
              mode="multiple"
              :show-search="true"
              :filter-option="filterOption"
              placeholder="Principal Investigator"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="investigator in investigators" :key="investigator.investigatorId">
                {{ investigator.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          
        </a-col>
        <a-col :span="12">
          
          <a-form-item
            label="Partners *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select :getPopupContainer="trigger => trigger.parentNode"
              v-decorator="[
                'partnerId',
                {
                  initialValue: entity.partnerId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Partner',
                    },
                  ],
                },
              ]"
              mode="multiple"
              :show-search="true"
              :filter-option="filterOption"
              placeholder="Partner"
              style="width: 100%"
              size="large"
              class="default-select"
              
            >
              <a-select-option v-for="partner in partners" :key="partner.partnerId">
                {{ partner.partnerName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item class="mtm-20"
            label="Task *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select :getPopupContainer="trigger => trigger.parentNode"
              v-decorator="[
                'taskId',
                {
                  initialValue: entity.taskId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select task',
                    },
                  ],
                },
              ]"
              :show-search="true"
              :filter-option="filterOption"
              placeholder="Task"
              style="width: 100%"
              size="large"
              class="default-select "
            >
              <a-select-option v-for="task in taskData" :key="task.id">
                {{ task.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12"><a-button type="primary" style="margin-top:-70px" @click="showModal(true)">Add Investigator</a-button></a-col>
        <a-col :span="12"><a-button type="primary" style="margin-top:-70px" @click="showModal1(true)">Add Partner</a-button></a-col>

      </a-row>
      
      
      <div>
    <a-modal
      :footer="null"
      :width="750"
      title="Add Investigator"
      :destroy-on-close="true"
      :visible="visibleInv"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModal(false)"
      @ok="showModal(false)"
    >
      <a-form :form="formInvest" class="support-add-modal" @submit.prevent="onSubmitInvestigator">
        <a-form-item>
            <a-input type="hidden"
              v-decorator="[
                'investigatorId',
                {
                  initialValue: ticket.investigatorId,
                },
              ]"
            /> 
          </a-form-item>
        <a-row :gutter="20">
          <a-col :span="12">
          <a-form-item
            label="Investigator Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'investigatorName',
                {
                  initialValue: ticket.investigatorName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input investigator name',
                    },
                    {
                      message: 'Please enter a valid name'
                    }
                  ],
                },
              ]"
              placeholder="Investigator Name"
            /> 
            </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            label="Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'investigatorDescription',
                {
                  initialValue: ticket.investigatorDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Description',
                    },
                    {
                      message: 'Please enter a valid Description'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton :is-created="isCreated" custom-text="Create" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columns"
          :data-source="datasource"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchInvestigatorById(action.investigatorId)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
    <a-modal
      :footer="null"
      :width="750"
      title="Add Partner"
      :destroy-on-close="true"
      :visible="visiblePar"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModal1(false)"
      @ok="showModal1(false)"
    >
      <a-form :form="formPart" class="support-add-modal" @submit.prevent="onSubmitPartner">
        <a-form-item>
          <a-input type="hidden" v-decorator="[
                'partnerId',
                {
                  initialValue: partnerevent.partnerId,
                },
              ]"  />
        </a-form-item>
        <a-row :gutter="20">
          
        <a-col :span="12">
          <a-form-item
            label="Partner Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'partnerName',
                {
                  initialValue: partnerevent.partnerName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Name',
                    },
                    {
                      message: 'Please enter a valid Name'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'partnerDescription',
                {
                  initialValue: partnerevent.partnerDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Description',
                    },
                    {
                      message: 'Please enter a valid Description'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Email *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'email',
                {
                  initialValue: partnerevent.email,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Email',
                    },
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Phone No *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'phoneNo',
                {
                  initialValue: partnerevent.phone,
                  rules: [
                    {
                      required: true,
                      message: 'Please input phone',
                    },
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton  :loading="loading"  custom-text="Create" :is-created="isCreatedPartner" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        
        <a-table
          :columns="columnsPartner"
          :data-source="datasourcePartner"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchPartnerById(action.partnerId)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
  </div>

    </div>
  </template>
  
  <script>
  import UserServices from '~/services/API/UserServices'
  import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
  import { filterOption,isEmpty, preventDefault } from '~/services/Helpers'
  import PartnerServices from '~/services/API/PartnerServices'
  import InvestigatorServices from '~/services/API/InvestigatorServices'
  import SmartLabTasksServices from '~/services/API/SmartLabTasksServices'
  import nullHelper from '~/mixins/null-helpers'
  
  export default {
    components: {  },
    mixins: [nullHelper],
    props: {
      entity: {
        type: Object,
        default: () => ({}),
      },
      form: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      
      return {
        ticket: { 
        type: Object,
         default: () => ({}) 
        },
        partnerevent: { 
        type: Object,
         default: () => ({}) 
        },
        isCreatedPartner:false,
        isCreated:false
        ,
        datasource: [],
        taskData:[],
        columns: [
          {
            title: 'Investigator Name',
            dataIndex: 'name',
            key: 'investigatorName',
          },
          {
            title:'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourcePartner: [],
        columnsPartner: [
          {
            title:'Partner Name',
            dataIndex: 'partnerName',
            key: 'partnerName',
          },
          {
            title:'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title:'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title:'Phone No',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        visibleInv: false,
        visiblePar: false,
        entityId: null,
        userRoleId: 0,
        loading: false,
        partners:[],
        investigators:[],
        countries: [],
        roles: [],
        fetchCountry: true,
        fetchRole: true,
        formLayout: 'vertical',
        apiService: UserServices,
        formInvest: this.$form.createForm(this, {
          name: 'investCreate',
        }),
        formPart:this.$form.createForm(this, {
          name: 'partCreate',
        }),
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
      ticket(newValue, oldValue)
      {
        this.newValue = oldValue
      }
    },
    mounted() {
      this.fetchPartners()
      this.fetchInvestigator()
      this.fetchAllInvestigator()
      this.fetchAllPartnerList()
      this.fetchSmartLabTasks()
    },
    /* updated() {
      if (this.isCreated && this.fetchCountry) {
        if (this.isGuid(this.$route.params.id)) {
          this.fetch(this.$route.params.id)
          this.fetchCountry = false
        }
      }
      if (this.isCreated && this.fetchRole) {
        this.fetchRole = false
        this.getRoles()
      }
    }, */
    methods: {
      preventDefault,
      showModal(show) {
      this.visibleInv = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModal1(show) {
      this.visiblePar = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    }
    ,
      handleChange(info) {
        this.fileList = info
        this.$emit('handleChange', this.fileList)
      },
      
      fetch(id) {
        this.loading = true
        this.apiService
          .getById(id)
          .then((response) => {
            this.userData = response.data
            this.fetchPartners({ Ids: [this.userData.countryId] })
          })
          .finally(() => (this.loading = false))
      },    
      filterOption,
      disabledDate: _disabledFutureDate,
      fetchPartners(params = {}) {
        
        PartnerServices.get(params).then((response) => {
            
          this.partners = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchInvestigator(params = {}) {
        
        InvestigatorServices.get(params).then((response) => {
            
          this.investigators = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchAllInvestigator(params = {}) {
        InvestigatorServices.get(params).then((response) => {
            
          this.datasource = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchAllPartnerList(params = {}) {
        PartnerServices.get(params).then((response) => {
          this.datasourcePartner = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchInvestigatorById(id){
        InvestigatorServices.getById(id).then((response) => {
            this.ticket = response.data
            this.isCreated = true
        })
      },
      fetchPartnerById(id){
        PartnerServices.getById(id).then((response) => {
            this.partnerevent = response.data
            this.isCreatedPartner = true
        })
      },
      fetchSmartLabTasks(){
        SmartLabTasksServices.get().then((response)=>{
          this.taskData = response.data
        })
      },
      onSubmitInvestigator(e) {

      
      e.preventDefault()
      this.formInvest.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated)
          {
            this.loading = true
            InvestigatorServices.update(values.investigatorId , values).then((response)=>{
              this.visibleInv=false
            this.loading = false
              this.fetchInvestigator()
            })
          }
          else{
            this.loading = true
          InvestigatorServices.create(values).then((response)=>{
            this.visibleInv=false
            this.loading = false
            this.fetchInvestigator()
          })
        }
        } 
      })
    },
    onSubmitPartner(e) {
      
      e.preventDefault()
      this.formPart.validateFields((err, values) => {
        if (!err) {
          if(this.isCreatedPartner)
          {
            this.loading = true
            PartnerServices.update(values.partnerId , values).then((response)=>{
              this.visiblePar=false
              this.loading = false
              this.isCreated = false
              this.formPart.resetFields()
              this.fetchPartners()
            })
          }
          else{
            this.loading = true
          PartnerServices.create(values).then((response)=>{
            this.visiblePar=false
            this.loading = false
            this.formPart.resetFields()
            this.fetchPartners()
          })
        }
        } 
      })
    }
    },
  }
  </script>
  