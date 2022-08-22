<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table
      :loading="loading"
      class="page-footer"
      :columns="column"
      :data-source="data"
      :pagination="{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
      }"
    >
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
        <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
          <span class="treatmentName">{{ name }}</span>
        </a-tooltip>
      </template>
      <span slot="action" slot-scope="text, record">
        <!-- //Steps -->
        <div :class="getTreatmentStepClass(record)">
          <div class="treatment-steps manufacturer-step">
            <span class="step-col">
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
            </span>
          </div>
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
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          key: 'TreatmentName',
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          title: `${this.$store.getters.getTranslation.ProduLine_2_449}`,
          dataIndex: 'productionLine.name',
          key: 'productionLine',
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
        ManufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        LogisticStatusNot: SCHEDULING_STATUSES.rejected.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
        direction: 1,
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
    getTranslationData(){
      this.phases[0].name=this.translation.InbouAccep_3_834
      this.phases[1].name=this.translation.Manuf_1_342
      this.phases[2].name=this.translation.OutboShipm_2_376
    },    
    stepClick(record, phase) {
      if (record.treatment.phaseId >= phase.phaseId) {
        return this.goto(
          `/manufacturer/treatments/process/${record.treatment.globalId}`,
          { ...phase.params }
        )
      }
    },
    getTreatmentStepClass(patient) {
      if (patient.treatment.isHold) {
        return 'isHold'
      }
      else if(patient.treatment.isCancel)
      {
        return 'isCancel'
      }
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
    @extend .blockState;
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
.isCancel{
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
