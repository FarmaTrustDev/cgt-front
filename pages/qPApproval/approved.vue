<template>
    <a-table :loading="loading" :columns="column" :data-source="data">
    </a-table>
</template>
<script>
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
                key: 'organizationName',
                scopedSlots: { customRender: 'organizationName' },
            },
            {
                title: 'Client Name',
                key : 'clientName',
                scopedSlots : { customRender : 'duration'}, 
            },
            {
                title: `Action`,
                dataIndex: 'action',
                scopedSlots: { customRender: 'action' },
            },
            ],
      loading: false,
      data: [],
      
    }
  },
  computed: {
  },
  watch:{
  },  
  methods: {
  },
}
</script>