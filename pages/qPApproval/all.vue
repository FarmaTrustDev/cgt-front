<template>
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="arrivalDate" slot-scope="arrivalDate">
            {{ arrivalDate.arrivalDate }} - {{ arrivalDate.expiryDate  }}
        </template>
    </a-table>
</template>
<script>
import QPStatusServices from '~/services/API/QPStatusServices';
export default {
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
                scopedSlots: { customRender: 'arrivalDate' },
            },
            {
                title: 'Client Name',
                key : 'clientName',
                dataIndex: 'clientName', 
            },
            {
              title: 'Status',
              key: 'status',
              dataIndex : 'status'
            }
            ],
      loading: false,
      data: [],
      
    }
  },
  computed: {
  },
  watch:{
  },  
  mounted(){
    this.getAll()
  },
  methods: {
    getAll(){
      this.loading = true
      QPStatusServices.getAll().then((response)=>{
        this.data = response.data
      }).catch(this.error).finally(this.loading = false)
    }
  },
}
</script>