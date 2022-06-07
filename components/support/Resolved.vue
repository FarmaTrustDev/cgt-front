<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="data"
      :loading="loading"
      @change="handleTableChange"
      class="rounded-table"
      :pagination="{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '100']}"
    >
      <template slot="name" slot-scope="name">
        {{ name.first }} {{ name.last }}
      </template>

      <template slot="status" slot-scope="status">
        <span :class="'status status-'+status.toLowerCase()">{{ status }}</span>
      </template>

      <template slot="supportAction">
        <a-dropdown :trigger="['click']">
        <a-button class="action-button">
         Admin <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="0"><a-icon type="plus" /> {{this.$store.getters.getTranslation.Updatticke_2_222}} </a-menu-item>
        </a-menu>
      </a-dropdown>
      </template>

    </a-table>
  </div>
</template>

<script>
  export default{
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        columns :  [
          {
            title: `${this.$store.getters.getTranslation.date_1_510}`,
            dataIndex: 'date',
          },
          {
            title: `${this.$store.getters.getTranslation.TickeID_2_212}`, 
            dataIndex: 'ticketId',
          },
          {
            title: 'Name(PUID)',
            dataIndex: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.BagID_2_540}`,
            dataIndex: 'bagId',
          },
          {
            title: `${this.$store.getters.getTranslation.IssueDetai_2_214}`, 
            dataIndex: 'issueDetails',
          },
          {
            title: `${this.$store.getters.getTranslation.LastUpdat_2_216}`, 
            dataIndex: 'lastUpdate',
          },
          {
            title: `${this.$store.getters.getTranslation.CarriStatu_2_320}`, 
            dataIndex: 'status',
             scopedSlots: { customRender: 'status' }
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            dataIndex: 'actions',
            scopedSlots: { customRender: 'supportAction' },
          },
        ],
        data: [
        {
          'date' : '10-11-2021',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '10-11-2021',
          'lastUpdate' : '10-11-2021',
          'status' : 'Resolved'
        },
        {
          'date' : '10-11-2021',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '10-11-2021',
          'lastUpdate' : '10-11-2021',
          'status' : 'Resolved'
        }],
        loading: false,
      }
    },
    methods:{
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination)
        const pager = { ...this.pagination }
        pager.current = pagination.current
        this.pagination = pager
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        })
      },
    }
  }
</script>