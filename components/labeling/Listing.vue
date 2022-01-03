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

      <template slot="print" slot-scope="print">
        <a-button class="print-btn" type="primary" size="small" icon="printer"  @click="openViewModal(print)">View Label</a-button>
      </template>

    </a-table>

    <!-- View the Modal -->
    <ViewLabelModal v-if="showViewModal" />

  </div>
</template>

<script>
  import ViewLabelModal from '~/components/labeling/ViewLabelModal'
  export default{
    components : { ViewLabelModal },
    data(){
      return{
        showViewModal : false,
        columns :  [
          {
            title: 'Patient ID',
            dataIndex: 'patient_id',
          },
          {
            title: 'Patient Name',
            dataIndex: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Treatment Type',
            dataIndex: 'treatment_type',
          },
          {
            title: 'Print',
            dataIndex: 'print',
            scopedSlots: { customRender: 'print' },
          }
        ],
        data: [{
          'uuid' : '12',
          'patient_id' : 1,
          'name' : 'Test',
          'age' : '10',
          'treatment_type' : 'XYZ',
        }],
        loading: false,
      }
    },
    methods:{
      openViewModal(id){
        // console.log(id)
        this.showViewModal = true
      },
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