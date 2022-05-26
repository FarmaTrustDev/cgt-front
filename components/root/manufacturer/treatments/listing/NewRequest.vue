<template>
  <span>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <div v-if="showButton(record)">
          <a-button type="primary" dashed @click="showConfirm(record, true)">
            Accept
          </a-button>
          <a-button type="danger" dashed @click="showConfirm(record, false)">
            Reject
          </a-button>
        </div>
        <div v-else>
          <a-badge>{{
            record.treatment.isDead ? 'Patient Dead' : 'Treatment is on hold'
          }}</a-badge>
        </div>
      </span>
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
          :text="getButtonText()"
          :btn-type="getButtonType()"
          :is-created="false"
          ><span slot="extra" class="mr-5">
            <a-button @click="handleModal(false)">Cancel</a-button>
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
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
import { SCHEDULING_STATUSES } from '~/services/Constant'
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
  components: { Form, Filters },
  mixins: [withTableCrud],
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
  methods: {
    showConfirm(record, isAccepted) {
      this.isAccepted = isAccepted
      this.selectedRow = record
      this.handleModal(true)
    },
    getButtonText() {
      return this.isAccepted ? 'Accept' : 'Reject'
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
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.selectedRow
          SchedulingServices.markScheduleRequest(data.id, values).then(
            (response) => {
              this.success(response.message)
              this.handleModal(false)
              this.fetch()
            }
          )
        }
      })
      this.loading = false
    },
    showButton(schedule) {
      return !(schedule.treatment.isHold || schedule.treatment.isDead)
    },
    getParams(params) {
      this.fetch(params)
    },
  },
}
</script>
