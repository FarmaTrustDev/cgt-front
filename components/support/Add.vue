<template>
  <div>
    <a-modal
      :footer="null"
      :width="900"
      title="Add New Ticket"
      :destroy-on-close="true"
      :visible="visible"
      @cancel="showModal(false)"
      @ok="showModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              label="Patient:"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-select
                v-decorator="[
                  'patient_Id',
                  {
                    initialValue: ticket.patientId,
                    rules: [
                      {
                        required: true,
                        message: 'Patient Required',
                      },
                    ],
                  },
                ]"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Search By Name, Id, Email"
                style="width: 100%"
                size="large"
                autocomplete="off"
                class="default-select"
                @select="onPatientSelect"
                @search="searchPatient"
              >
                <a-select-option
                  v-for="patient in patients"
                  :key="`${patient.id}`"
                >
                  {{ patient.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="Bags:"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                v-decorator="[
                  'Reference_Id',
                  {
                    initialValue: ticket.Reference_Id,
                  },
                ]"
                placeholder="Please input your Patient"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item
              label="Subject:"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                v-decorator="[
                  'subject',
                  {
                    initialValue: ticket.subject,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Subject !',
                      },
                    ],
                  },
                ]"
                placeholder="Subject"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item
              label="Description:"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    initialValue: ticket.description,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Description !',
                      },
                    ],
                  },
                ]"
                placeholder="Description"
                :auto-size="{ minRows: 3, maxRows: 6 }"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
              <a-select
                v-decorator="[
                  'status_Id',
                  {
                    initialValue: ticket.status_Id,
                    rules: [
                      {
                        required: true,
                        message: 'Please select Status',
                      },
                    ],
                  },
                ]"
                :loading="typeLoading"
                placeholder="Select Status"
                style="width: 100%"
                size="large"
                class="default-select"
              >
                <a-select-option
                  v-for="status in statuses"
                  :key="`${status.id}`"
                >
                  {{ status.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <a-select
                v-decorator="[
                  'priority',
                  {
                    initialValue: ticket.priority,
                    rules: [
                      {
                        required: true,
                        message: 'Please select Priority',
                      },
                    ],
                  },
                ]"
                :loading="typeLoading"
                placeholder="Select Priority"
                style="width: 100%"
                size="large"
                class="default-select"
              >
                <a-select-option
                  v-for="priority in priorities"
                  :key="priority.id"
                >
                  {{ priority.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20" class="mt-15">
          <a-col>
            <a-form-item>
              <a-select
                v-decorator="[
                  'stackHolder',
                  {
                    initialValue: ticket.stackHolder,
                    rules: [
                      {
                        required: true,
                        message: 'Please select StackHolder',
                      },
                    ],
                  },
                ]"
                mode="tags"
                :loading="typeLoading"
                placeholder="Select StackHolders"
                style="width: 100%"
                size="large"
                class="default-select"
              >
                <a-select-option
                  v-for="stake in stakeHoldersList"
                  :key="`${stake.id}`"
                >
                  {{ stake.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="mt-15">
          <a-col class="text-right">
            <FormActionButton
              :is-created="isCreated"
              :loading="loading"
              text="Save"
            />
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { filterOption } from '~/services/Helpers'
import PatientServices from '~/services/API/PatientServices'
import SupportServices from '~/services/API/SupportServices'
import notifications from '~/mixins/notifications'
export default {
  mixins: [notifications],
  props: { ticket: { type: Object, default: () => ({}) } },
  data() {
    return {
      visible: true,
      patients: [],
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      typeLoading: false,
      statuses: [
        { id: 1, name: 'Archived' },
        { id: 2, name: 'In progress' },
        { id: 3, name: 'Resolved' },
        { id: 4, name: 'Cancel' },
        { id: 5, name: 'Pause' },
      ],
      priorities: [
        { id: 1, name: 'High' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Low' },
      ],
      stakeHoldersList: [
        { id: 1, name: 'HOSPITAL' },
        { id: 2, name: 'MANUFACTURER' },
        { id: 3, name: 'LOGISTIC' },
      ],
      loading: false,
      isCreated: false,
    }
  },
  mounted() {
    console.log(this.$parent)
  },
  methods: {
    filterOption,
    showModal(show) {
      this.visible = show
      this.$parent.showAddModal = show
    },
    searchPatient(keyword) {
      this.fetchPatient({ puid: keyword, name: keyword, email: keyword })
    },
    fetchPatient(params = {}) {
      PatientServices.search(params).then((response) => {
        this.patients = response.data
      })
    },
    onPatientSelect(patientId, option) {
      this.fetchBags(patientId)
    },
    fetchBags(patientId) {},
    onSubmit(e) {
      this.loading = true
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          SupportServices.create(values)
            .then((response) => {
              this.success(response.message)
            })
            .catch(this.error)
            .finally(() => {
              this.loading = false
              this.showModal(false)
            })
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
