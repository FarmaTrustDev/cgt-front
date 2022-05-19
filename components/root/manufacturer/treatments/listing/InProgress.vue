<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div class="treatment-steps">
          <a-steps
            :initial="1"
            :current="getCurrentStep(record.treatment)"
            size="small"
          >
            <a-step
              v-for="phase in phases"
              :key="phase.id"
              :title="phase.name"
              @click="stepClick(record, phase)"
            />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
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
  },
  {
    title: 'Treatment Type',
    dataIndex: 'treatmentType.name',
    key: 'TreatmentName',
  },
  {
    title: 'Production Line',
    dataIndex: 'productionLine.name',
    key: 'productionLine',
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
        ManufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        LogisticStatusNot: SCHEDULING_STATUSES.rejected.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
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
        const phases = this.phases
        let currentPhase = 0
        for (let phase = 0; phase < phases.length; phase++) {
          if (phases[phase].phaseId < treatment.phaseId) {
            currentPhase = phases[phase].id
          } else {
            currentPhase = phases[phase].id
            break
          }
        }
        return currentPhase
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
