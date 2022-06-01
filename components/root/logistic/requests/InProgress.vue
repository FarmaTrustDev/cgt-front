<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div>
          <a-steps :current="getCurrentStep(record)" size="small">
            <a-step title="Pickup Shipment" @click="stepClick(record)" />

            <a-step title="Delivery Shipment" />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
    </a-table>
  </div>
</template>
<script>
import Filters from '~/components/root/manufacturer/treatments/listing/Filters'
import SchedulingServices from '~/services/API/SchedulingServices'
import withTableCrud from '~/mixins/with-table-crud'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import routeHelpers from '~/mixins/route-helpers'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
const ActionLink = '/manufacturer/schedules'
export default {
  components: { Filters, },
  mixins: [withTableCrud, routeHelpers],
  data() {
    return {
      column:[
  {
    title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
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

  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
],
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
        logisticStatus: SCHEDULING_STATUSES.accepted.id,
      },
      selectedRow: {},
      confirmLoading: false,
    }
  },
  mounted() {},
  methods: {
    stepClick(record) {
      this.goto(`/logistic/shipment/${record.globalId}`)
    },
    getCurrentStep(record) {},
    getParams(params) {
      this.fetch(params)
    },

  },
}
</script>
