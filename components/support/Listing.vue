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
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
          },
        ],
        data: [],
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