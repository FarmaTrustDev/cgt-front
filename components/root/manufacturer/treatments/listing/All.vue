<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data" :custom-row="customRowReDirect">
      <template slot="name" slot-scope="name">
        <strong>
          <a-button
            type="link"
            class="btn-color"
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
// import { SCHEDULING_STATUSES } from '~/services/Constant'
import { MANUFACTURER_TREATMENT_PENDING_PHASES } from '~/services/Constant/Phases'
import Filters from '~/components/root/manufacturer/treatments/listing/Filters'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'

import withTableCrud from '~/mixins/with-table-crud'

const ActionLink = '/manufacturer/schedules'
export default {
  components: { Filters },
  mixins: [routeHelpers, withTableCrud],
  data() {
    return {
      column:[
  {
    title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
    dataIndex: 'treatmentType.name',
    key: 'TreatmentName',
  },
  {
   title: `${this.$store.getters.getTranslation.Organ_1_166}`,
    dataIndex: 'hospital.name',
    key: 'OrganizationName',
  },
  {
    title: `${this.$store.getters.getTranslation['Colle-_4_268']}`,
    dataIndex: 'collectionDateDeliveryDate',
    key: 'collectionDateDeliveryDate',
  },

  // {
  //   title: 'Action',
  //   dataIndex: 'action',
  //   scopedSlots: { customRender: 'action' },
  // },
],
      loading: false,
      data: [],
      apiService: SchedulingServices,
      ActionLink,
      showResponseModal: false,
      isAccepted: false,
      params: {
        IsShipmentReceived: null,
        Direction: null,
        ManufacturerStatus: null,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
      },
      selectedRow: {},
      confirmLoading: false,
      phases: MANUFACTURER_TREATMENT_PENDING_PHASES,
      currentTreatmentStep : ''
    }
  },
  mounted() {
    // this.fetch()
  },
  methods: {
        customRowReDirect(record) {
      return {
        on: {
          click: (event) => {
            this.goto(`/manufacturer/treatments/process/${record.treatment.globalId}?view=${this.getCurrentTreatmentStep(record.treatment)}`)
          },
        },
      }
    },
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
    getCurrentTreatmentStep(treatment) {
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
        // eslint-disable-next-line eqeqeq
        if(currentPhase == 1)
        {
          this.currentTreatmentStep = 'INBOUND_SHIPMENT'
           return this.currentTreatmentStep
        }
        // eslint-disable-next-line eqeqeq
        else if(currentPhase == 2)
        {
          this.currentTreatmentStep = 'MANUFACTURER'
           return this.currentTreatmentStep
        }
        // eslint-disable-next-line eqeqeq
        else if(currentPhase == 3)
        {
          this.currentTreatmentStep = 'OUTBOUND_SHIPMENT'
           return this.currentTreatmentStep
        }
        return this.currentTreatmentStep
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
