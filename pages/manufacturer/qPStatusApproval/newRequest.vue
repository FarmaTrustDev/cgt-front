<template>
    <div>
    <a-table class="rounded-table" :loading="loading" :columns="column" :data-source="data">
        
        <template slot="action" slot-scope="action, index">
          <!-- {{ steps }} -->
          <a-button type="primary" @click="fetchBags(index.treatment.id, index.treatment.globalId)" >Review Steps</a-button>
        </template>
        
    </a-table>
    <a-modal
          :visible="visibleReason"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="reasonModal(false,false)"
        >
        <a-form :form="form" @submit="onSubmitReason">
          <a-row>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="Reason"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'reason',
                    {
                     
                      rules: [
                        {
                          required: true,
                          message: 'Please input your reason',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Reason"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="loading" custom-text="Submit" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
        </a-modal>
        <a-modal
        :visible="visibleStepModal"
        :loading = "loading"
        :width = "800"
        @cancel="stepModal(false)"
        >
        <a-tabs :active-key="activeTab" type="card" @change="callback">
        <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
          <Process
            :collections="bag.collection"
            :bag-id="bag.puid"
            :bag-key-id="bag.id"
            :treatment="entity"
            @fetchBags="fetchBags"
          />
          <div class="text-right mt-15">
            <!-- <a-button type="primary" @click="completeBag(bag)"
              >Complete Sample( #{{ bag.puid }})</a-button
            > -->
            <a-button
              v-if="!bag.isCollectionCompleted"
              type="primary"
              @click="completeBag(bag)"
              >{{translation.ComplThis_3_526}}</a-button
            >
          </div>
        </a-tab-pane>
        </a-tabs>
              <template slot="footer" >
                <!--  -->
            <a-button style="background-color:#4CAF50; color:white" @click="submitStatus(approved)" dashed>
                        Approve
                    </a-button>
                    <!-- -->
                    <a-button type="danger" dashed  @click="reasonModal(true, rejected)"
                    >
                        Reject
                    </a-button>
                    <!--  -->
                    
        </template>
        </a-modal>
    </div>
</template>
<script>
  import TreatmentBagServices from '~/services/API/TreatmentBagServices'
  import { COLLECTION_TYPE } from '~/services/Constant'
  import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import Process from '~/components/treatment/collections/bag/Process'
  import userDetail from '~/mixins/user-detail'
  import { isEmpty } from '~/services/Utilities'
  import SchedulingServices from '~/services/API/SchedulingServices'
  import {
    _getPastMomentStandardFormatted,
    _getFutureMomentStandardFormatted,
  } from '~/services/Helpers/MomentHelpers'
  import { SCHEDULING_STATUSES } from '~/services/Constant'
  import TreatmentServices from '~/services/API/TreatmentServices'
  export default {
    components:{
      Process,
      // Bag
  },
  mixins: [userDetail],
  data() {
    return {
      column: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
          scopedSlots:{customRender: 'pUIDRender'}
        },
        {
          title: `Patient Name`,
          dataIndex: 'patient.name',
          key: 'patientName'
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          key: 'TreatmentName',
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          title: `${this.$store.getters.getTranslation.Organ_1_166}`,
          dataIndex: 'hospital.name',
          key: 'OrganizationName',
        },
        {
          title: `${this.$store.getters.getTranslation['Colle-_4_268']}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status',
          },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      loading: false,
      data: [],
      approved:'Approved',
      rejected: 'Rejected',
      quarantine: 'Quarantine',
      visibleReason: false,
      qPStatusId : 0,
      status: '',
      form: this.$form.createForm(this, { name: 'form' }),
      dummyCollection: [],
      COLLECTION_TYPE,
      typeId: '',
      visibleStepModal: false,
      stepGlobalId: '',
      bags: [],
      entity: {},
      activeTab: null,
      apiService: SchedulingServices,
      params: {
        manufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
        direction: 1,
      },
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user(){
      return this.$store.getters.getUser
    },
  },
  mounted(){
    this.getPending()
    this.setActiveTab()
  },
  watch:{
  },  
  methods: {
    _getFormatMoment,
    isEmpty,
    setActiveTab() {
      if (!isEmpty(this.bags)) {
        this.activeTab = this.bags[0].id
      }
    },
    callback(key) {
      this.activeTab = key
    },
    getPending(params = {}){
      if(this.user.roleName === 'CDMO'){
        SchedulingServices.getCDMOQP({ ...this.params, ...params}).then((response) => {
            this.data = response.data
        }).catch(this.error)
      }else{
        SchedulingServices.getCMCQP({ ...this.params, ...params}).then((response) => {
            this.data = response.data
        }).catch(this.error)
      }
    }, 
    submitStatus(resp){
        this.loading = true
        const values = JSON.parse(JSON.stringify({
            treatmentId : this.entity.id,
            status: resp
        }))
        if(this.user.roleName === 'CDMO'){
          TreatmentServices.updateTreatmentQPStatus(this.entity.id, values).then((response)=>{
              console.log(response.data)
              this.getPending()
              this.stepModal(false)
          }).catch(this.error).finally(this.loading = false)
        }else{
          TreatmentServices.updateCMCQPStatus(this.entity.id, values).then((response)=>{
              console.log(response.data)
              this.getPending()
              this.stepModal(false)
          }).catch(this.error).finally(this.loading = false)
        }
    },
    fetchBags(id, globalId) {
      // if (!isEmpty(this.treatment)) {
        this.fetchTreatment(globalId)
        this.loading = true
        if(this.user.roleName === 'CDMO'){
          TreatmentBagServices.getByTreatmentId(id, {
            type: COLLECTION_TYPE.cdmo.id,
          })
            .then((response) => {
              this.bags = response.data
              this.setActiveTab()
              this.visibleStepModal = true
            })
            .finally((this.loading = false))
        }else{
          TreatmentBagServices.getByTreatmentId(id, {
            type: COLLECTION_TYPE.manufacturer.id,
          })
            .then((response) => {
              this.bags = response.data
              this.setActiveTab()
              this.visibleStepModal = true
            })
            .finally((this.loading = false))
        }
      // }
    },
    fetchTreatment(id) {
      TreatmentServices.detail(id).then((treatment) => {
        this.entity = treatment.data
      })
    },
    stepModal(e){
      this.visibleStepModal = e
    },
    reasonModal(e, status){
        this.visibleReason = e
        this.status = status
        if(!e){
          this.form.resetFields()
        }
    },
    onSubmitReason(e){
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, value) => {
            if (!err) {
                const values = JSON.parse(JSON.stringify({
                    treatmentId : this.entity.id,
                    status : this.status,
                    reason : value.reason
                }))
              if(this.user.roleName === 'CDMO'){
              TreatmentServices.updateTreatmentQPStatus(this.entity.id, values).then((response)=>{
                console.log(response.data)
                this.reasonModal(false, '')
                this.stepModal(false)
                this.getPending()
                }).catch(this.error)
              }else{
                TreatmentServices.updateCMCQPStatus(this.entity.id, values).then((response)=>{
                console.log(response.data)
                this.reasonModal(false, '')
                this.stepModal(false)
                this.getPending()
                }).catch(this.error)
              }
            }
            this.loading = false
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
  },
}
</script>