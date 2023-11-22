<template>
    <a-table class="rounded-table" :loading="loading" :columns="column" :data-source="data">
        <template slot="action">
                    <a-button type="primary" dashed>
                        Accept
                    </a-button>
                    <a-button class="new-treatment-btn" dashed>
                        Reject
                    </a-button>
                    <a-button type="danger" dashed>
                        Quarantine
                    </a-button>
        </template>
    </a-table>
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
    }
  },
}
</script>