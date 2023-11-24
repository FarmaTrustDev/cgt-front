<template>
    <div class="collection-processing-steps" style="margin-top:10px">
      <a-form :form="form" @submit="onSubmit" layout="horizontal">
        <a-table
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
  
      <a-form-item class="mt-15">
        <FormActionButton v-if="!isAllreadyFill"
          
          text="Submit for QP Process"
          
          :loading="loading"
        />
      </a-form-item>
      </a-form>
    </div>
  </template>
  <script>
  import QPProcessServices from '~/services/API/QPProcessServices'
  import SampleQPProcessServices from '~/services/API/SampleQPProcessServices'
  import { isEmpty } from '~/services/Helpers'
  export default {
  components: {  },
  mixins: [],
  props: {
    projId: { required: true, type: String },
    sampleId: { required: true, type: Number },
    samplePuid: { required: true, type: String },
    sampleName: { required: true, type: String },
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
      collections:[],
      projectId:this.projId,
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
      btnLoading: false,
      showEmailModal: false,
      body: null,
      checkboxValuesda:[],   
      outputArray:[] , 
      isAllreadyFill:false 
    }
  },
  
  
  mounted() {
    this.getQPDataFilled(this.samplePuid)
  },   
  methods: {
    
       getQPData(id)
       {
        QPProcessServices.getByProjectId(id).then((response)=>{
            this.collections = response.data
            this.checkboxValuesda=new Array(response.data.length).fill(false)
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
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
             console.log(values)
             const data = JSON.parse(JSON.stringify(this.collections))
             console.log(data)
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
          console.log(this.outputArray)
          }

          SampleQPProcessServices.create(this.outputArray).then((response)=>{
            this.outputArray = []
          }).catch(this.error).finally(this.loading = false)

            this.upsert(values)
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },
      
    
  },
}
  
  
  </script>