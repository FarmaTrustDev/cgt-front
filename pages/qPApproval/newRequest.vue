<template>
    <div>
    <a-table class="rounded-table" :loading="loading" :columns="column" :data-source="data">
        <template slot="arrivalDate" slot-scope="arrivalDate">
            {{ _getFormatMoment(arrivalDate.arrivalDate).format('DD/MM/YYYY') }} - {{ _getFormatMoment(arrivalDate.expiryDate).format('DD/MM/YYYY')  }}
        </template>
        <template slot="steps" slot-scope="steps">
          <!-- {{ steps }} -->
          <a-button type="primary" @click="getProcessSteps(steps.globalId,steps.samplePUID, steps.taskName)" >Review Steps</a-button>
        </template>
        
    </a-table>
    <a-modal
          :visible="visibleReason"
          title="Reject Reason"
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
        @cancel="stepModal(false)"
        >
        <Process
                :collections="dummyCollection"
                :bag-id="'BUID-123'"
                :type-id="typeId"
                @fetchBags="() => {}"
                @updateId="updateId"
              />
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
                    <a-button style="background-color:#625264; color:white" @click="reasonModal(true,quarantine)" dashed> 
                        Quarantine
                    </a-button>
        </template>
        </a-modal>
    </div>
</template>
<script>
    import QPStatusServices from '~/services/API/QPStatusServices'
    import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
    import Process from '~/components/root/inventory/Process'
    import SampleProcessServices from '~/services/API/SampleProcessServices'
export default {
  components:{
    Process
  },
  data() {
    return {
      column:[
        {
          title: `SampleId`,
          dataIndex: 'samplePUID',
          key: 'samplePUID'
        },
            {
                title: `Sample Name`,
                dataIndex: 'sampleName',
                key: 'sampleName',
            },
            {
                title: `Project Name`,
                dataIndex: 'projectName',
                key: 'projectName',
            },
            {
                title: `Arrival - Expiry Date`,
                key: 'arrivalDate',
                scopedSlots:{customRender : 'arrivalDate'}
            },
            {
                title: 'Client Name',
                key : 'clientName',
                dataIndex:'clientName', 
            },
            {
              title: 'View Process Steps',
              key: 'steps',
              scopedSlots:{customRender: 'steps'}
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
      typeId: '',
      visibleStepModal: false,
      stepGlobalId: '',
    }
  },
  computed: {
  },
  mounted(){
    this.getPending()
  },
  watch:{
  },  
  methods: {
    _getFormatMoment,
    getPending(){
        QPStatusServices.getPending().then((response) => {
            this.data = response.data
            this.$store.commit('setApproval', this.data.length)
        }).catch(this.error)
    },
    submitStatus(resp){
        this.loading = true
        const values = JSON.parse(JSON.stringify({
            globalId : this.stepGlobalId,
            status: resp
        }))
        QPStatusServices.update(values).then((response)=>{
            console.log(response.data)
            this.getPending()
            this.stepModal(false)
        }).catch(this.error).finally(this.loading = false)
    },
    getProcessSteps(id,sampleId,taskName)
    {
      this.stepGlobalId = id
      this.loading = true
      this.typeId = taskName
      SampleProcessServices.getBySampleId(sampleId).then((response)=>{
          console.log(response.data)
          this.dummyCollection = response.data
          this.visibleStepModal = true
      }).catch(this.error).finally(this.loading = false)
    },
    stepModal(e){
      this.visibleStepModal = e
    },
    reasonModal(e, status){
        this.visibleReason = e
        // this.qPStatusId = id
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
                    globalId : this.stepGlobalId,
                    status : this.status,
                    reason : value.reason
                }))
            QPStatusServices.update(values).then((response)=>{
            console.log(response.data)
            this.reasonModal(false, '')
            this.stepModal(false)
            this.getPending()
        }).catch(this.error)
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