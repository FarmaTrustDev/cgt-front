<template>
  <span>
    <Filters :search-by-type="searchByType" @getParams="getParams" />
    <a-table
      :loading="loading"
      :columns="column"
      :data-source="data"
      :pagination="{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
      }"
    >

      <template slot="pUIDRender" slot-scope="name, treatment">
          <a-tooltip 
            :title="
              'PUID: ' + treatment.patientEnrollmentNumber + 
              '\n'+treatment.hospital.name+': ' + treatment.hospitalPUID+ 
              '\n'+treatment.logisticName+': ' + treatment.logisticPUID
            "
          >
            <span class="treatmentName">{{ treatment.manufacturerPUID }}</span>
          </a-tooltip>
      </template>
      <template slot="treatmentTypeNameRender" slot-scope="name, treatment">
          <a-tooltip :title="'TreatmentID: ' + treatment.treatment.puid">
            <span class="treatmentName">{{ name }}</span>
          </a-tooltip>
      </template>
      <span slot="action" slot-scope="text, record">
        <div v-if="showButton(record)">
          <a-button
            type="primary"
            :loading="loading"
            dashed
            @click="showConfirm(record, true)"
          >
            {{ translation.Accep_1_278 }}
          </a-button>
          <a-button
            class="new-treatment-btn"
            :loading="loading"
            dashed
            @click="showConfirm(record, false)"
          >
            {{ translation.Rejec_1_280 }}
          </a-button>
        </div>
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
      </span>
      <span slot="status" slot-scope="text, record">
        <div v-if="showButton(record)">
          <a-button class="new-treatment-status-btn"> New </a-button>
        </div>
      </span>
    </a-table>
    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>

    <a-modal
      :title="
        isAccepted ? 'Accept Scheduling Request' : 'Reject Scheduling Request'
      "
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
          :text="getButtonText()"
          :btn-type="getButtonType()"
          :is-created="false"
          :loading="loading"
          :disabled="clicked"
          ><span slot="extra" class="mr-5">
            <a-button @click="handleModal(false)" Reject Scheduling Request>{{
              translation.cance_1_296
            }}</a-button>
          </span></FormActionButton
        >
      </a-form>
    </a-modal>
  </span>
</template>

<script>
import Form from '~/components/root/manufacturer/treatments/request/Form'
import SchedulingServices from '~/services/API/SchedulingServices'
import Filters from '~/components/root/manufacturer/treatments/listing/Filters'
import withTableCrud from '~/mixins/with-table-crud'
import Signature from '~/components/signature'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
import { SCHEDULING_STATUSES } from '~/services/Constant'
const ActionLink = '/manufacturer/schedules'
export default {
  components: {
    Form,
    Filters,
    Signature
  },
    mixins: [withTableCrud],
  props:{
    searchByType: {type : String, default: ''}
  },
  data() {
    return {
      clicked:false,
      visibleSignature:false,
      column: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
          scopedSlots:{customRender: 'pUIDRender'}
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
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status',
          },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'action',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      loading: false,
      data: [],
      submitData:{},
      apiService: SchedulingServices,
      ActionLink,
      treatmentStatusClass: 'normal',
      showResponseModal: false,
      isAccepted: false,
      params: {
        manufacturerStatus: SCHEDULING_STATUSES.pending.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
        direction: 1,
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
        this.column[4].title=newValues.Statu_1_202
        this.column[5].title=newValues.Actio_1_220
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
      return this.isAccepted
        ? this.$store.getters.getTranslation.Accep_1_278
        : this.$store.getters.getTranslation.Rejec_1_280
    },
    getButtonType() {
      return this.isAccepted ? 'primary' : 'danger'
    },
    handleModal(show) {
      if (!show) {
        this.isAccepted = false
      }
      this.showResponseModal = show
    },
    submitTreatmentResult() {},
    onSubmit(e) {
      this.loading = true
      this.clicked = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitData = values
          this.visibleSignature = true
        }
      })
      this.loading = false
      this.clicked = false
    },
    upsert(values)
    {
      const data = this.selectedRow
          const performedAction = values.accepted === true ? 'accepted' : 'rejected'
          SchedulingServices.markScheduleRequest(data.id, values).then(
            (response) => {
              this.success('Request ' + performedAction)
              this.handleModal(false)
              this.fetch()
            }
          )
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.submitData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    showButton(schedule) {
      return !(schedule.treatment.isHold || schedule.treatment.isDead | schedule.treatment.isCancel)
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
    getParams(params) {
      this.fetch(params)
    },
  },
}
</script>
