<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
          <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
            <span class="treatmentName">{{ name }}</span>
          </a-tooltip>
      </template> 
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div :class="getTreatmentStepClass(record)">
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
  components: { Filters },
  mixins: [withTableCrud, routeHelpers],
  data() {
    return {
      column: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.PatieID_2_264
        this.column[1].title=newValues.TreatType_2_67
        this.column[2].title=newValues.Organ_1_166
        this.column[3].title=newValues['Colle-_4_268']
        this.column[4].title=newValues.Actio_1_220
      }
    }
  },   
  mounted() {},
  methods: {
    getTreatmentStepClass(patient) {
      if (patient.treatment.isHold || patient.treatment.isCancel) {
        return 'isHold'
      }
    },
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
<style lang="scss" scoped>
.isHold {
  .ant-steps-item.ant-steps-item-finish {
    background: #fffbc8;
  }
  .ant-steps-item.ant-steps-item-process.ant-steps-item-active {
    background: #fffbc8;
  }
  .ant-steps-item.ant-steps-item-wait {
    background: #fffbc8;
  }
  .ant-steps-item-finish .ant-steps-item-content {
    &::before {
      background-image: url(https://cgt-dev-ft.microsysx.com/images/v2/icons/status-done-circle.svg);
    }
  }
}
</style>
