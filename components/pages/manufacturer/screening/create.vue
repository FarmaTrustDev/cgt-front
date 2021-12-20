<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-select
          v-decorator="[
            'Treatment Type',
            {
              initialValue: screeningTemplate.treatmentType,
              rules: [
                {
                  required: true,
                  message: 'Please select your Treatment Type!',
                },
              ],
            },
          ]"
          :loading="typeLoading"
          placeholder="Select Treatment Type"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="type in treatmentType" :key="type.id">
            {{ type.name }}
          </a-select-option>
        </a-select></a-form-item
      >
      <a-form-item>
        <a-select
          v-decorator="[
            'Hospital',
            {
              initialValue: screeningTemplate.hospitalId,
              rules: [
                {
                  required: true,
                  message: 'Please select your Hospital!',
                },
              ],
            },
          ]"
          :loading="hospitalLoading"
          mode="multiple"
          placeholder="Select Hospital"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="hospital in hospitals" :key="hospital.id">
            {{ hospital.name }}
          </a-select-option>
        </a-select></a-form-item
      >
      <FormActionButton :is-created="isCreated" />
    </a-form>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
import OrganizationServices from '~/services/API/OrganizationServices'
import { HOSPITAL_ALIAS } from '~/services/Constant'
export default {
  props: {
    screeningTemplate: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      isCreated: false,
      loading: false,
      treatmentType: {},
      typeLoading: true,
      hospitalLoading: true,
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
      hospitals: [],
      formLayout: 'vertical',
    }
  },
  mounted() {
    this.fetchTreatmentTypes()
    this.fetchOrganization()
  },
  methods: {
    fetchTreatmentTypes() {
      this.typeLoading = true
      TreatmentService.get()
        .then((response) => {
          this.treatmentType = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    fetchOrganization() {
      this.hospitalLoading = true
      OrganizationServices.get({ organizationTypeAlias: HOSPITAL_ALIAS })
        .then((response) => {
          this.hospitals = response.data
        })
        .finally(() => (this.hospitalLoading = false))
    },
    onSubmit() {},
  },
}
</script>
