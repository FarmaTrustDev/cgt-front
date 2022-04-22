<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="name" slot-scope="name, record">
        <strong>
          <a-button
            type="link"
            @click="
              goto(
                `/manufacturer/treatments/process/${record.treatment.globalId}`
              )
            "
            >{{ name }}</a-button
          >
        </strong>
      </template>
    </a-table>
  </div>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import routeHelpers from '~/mixins/route-helpers'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import { MANUFACTURER_TREATMENT_PENDING_PHASES } from '~/services/Constant/Phases'
import Filters from '~/components/root/manufacturer/treatments/listing/Filters'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'

import withTableCrud from '~/mixins/with-table-crud'

const column = [
  {
    title: 'Patient Id',
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
    scopedSlots: { customRender: 'name' },
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

  // {
  //   title: 'Action',
  //   dataIndex: 'action',
  //   scopedSlots: { customRender: 'action' },
  // },
]
const ActionLink = '/manufacturer/schedules'
export default {
  components: { Filters },
  mixins: [routeHelpers, withTableCrud],
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
        IsShipmentReceived: true,
        Direction: 1,
        ManufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        LogisticStatusNot: SCHEDULING_STATUSES.rejected.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
      },
      selectedRow: {},
      confirmLoading: false,
      phases: MANUFACTURER_TREATMENT_PENDING_PHASES,
    }
  },
  mounted() {
    // this.fetch()
  },
  methods: {
    stepClick(record, phase) {
      this.goto(
        `/manufacturer/treatments/process/${record.treatment.globalId}`,
        { ...phase.params }
      )
    },
    getCurrentStep(treatment) {
      if (treatment.phaseId != null) {
        const closest = this.phases.reduce(function (prev, curr) {
          return Math.abs(curr.phaseId - treatment.phaseId) <
            Math.abs(prev.phaseId - treatment.phaseId)
            ? curr
            : prev
        })

        return closest.id
      }
      return 1
    },
    getParams(params) {
      this.fetch(params)
    },
    // fetch(params = {}) {
    //   this.loading = true

    // SchedulingServices.markScheduleRequest(data.id, values).then(
    //   (response) => {
    //     this.success(response.message)
    //     this.handleModal(false)
    //     this.fetch()
    //   }
    // )
    // },
  },
}
</script>
