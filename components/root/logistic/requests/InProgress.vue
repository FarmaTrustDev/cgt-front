<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="pUIDRender" slot-scope="name, patient">
        <a-tooltip
          style="white-space: pre-line"
          :title="
            'PUID: ' +
            patient.patientEnrollmentNumber +
            '\n' +
            patient.manufacturerName +
            ': ' +
            patient.manufacturerPUID +
            '\n' +
            patient.hospital.name +
            ': ' +
            patient.hospitalPUID
          "
        >
          <span class="treatmentName">{{ patient.logisticPUID }}</span>
        </a-tooltip>
      </template>
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
        <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
          <span class="treatmentName">{{ name }}</span>
        </a-tooltip>
      </template>
      <span slot="duration" slot-scope="text, index" :key="index.id">
        {{ text }} Day(s)
      </span>
      <span slot="action" slot-scope="text, record" class="treatment-steps">
        <!-- //Steps -->
        <div :class="getTreatmentStepClass(record)" class="step-col-logistic">
          <a-steps size="small" :initial="1">
            // @todo use the logic in patient list to complete the After care
            step in green color als need improvement in the code which return
            class
            <a-step
              :key="1"
              title="Pickup Shipment"
              :class="getTabClass(record.treatment.phaseId >= 8)"
              @click="stepClick(record, 1)"
            />
            <a-step
              :key="2"
              title="Delivery Shipment"
              :class="getTabClass(record.treatment.phaseId > 8)"
              @click="stepClick(record, 2)"
            />
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
import tabsHelpers from '~/mixins/tabs-helpers'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
const ActionLink = '/manufacturer/schedules'
export default {
  components: { Filters },
  mixins: [withTableCrud, routeHelpers, tabsHelpers],
  data() {
    return {
      column: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
          scopedSlots: { customRender: 'pUIDRender' },
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
          title: `${this.$store.getters.getTranslation.Durat_1_71}`,
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
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
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.column[0].title = newValues.PatieID_2_264
        this.column[1].title = newValues.TreatType_2_67
        this.column[2].title = newValues.Organ_1_166
        this.column[3].title = newValues['Colle-_4_268']
        this.column[4].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {},
  methods: {
    getTabClass(condition) {
      return condition ? 'ant-steps-item-finish' : 'ant-steps-item-active'
    },
    getTreatmentStepClass(patient) {
      if (patient.treatment.isHold) {
        return 'isHold'
      } else if (patient.treatment.isCancel) {
        return 'isCancel'
      }
    },
    stepClick(record, view = 1) {
      let viewRedirect = 'PICK_UP'
      if (view === 2) {
        viewRedirect = 'DELIVERY'
      }
      this.goto(`/logistic/shipment/${record.globalId}?view=${viewRedirect}`)
    },
    getCurrentStep(record) {},
    getParams(params) {
      this.fetch(params)
    },
  },
}
</script>
<style lang="scss" scoped>
.blockState {
  position: relative;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
  }
}
.isHold {
  .ant-steps {
    @extend .blockState !optional;
  }
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
.isCancel {
  .ant-steps {
    @extend .blockState;
  }
  .ant-steps-item.ant-steps-item-finish {
    background: #ffd8d8;
  }
  .ant-steps-item.ant-steps-item-process.ant-steps-item-active {
    background: #ffd8d8;
  }
  .ant-steps-item.ant-steps-item-wait {
    background: #ffd8d8;
  }
  .ant-steps-item-finish .ant-steps-item-content {
    &::before {
      background-image: url(https://cgt-dev-ft.microsysx.com/images/v2/icons/status-done-circle.svg);
    }
  }
}
</style>
