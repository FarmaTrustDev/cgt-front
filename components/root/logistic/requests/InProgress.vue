<template>
  <div>
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div>
          <a-steps size="small">
            <a-step
              title="Pickup Shipment"
              @click="stepClick(record, treatment)"
            />

            <a-step title="Delivery Shipment" />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
    </a-table>
  </div>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import withTableCrud from '~/mixins/with-table-crud'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
const column = [
  {
    title: 'Patient Id',
    dataIndex: 'patientEnrollmentId',
    key: 'patientEnrollmentId',
  },
  {
    title: 'Treatment Type',
    dataIndex: 'treatmentType.name',
    key: 'TreatmentName',
  },
  {
    title: 'Organization',
    dataIndex: 'hospital.name',
    key: 'OrganizationName',
  },
  {
    title: 'Collection - Delivery Date',
    dataIndex: 'collectionDateDeliveryDate',
    key: 'collectionDateDeliveryDate',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
const ActionLink = '/manufacturer/schedules'
export default {
  mixins: [withTableCrud],
  data() {
    return {
      column,
      loading: false,
      data: [],
      apiService: SchedulingServices,
      ActionLink,
      showResponseModal: false,
      isAccepted: false,
      params: {
        statuses: [SCHEDULING_STATUSES.accepted.id, SCHEDULING_STATUSES.new.id],
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        manufacturerStatus: SCHEDULING_STATUSES.accepted.id,
      },
      selectedRow: {},
      confirmLoading: false,
    }
  },
  methods: {
    stepClick() {},
  },
}
</script>
