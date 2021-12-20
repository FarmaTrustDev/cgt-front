<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-select
          v-decorator="[
            'treatmentTypeId',
            {
              initialValue: screeningTemplate.treatmentTypeId,
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
            'HospitalsId',
            {
              initialValue: screeningTemplate.hospitalsId,
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
        </a-select>
      </a-form-item>

      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
import OrganizationServices from '~/services/API/OrganizationServices'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
import { HOSPITAL_ALIAS } from '~/services/Constant'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
export default {
  mixins: [notifications, routeHelpers, nullHelper],
  props: {
    // screeningTemplate: {
    //   default: () => ({}),
    //   type: Object,
    // },
  },
  data() {
    return {
      screeningTemplate: {},
      entityId: null,
      isCreated: false,
      loading: false,
      treatmentType: {},
      typeLoading: true,
      hospitalLoading: true,
      btnLoading: false,
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
    this.checkCreated()
  },
  methods: {
    checkCreated() {
      const entityId = this.$route.params.id

      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        this.fetch(entityId)
      }
    },
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

    upsert(values) {
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    fetch(id) {
      this.loading = true
      ScreeningTemplateServices.getById(id)
        .then((response) => {
          this.screeningTemplate = response.data
        })
        .finally(() => (this.loading = false))
    },
    create(values) {
      ScreeningTemplateServices.create(values).then((response) => {
        this.success(response.message)
        this.goto(
          `/manufacturer/administration/screening/${response.data.globalId}`
        )
      })
    },
    update(values) {
      this.btnLoading = true
      ScreeningTemplateServices.update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          // this.goto(`/patients/enrollment/${response.data.globalId}`)
        })
        .catch(this.error)
        .finally(() => (this.btnLoading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.upsert(values)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
