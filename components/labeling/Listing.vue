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
        <a-button
          v-for="bag in schedule.treatment.bags"
          :key="bag.message"
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(schedule.id)"
          >{{ bag.puid }}</a-button
        >
      </template>
    </a-table>

    <!-- View the Modal -->
    <ViewLabelModal v-if="showViewModal" :key="schedulingId" />
  </div>
</template>

<script>
import ViewLabelModal from '~/components/labeling/ViewLabelModal'
// import LabelServices from '~/services/API/LabelServices';
export default {
  components: { ViewLabelModal },
  props: {
    data: { type: Array, required: true },
  },
  data() {
    return {
      showViewModal: false,
      schedulingId: null,
      columns: [
        {
          title: 'Patient ID',
          dataIndex: 'patientEnrollmentNumber',
        },
        {
          title: 'Collection Date - Delivery Date ',
          dataIndex: 'collectionDateDeliveryDate',
        },
        {
          title: 'Treatment Type',
          dataIndex: 'treatmentType.name',
        },
        {
          title: 'Print',
          dataIndex: 'print',
          scopedSlots: { customRender: 'print' },
        },
      ],
      loading: false,
    }
  },
  methods: {
    openViewModal(id) {
      this.showViewModal = true
      this.schedulingId = id
      // LabelServices.scheduling(id);
    },
  },
}
</script>
