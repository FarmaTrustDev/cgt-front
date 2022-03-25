<template>
  <div>
    <a-modal
      v-model="visible"
      title="Add New Ticket"
      :after-close="handleCancel"
      :footer="null"
      @ok="handleOk"
    >
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item
            label="Patient:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <!-- <a-input
              v-decorator="[
                'patient',
                {
                  initialValue: form.patient,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Patient !',
                    },
                  ],
                },
              ]"
              placeholder="Patient"
            /> -->
            <a-select
              v-decorator="[
                'patientId',
                {
                  initialValue: form.Id,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your country!',
                    },
                  ],
                },
              ]"
              :show-search="true"
              :filter-option="filterOption"
              placeholder="Select Country"
              style="width: 100%"
              size="large"
              class="default-select"
              @select="onPatientSelect"
              @search="searchPatient"
            >
              <a-select-option v-for="patient in patients" :key="patient.id">
                {{ patient.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Patient:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-input
              v-decorator="[
                'patient',
                {
                  initialValue: form.patient,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Patient !',
                    },
                  ],
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
                  initialValue: form.subject,
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
                  initialValue: form.description,
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
                'status',
                {
                  initialValue: form.status,
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
              <a-select-option v-for="status in statuses" :key="status.id">
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
                  initialValue: form.priority,
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
                'stakholders',
                {
                  initialValue: form.stakholders,
                  rules: [
                    {
                      required: true,
                      message: 'Please select Stakholders',
                    },
                  ],
                },
              ]"
              :loading="typeLoading"
              placeholder="Select Stakholders"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option
                v-for="stakholder in stakholdersList"
                :key="stakholder.id"
              >
                {{ stakholder.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row class="mt-15">
        <a-col class="text-right">
          <a-button type="primary" class="plr-20">Save</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { filterOption } from '~/services/Helpers'
import PatientServices from '~/services/API/PatientServices'
export default {
  data() {
    return {
      visible: true,
      patients: [],
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      typeLoading: false,
      statuses: [{ id: 1, name: 'InProcess' }],
      priorities: [
        { id: 1, name: 'High' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Low' },
      ],
      stakholdersList: [
        { id: 1, name: 'Hospita' },
        { id: 2, name: 'Other' },
        { id: 3, name: 'Other' },
      ],
    }
  },
  methods: {
    filterOption,
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      this.$parent.showAddModal = false
    },
    onSubmit() {},
    searchPatient(keyword) {
      this.fetchPatient({ puid: keyword, name: keyword, email: keyword })
    },
    fetchPatient(params = {}) {
      PatientServices.search(params).then((response) => {
        this.patients = response.data
        console.log(response)
      })
    },
    onPatientSelect(patientId, option) {
      this.fetchBags(patientId)
    },
    fetchBags(patientId) {},
  },
}
</script>
