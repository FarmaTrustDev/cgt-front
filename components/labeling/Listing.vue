<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="data"
      :loading="loading"
      class="rounded-table"
    >
      <template slot="name" slot-scope="name">
        <strong>{{ name }}</strong>
      </template>

      <template slot="print" slot-scope="text, schedule">
        <pre>
          {{ record }}
          {{ (treatment, record) }}
      </pre
        >

        <a-button
          v-for="bag in schedule.treatment.bags"
          :key="bag.message - to - id"
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(schedule)"
          >{{ bag.puid }}</a-button
        >
      </template>
    </a-table>

    <!-- View the Modal -->
    <ViewLabelModal v-if="showViewModal" />
  </div>
</template>

<script>
import ViewLabelModal from '~/components/labeling/ViewLabelModal'
export default {
  components: { ViewLabelModal },
  props: {
    data: { type: Array, required: true },
  },
  data() {
    return {
      showViewModal: false,
      columns: [
        {
          title: 'Patient ID',
          dataIndex: 'patientEnrollmentNumber',
        },
        // {
        //   title: 'Patient Name',
        //   dataIndex: 'name',
        //   scopedSlots: { customRender: 'name' },
        // },
        {
          title: 'Collection Date - Delivery Date ',
          dataIndex: 'collectionDateDeliveryDate',
        },
        {
          title: 'Treatment Type',
          dataIndex: 'treatment_type',
        },
        {
          title: 'Print',
          dataIndex: 'print',
          scopedSlots: { customRender: 'print' },
        },
      ],
      // data: [
      //   {
      //     uuid: 'DAC61010',
      //     patient_id: 'DAC61010',
      //     name: 'Christina Braun',
      //     age: '1 month',
      //     treatment_type: 'Zolgenzma',
      //   },
      // ],
      loading: false,
    }
  },
  methods: {
    openViewModal(id) {
      // console.log(id)
      this.showViewModal = true
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      // this.fetch({
      //   results: pagination.pageSize,
      //   page: pagination.current,
      //   sortField: sorter.field,
      //   sortOrder: sorter.order,
      //   ...filters,
      // })
    },
  },
}
</script>
