<template>
    <div>
    <a-table class="rounded-table" :loading="loading" :columns="column" :data-source="data">
        <template slot="arrivalDate" slot-scope="arrivalDate">
            {{ arrivalDate.arrivalDate }} - {{ arrivalDate.expiryDate  }}
        </template>
        <template slot="action" slot-scope="action">
            <a-button type="primary" dashed @click="submitStatus(action.globalId, approved)">
                        Approve
                    </a-button>
                    <a-button class="new-treatment-btn" dashed @click="reasonModal(action.globalId, true, rejected)">
                        Reject
                    </a-button>
                    <a-button type="danger" dashed @click="submitStatus(action.globalId, quarantine)"> 
                        Quarantine
                    </a-button>
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
          @cancel="reasonModal('',false)"
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
    </div>
</template>
<script>
    import QPStatusServices from '~/services/API/QPStatusServices'
export default {
  data() {
    return {
      column:[
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
                title: `Action`,
                key: 'action',
                scopedSlots: { customRender: 'action' },
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
    getPending(){
        QPStatusServices.getPending().then((response) => {
            this.data = response.data
        }).catch(this.error)
    },
    submitStatus(id, resp){
        this.loading = true
        const values = JSON.parse(JSON.stringify({
            globalId : id,
            status: resp
        }))
        QPStatusServices.update(values).then((response)=>{
            console.log(response.data)
            this.getPending()
        }).catch(this.error).finally(this.loading = false)
    },
    reasonModal(id, e, status){
        this.visibleReason = e
        this.qPStatusId = id
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
                    globalId : this.qPStatusId,
                    status : this.status,
                    reason : value.reason
                }))
            QPStatusServices.update(values).then((response)=>{
            console.log(response.data)
            this.reasonModal('', false, '')
            this.getPending()
        }).catch(this.error)
            }
            this.loading = false
        })
    }
  },
}
</script>