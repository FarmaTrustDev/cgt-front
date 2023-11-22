<template>
    <PageLayout :create="false" title="Add Steps to Project">
      <div slot="content">
        <a-form :form="form" >
          <div class="bd-r-5">
            <a-row class="bg-grey pt-2">
              <a-col :span="24" class="ml-10">
                <a-form-item
                  label="Study/Project Name "
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 18 }"
                  class="pt-3"
                >
                  <a-input disabled
                    v-decorator="[
                      'projectName',
                      {
                        initialValue: processName,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your project name',
                          },
                          {
                            message: 'Please enter a valid name',
                          },
                        ],
                      },
                    ]"
                    style="background-color: white"
                    placeholder="Project Name"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" class="ml-10">
                <a-form-item
                  label="Project Task "
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 18 }"
                  class="pt-3"
                >
                  <a-input disabled
                    v-decorator="[
                      'taskName',
                      {
                        initialValue: taskName,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your Task Name',
                          },
                          {
                            message: 'Please enter a valid name',
                          },
                        ],
                      },
                    ]"
                    style="background-color: white"
                    placeholder="Task Name"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            

          </div>
        </a-form>
        <a-form :form="stepForm" @submit="onSubmitStep" v-if="show && isCreated">
          <a-row >
            <a-form-item>
              <a-input
                type="hidden"
                v-decorator="[
                  'projectId',
                  {
                    initialValue: processId,
                  },
                ]"
              />
            </a-form-item>
          </a-row>
          <a-row class="bg-grey pt-2">  
            
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="New QP Step"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 18 }"
                class="ml-10"
              >
                <a-input
                  v-decorator="[
                    'question',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your step name',
                        },
                        {
                          message: 'Please enter a step name',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Step Name"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>  
            <a-col>
              <a-form-item>
                <FormActionButton custom-text="Add Step" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
        <a-row >
            <a-col :span="24">
            <div v-for="(step, index) in steps" :key="index">
                <div class="bg-grey pt-20 pb-10 mt-10 pl-2 min-height">
                {{ step.question }}
                </div>
            </div>
            </a-col>
        </a-row>
        <a-row >
            <a-col :span="24">
                <a-form-item class="text-right mt-20">
                    <a-button type="primary" @click="goto('/project')">Submit</a-button>
                </a-form-item>
            </a-col>
        </a-row>
        
      </div>
    </PageLayout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout.vue'
  import { preventDefault } from '~/services/Helpers'
  import ProjectServices from '~/services/API/ProjectServices'
  // import StepServices from '~/services/API/StepServices'
  import QPProcessServices from '~/services/API/QPProcessServices'
  import routeHelpers from '~/mixins/route-helpers'
  // import {success} from '~/services/Helpers/notifications'
  export default {
    components: {
      PageLayout,
    },
    mixins: [routeHelpers],
    data() {
      return {
        ticket: {
          type: Object,
          default: () => ({}),
        },
        visibleAddSoftware: false,
        softwareticket: {},
        isCreated: false,
        visible: false,
        show: true,
        loading: false,
        form: this.$form.createForm(this, { name: 'processForm' }),
        stepForm: this.$form.createForm(this, { name: 'stepForm' }),
        softwares: [],
        equipments: [],
        visibleAddEquipment: false,
        dummyData: [],
        steps: [],
        isCreatedSoftware: false,
        isCreatedEquipment: false,
        columns: [
          {
            title: 'Equipment Name',
            dataIndex: 'equipmentName',
            key: 'equipmentName',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            },
          },
        ],
        softwareColumns: [
          {
            title: 'Software Name',
            dataIndex: 'softwareName',
            key: 'softwareName',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            },
          },
        ],
        processId: '',
        processName:'',
        taskName:'',
        taskId:'',
        sopList: []
      }
    },
    watch: {
      step(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.steps = newValue
        }
      },
    },
    mounted() {
      // this.fetchSoftware()
      // this.fetchEquipments()
      // this.getSOP()
      const id = this.$route.query.id
      if (id !== undefined) {
        this.isCreated = true
        this.getProcessById(id)
      }
    },
    methods: {
      preventDefault,
      /* onSubmitEquipment(e) {
        e.preventDefault()
        this.loading = true
        this.equipmentForm.validateFields((err, values) => {
          if (!err) {
            if(this.isCreatedEquipment){
              EquipmentServices.updateEquipment(values).then((response)=>{
                success(this, { message: response.data })
                  this.fetchEquipments()
                  this.loading = false
              }).catch(this.error)
            }else{
              EquipmentServices.create(values)
                .then((response) => {
                  success(this, { message: response.data })
                  this.fetchEquipments()
                  this.loading = false
                })
                .catch(this.error)
            }
          }
        })
      }, 
      onSubmitSoftware(e) {
        e.preventDefault()
        this.loading = true
        if(this.isCreatedSoftware){
          this.softwareForm.validateFields((err, values) => {
          if (!err) {
            SoftwareServices.updateSoftware(values).then((response)=>{
              this.fetchSoftware()
            }).catch(this.error).finally(this.loading = false)
          }
        })
        }
        else{
          this.softwareForm.validateFields((err, values) => {
            if (!err) {
              SoftwareServices.create(values)
                .then((response) => {
                  success(this, { message: response.data })
                  this.fetchSoftware()
                  this.loading = false
                })
                .catch(this.error)
            }
          })
        }
      }, */
      visibleModel(e) {
        this.visible = e
      },
      addEquipmentModel(e) {
        this.visibleAddEquipment = e
      },
      addSoftwareModel(e) {
        this.visibleAddSoftware = e
      },
      showStep(e) {
        this.show = e
      },
      /* onSubmit(e) {
        this.loading = true
        e.preventDefault()
        if (!this.isCreated) {
          this.form.validateFields((err, values) => {
            if (!err) {
              ProcessServices.create(values).then((response) => {
                this.loading = false
                this.processId = response.data.id
                this.goto('/project/newProcess?id=' + response.data.globalId)
                this.isCreated = true
              })
                  }
              })
          }
          if(this.isCreated){
              this.form.validateFields((err,values)=>{
                  if(err){
                     if(values.softwareId !== undefined){
                      const formData = new FormData()
                          formData.append('processId', this.processId)
                          formData.append('softwareId', values.softwareId)
                          ProjectSoftwareServices.create(formData).then((response)=>{
                              
                          }).catch(this.error)
                      }
                          if(values.equipmentId !== undefined){
                              const equipmentData = new FormData()
                              equipmentData.append('processId', this.processId)
                              equipmentData.append('equipmentId', values.equipmentId)
                              ProjectEquipmentServices.create(equipmentData).then((response)=>{
                                  
                              }).catch(this.error)
                          }
                  }
              })
          }
          this.loading = false
      }, */
      onSubmitStep(e) {
        this.loading = true
        e.preventDefault()
        this.stepForm
          .validateFields((err, values) => {
            if (!err) {
              if (this.isCreated) {
                values.projectId = this.processId;
                values.projectName = this.processName;
                values.taskId = this.taskId;
                values.taskName = this.taskName
                QPProcessServices.create(values).then((response) => {
                  // this.showStep(false)
                  this.getByProcessId(this.processId)
                  this.loading = false
                  this.stepForm.setFieldsValue({ question: '' })
                })
              }
            }
          })
          .catch(this.error)
      },
      /* getSoftwareById(id){
        this.loading = true
        SoftwareServices.getById(id).then((resp)=>{
          this.softwareticket = resp.data
          this.isCreatedSoftware = true
        }).catch(this.error)
        .finally(this.loading = false)
      }, 
      getEquipmentById(id){
        this.loading = true
        EquipmentServices.getById(id).then((resp)=>{
          this.ticket = resp.data
          this.isCreatedEquipment = true
        }).catch(this.error)
        .finally(this.loading = false)
      },
      deleteSoftware(id){
        this.loading = true
        SoftwareServices.softDelete(id).then((resp)=>{
          success(this, { message: resp.data })
          this.fetchSoftware()
        }).catch(this.error)
        .finally(this.loading = false)
      },
      deleteEquipment(id){
        this.loading = false
        EquipmentServices.softDelete(id).then((resp)=>{
          success(this, { message: resp.data })
          this.fetchEquipments()
        }).catch(this.error)
        .finally(this.loading = false)
      }, */
      getByProcessId(id) {
        QPProcessServices.getByProjectId(id).then((response) => {
          this.steps = response.data
        })
      },
      /* fetchSoftware() {
        SoftwareServices.get()
          .then((response) => {
            this.softwares = response.data
          })
          .catch(this.error)
      },
      fetchEquipments() {
        EquipmentServices.get()
          .then((response) => {
            this.equipments = response.data
          })
          .catch(this.error)
      },
      getSOP() {
        SOPServices.get().then((response) => {
          this.dummyData = response.data
        })
      }, */
      getProcessById(id) {
        ProjectServices.getById(id).then((response) => {
          this.processId = response.data.projectId
          this.processName=response.data.description
          this.taskName=response.data.taskName
          this.taskId = response.data.taskId
          this.getByProcessId(response.data.id)
        })
      },
      handleCheck(isCheck, id) {
        this.pushListArray(isCheck, id)
      },
      pushListArray(valu, rowId) {
        const a = this.sopList.includes(rowId)
        if (a === false) {
          if (valu === true) {
            this.sopList.push(rowId)
          }
        } else if (valu === false) {
          this.sopList.splice(this.sopList.indexOf(rowId), 1)
        }
        // console.log(this.sopList)
      },
      createProjectSoftware(){
          // 
      },
      /* completeProcess(){
          if(this.isCreated){
              this.loading = true
          const data = JSON.parse(JSON.stringify({processId: this.processId, sops: this.sopList}))
          // const formData = new FormData()
          // formData.append('sops',[this.sopList])
          // formData.append('processId', this.processId)
          ProjectSOPServices.create(data).then((response)=>{
              this.loading = false
              this.goto('/project')
          }).catch(this.error)
          }
      } */
    },
  }
  </script>
  