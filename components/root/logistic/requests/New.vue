<template>
  <div>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="pUIDRender" slot-scope="name, patient">
        <a-tooltip style="white-space: pre-line" 
        :title="
          'PUID: ' + patient.patientEnrollmentNumber + 
          '\n' + patient.manufacturerName+': '+patient.manufacturerPUID +
          '\n' + patient.hospital.name +': '+patient.hospitalPUID
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
      <span slot="organizationName" slot-scope="record">
        {{record.direction==1? record.hospital.name: record.manufacturerName}}
      </span>
      <span v-if="showButton(record)" slot="action" slot-scope="text, record">
        <a-button type="primary" :loading="loading" dashed @click="showConfirm(record, true)">
          {{translation.Accep_1_278}}
        </a-button>
        <a-button class="new-treatment-btn" :loading="loading" dashed @click="showConfirm(record, false)">
          {{translation.Rejec_1_280}}
        </a-button>
      </span>
              <div v-else-if="showTreamentStatus(record)">
          <a-badge v-if = record.treatment.isDead>
            Patient Dead
          </a-badge>
          <a-badge v-if = record.treatment.isHold>
             Patient is on hold
          </a-badge>
          <a-badge v-if = record.treatment.isCancel>
            Patient has been canceled
          </a-badge>
        </div>
    </a-table>
    <a-modal
      title="Scheduling Request"
      :visible="showResponseModal"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :width="700"
      @ok="submitTreatmentResult"
      @cancel="handleModal(false)"
    >
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <Form :is-accepted="isAccepted" :data="selectedRow" />
        <FormActionButton
          :text="getButtonText() === 'Accept' ? translation.Accep_1_278 : translation.Rejec_1_280"
          :btn-type="getButtonType()"
          :is-created="false"
          ><span slot="extra" class="mr-5">
            <a-button @click="handleModal(false)">Cancel</a-button>
          </span>
        </FormActionButton>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import Filters from '~/components/root/manufacturer/treatments/listing/Filters'
import Form from '~/components/root/manufacturer/treatments/request/Form'
import SchedulingServices from '~/services/API/SchedulingServices'
import withTableCrud from '~/mixins/with-table-crud'
import { SCHEDULING_STATUSES } from '~/services/Constant'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
const ActionLink = '/manufacturer/schedules'
export default {
  components: { Form, Filters },
  mixins: [withTableCrud],
  data() {
    return {
      column:[
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
    key: 'organizationName',
    scopedSlots: { customRender: 'organizationName' },
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
        statuses: [SCHEDULING_STATUSES.new.id, SCHEDULING_STATUSES.pending.id],
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        manufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        hospitalCollectionStatus: true,
      },
      selectedRow: {},
      confirmLoading: false,
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
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
  methods: {
    showConfirm(record, isAccepted) {
      this.isAccepted = isAccepted
      this.selectedRow = record
      this.handleModal(true)
    },
    getButtonText() {
      return this.isAccepted ? "Accept" : "Reject"
    },
    getButtonType() {
      return this.isAccepted ? 'primary' : 'danger'
    },
    handleModal(show) {
      this.showResponseModal = show
    },
    showTreamentStatus(schedule)
    {
        // eslint-disable-next-line eqeqeq
        if(schedule.treatment.isHold==true || schedule.treatment.isCancel==true | schedule.treatment.isDead==true)
        {
            this.treatmentStatusClass = 'isHold'
        }
        // eslint-disable-next-line eqeqeq
        // alert(this.treatmentStatusClass)
        return (schedule.treatment.isHold || schedule.treatment.isDead | schedule.treatment.isCancel)
    },
        showButton(schedule) {
      return !(schedule.treatment.isHold || schedule.treatment.isDead | schedule.treatment.isCancel)
    },
    submitTreatmentResult() {},
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.selectedRow
          const performedAction = values.accepted === true ? 'accepted' : 'rejected' 
          SchedulingServices.markScheduleRequest(data.id, values).then(
            (response) => {
              this.success('Request ' + performedAction)
              this.handleModal(false)
              this.fetch()
            }
          )
          if(values.accepted===true){
            this.goto(`/logistic/shipment/${data.globalId}`)
          }else{
            this.goto(`/logistic/`)
          }
        }
      })
      this.loading = false
    },
    getParams(params) {
      this.fetch(params)
    },
  },
}
</script>
