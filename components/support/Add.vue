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
            <a-form-item v-if="!isCreated" label="Patient:">
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
                @change="onPatientSelect"
                @search="searchPatient"
              >
                <a-select-option
                  v-for="patient in patients"
                  :key="`${patient.id}`"
                  :data-globalId="patient.globalId"
                >
                  {{ patient.name }}
                </a-select-option>
              </a-select>
              <a-input
                v-decorator="[
                  'reporter_name',
                  {
                    initialValue: ticket.reporter_name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Subject !',
                      },
                    ],
                  },
                ]"
                type="hidden"
                placeholder="Subject"
              />
            </a-form-item>
            <a-form-item v-else label="Patient:">
              <a-input
                v-decorator="[
                  'reporter_name',
                  {
                    initialValue: ticket.reporter_name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Subject !',
                      },
                    ],
                  },
                ]"
                :disabled="true"
              />

              <a-input
                v-decorator="[
                  'patient_Id',
                  {
                    initialValue: `${ticket.reporter_Id}`,
                    rules: [
                      {
                        required: true,
                        message: 'Patient Required',
                      },
                    ],
                  },
                ]"
                :disabled="true"
                type="hidden"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Bags:">
              <a-input
                v-decorator="[
                  'id',
                  {
                    initialValue: ticket.id,
                  },
                ]"
                type="hidden"
                placeholder="Subject"
              />
              <!-- <a-input
                v-decorator="[
                  'Reference_Id',
                  {
                    initialValue: ticket.Reference_Id,
                  },
                ]"
                placeholder="Please input your Patient"
              /> -->
              <a-select
                v-decorator="[
                  'Reference_Id',
                  {
                    initialValue: ticket.reference_Id,
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
                style="width: 100%"
                size="large"
                autocomplete="off"
                class="default-select"
                :disabled="isCreated"
              >
                <a-select-option v-for="bag in bags" :key="`${bag.puid}`">
                  {{ bag.puid }}
                </a-select-option>
              </a-select>
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
                @change="getStatusChange"
              >
                <a-select-option
                  v-for="status in statuses"
                  :key="`${status.id}`"
                >
                  {{ status.name }}
                </a-select-option>
              </a-select>
              <a-input
                v-decorator="[
                  'status_Name',
                  {
                    initialValue: ticket.status_Name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Subject !',
                      },
                    ],
                  },
                ]"
                type="hidden"
                placeholder="Subject"
              />
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
            <FormActionButton :is-created="isCreated" :loading="loading" />
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
import TreatmentServices from '~/services/API/TreatmentServices'
import notifications from '~/mixins/notifications'
export default {
  mixins: [notifications],
  props: {
    ticket: { type: Object, default: () => ({}) },
    isCreated: { type: Boolean, default: false },
  },
  data() {
    return {
      visible: true,
      patients: [],
      status_Name: null,
      reporter_name: null,
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
      bags: [],
    }
  },
  mounted() {},
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

    onPatientSelect(patientId, option, s) {
      this.fetchBags(option.data.attrs['data-globalId'])

      const patient = this.patients.find(
        (patient) => `${patient.id}` === patientId
      )
      this.form.setFieldsValue({
        reporter_name: patient.name,
      })
    },
    getStatusChange(statusId) {
      const status = this.statuses.find((status) => `${status.id}` === statusId)
      this.status_Name = status.name

      this.form.setFieldsValue({
        status_Name: status.name,
      })
    },
    fetchBags(patientId) {
      TreatmentServices.getBags(patientId).then((bags) => {
        console.log(bags)
        this.bags = bags.data
      })
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.update(values)
          } else {
            this.create(values)
          }
        } else {
          this.loading = false
        }
      })
    },
    update(values) {
      SupportServices.update({
        ...values,
      })
        .then((response) => {
          this.success(response.message)
          this.$emit('closeModal', false)
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
          this.showModal(false)
        })
    },
    create(values) {
      SupportServices.create({
        ...values,
      })
        .then((response) => {
          this.success(response.message)
          this.$emit('closeModal', false)
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
          this.showModal(false)
        })
    },
  },
}
</script>
