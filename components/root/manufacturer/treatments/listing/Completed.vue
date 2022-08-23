<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data" :custom-row="customRowReDirect">
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
          <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
            <span class="treatmentName">{{ name }}</span>
          </a-tooltip>
      </template>      
      <template slot="name" slot-scope="name, record">
        <strong>
          <a-button
            class="btn-color"
            type="link"
            @click="
              goto(
                `/manufacturer/treatments/process/${record.treatment.globalId}?view=OUTBOUND_SHIPMENT`
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

const ActionLink = '/manufacturer/schedules'
export default {
  components: { Filters },
  mixins: [routeHelpers, withTableCrud],
  data() {
    return {
      column: [
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
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
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
        // title: `${this.$store.getters.getTranslation.Actio_1_220}`,
        // dataIndex: 'action',
        // scopedSlots: { customRender: 'action' },
        // },
      ],
      loading: false,
      data: [],
      apiService: SchedulingServices,
      ActionLink,
      showResponseModal: false,
      isAccepted: false,
      params: {
        IsShipmentReceived: true,
        Direction: 2,
        active:true,
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      console.log(oldValue)
      if(newValues!==oldValue){
        this.phases[0].name=newValues.InbouAccep_3_834
        this.phases[1].name=newValues.Manuf_1_342
        this.phases[2].name=newValues.OutboShipm_2_376
      }
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
            this.goto(
              `/manufacturer/treatments/process/${record.treatment.globalId}?view=OUTBOUND_SHIPMENT`
            )
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
