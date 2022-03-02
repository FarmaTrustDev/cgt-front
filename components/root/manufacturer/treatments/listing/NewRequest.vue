<template>
  <span>
    <a-table :loading="loading" :columns="column" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" dashed @click="showConfirm(record, true)">
          Accepted
        </a-button>
        <a-button type="danger" dashed @click="showConfirm(record, false)">
          Rejected
        </a-button>
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
import withTableCrud from '~/mixins/with-table-crud'
import {
  _getPastMomentStandardFormatted,
  _getFutureMomentStandardFormatted,
} from '~/services/Helpers/MomentHelpers'
import { SCHEDULING_STATUSES } from '~/services/Constant'
const column = [
  {
    title: 'Patient Id',
    dataIndex: 'patientEnrollmentId',
    key: 'patientEnrollmentId',
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
  components: { Form },
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
        manufacturerStatus: SCHEDULING_STATUSES.new.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
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
      return this.isAccepted ? 'Accepted' : 'Rejected'
    },
    getButtonType() {
      return this.isAccepted ? 'primary' : 'danger'
    },
    handleModal(show) {
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
  },
}
</script>
