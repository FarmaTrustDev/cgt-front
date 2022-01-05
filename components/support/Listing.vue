<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="data"
      :loading="loading"
      @change="handleTableChange"
      class="rounded-table"
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
          <a-menu-item key="0"><a-icon type="plus" /> Update Ticket </a-menu-item>
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
            title: 'Date',
            dataIndex: 'date',
          },
          {
            title: 'TicketID',
            dataIndex: 'ticketId',
          },
          {
            title: 'Name(PUID)',
            dataIndex: 'name',
          },
          {
            title: 'BagId',
            dataIndex: 'bagId',
          },
          {
            title: 'Issue Details',
            dataIndex: 'issueDetails',
          },
          {
            title: 'Last Update',
            dataIndex: 'lastUpdate',
          },
          {
            title: 'Status',
            dataIndex: 'status',
             scopedSlots: { customRender: 'status' }
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            scopedSlots: { customRender: 'supportAction' },
          },
        ],
        data: [{
          'date' : '2021-10-11',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '2021-10-11',
          'lastUpdate' : '2021-10-11',
          'status' : 'InProcess'
        },
        {
          'date' : '2021-10-11',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '2021-10-11',
          'lastUpdate' : '2021-10-11',
          'status' : 'Cancelled'
        },
        {
          'date' : '2021-10-11',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '2021-10-11',
          'lastUpdate' : '2021-10-11',
          'status' : 'Archived'
        },
        {
          'date' : '2021-10-11',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '2021-10-11',
          'lastUpdate' : '2021-10-11',
          'status' : 'Pause'
        },
        {
          'date' : '2021-10-11',
          'ticketId' : 'CDK-190',
          'name' : 'John DOE',
          'bagId' : '123',
          'issueDetails' : '2021-10-11',
          'lastUpdate' : '2021-10-11',
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