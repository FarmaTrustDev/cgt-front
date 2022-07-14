<template>
<span>
    <Filters @getParams="getParams" />
    <a-table :loading="loading" :columns="column" :data-source="data" :pagination="{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '100']}">
        <span slot="action" slot-scope="text, record">
            <div v-if="showButton(record)">
                <a-button type="primary" dashed @click="showConfirm(record, true)">
                    {{translation.Accep_1_278}}
                </a-button>
                <a-button class="new-treatment-btn" dashed @click="showConfirm(record, false)">
                    {{translation.Rejec_1_280}}
                </a-button>
            </div>
            <div v-else>
                <a-badge>{{
            record.treatment.isDead ? 'Patient Dead' : 'Treatment is on hold'
          }}</a-badge>
            </div>
        </span>
        <span slot="status" slot-scope="text, record">
            <div v-if="showButton(record)">
                <a-button class="new-treatment-status-btn">
                    New
                </a-button>
            </div>
        </span>
    </a-table>

    <a-modal :title="isAccepted?'Accept Scheduling Request':'Reject Scheduling Request'" :visible="showResponseModal" :confirm-loading="confirmLoading" :footer="null" :destroy-on-close="true" :width="700" @ok="submitTreatmentResult" @cancel="handleModal(false)">
        {{isAccepted}}
        <a-form :form="form" :layout="formLayout" @submit="onSubmit">
            <Form :is-accepted="isAccepted" :data="selectedRow" />

            <FormActionButton :text="getButtonText()" :btn-type="getButtonType()" :is-created="false"><span slot="extra" class="mr-5">
                    <a-button @click="handleModal(false)">{{translation.cance_1_296}}</a-button>
                </span></FormActionButton>
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
import {
    SCHEDULING_STATUSES
} from '~/services/Constant'
const ActionLink = '/manufacturer/schedules'
export default {
    components: {
        Form,
        Filters
    },
    mixins: [withTableCrud],
    data() {
        return {
            column: [{
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
                    title: `Status`,
                    dataIndex: 'status',
                    scopedSlots:{
                        customRender: 'status'
                    },
                },
                {
                    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
                    dataIndex: 'action',
                    scopedSlots: {
                        customRender: 'action'
                    },
                },
            ],
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
            return this.isAccepted ? this.$store.getters.getTranslation.Accep_1_278 : this.$store.getters.getTranslation.Rejec_1_280
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
    computed: {
        translation() {
            return this.$store.getters.getTranslation
        },
    }
}
</script>
