<template>
  <div>
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div>
          <a-steps :current="getCurrentStep(record)" size="small">
            <a-step title="Inbound Shipment" @click="stepClick(record)" />

            <a-step title="Manufacturer" />
            <a-step title="Outbound Shipment" />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
    </a-table>
  </div>
</template>
<script>
import TreatmentServices from '~/services/API/TreatmentServices'

import routeHelpers from '~/mixins/route-helpers'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
const column = [
  {
    title: 'Patient Id',
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
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
  mixins: [routeHelpers],
  data() {
    return {
      column,
      loading: false,
      data: [],
      apiService: TreatmentServices,
      ActionLink,
      showResponseModal: false,
      isAccepted: false,
      params: {
        isShipmentReceived: true,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
      },
      selectedRow: {},
      confirmLoading: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    stepClick(record) {
      this.goto(`/manufacturer/treatments/process/${record.globalId}`)
    },
    getCurrentStep(record) {},
    fetch(params = {}) {
      this.loading = true

      TreatmentServices.manufacturing(this.params)
        .then((response) => {
          this.data = response.data
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
