<template>
    <div class="collection-processing-steps" style="margin-top:10px">
      <a-form :form="form" layout="horizontal">
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
              <a-switch
                v-decorator="[
                  'collection'+row.id,
                  {
                    
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: true,
                        message: 'this is rquired',
                      },
                    ],
                  },
                ]"
                checked-children="yes"
                un-checked-children="no"
                @change="handleCheckboxChange(row.id, $event)"
              />
  
             
            </a-form-item>
          </template>
          <template slot="notes" slot-scope="name, row">
            <a-form-item class="mt-20">
              <a-input
               
                v-decorator="[
                  'note'+row.id,
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
        <FormActionButton
          
          text="Submit for QP Process"
          
          :loading="loading"
        />
      </a-form-item>
      </a-form>
    </div>
  </template>
  <script>
  import QPProcessServices from '~/services/API/QPProcessServices'

  export default {
  components: {  },
  mixins: [],
  props: {
    // collections: { required: true, type: Array },
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
      projectId:'5475',
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
      btnLoading: false,
      showEmailModal: false,
      body: null,
      checkboxValues:[],      
    }
  },
  
  
  mounted() {
    this.getQPData(this.projectId)
  },   
  methods: {
    
       getQPData(id)
       {
        QPProcessServices.getByProjectId(id).then((response)=>{
            this.collections = response.data
            this.checkboxValues=new Array(this.collections.length).fill(false)
        })
       },
       handleCheckboxChange(id, value) {
        alert(id)
        this.checkboxValues[id] = value;
        console.log(this.checkboxValues)
    },
    
  },
}
  
  
  </script>