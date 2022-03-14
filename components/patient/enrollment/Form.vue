<template>
  <div>
    <!-- <a-spin :spinning="loading"> -->
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <FormFields :is-created="isCreated" :patient="patient" />
      <a-form-item class="pr-2 mt-15">
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          text="Save Patient & Continue"
        />
        <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
      </a-form-item>
    </a-form>
    <!-- </a-spin> -->
  </div>
</template>
<script>
import FormFields from '~/components/patient/enrollment/FormFields'
import notifications from '~/mixins/notifications'
import PatientServices from '~/services/API/PatientServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
export default {
  components: { FormFields },
  mixins: [notifications, routeHelpers, nullHelper],
  data() {
    return {
      loading: false,
      successResponse: '',
      formLayout: 'vertical',
      patient: {},
      entityId: null,
      isCreated: false,
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
    }
  },
  mounted() {
    this.checkCreated()
  },
  updated() {},
  methods: {
    checkCreated() {
      const patientId = this.$route.params.id

      if (this.isGuid(patientId)) {
        this.entityId = patientId

        this.fetch(patientId)
      }
    },
    fetch(id) {
      this.loading = true
      PatientServices.getById(id)
        .then((response) => {
          this.patient = response.data
          this.isCreated = true
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
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
    upsert(values) {
      this.loading = true
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    update(values) {
      PatientServices.update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          // this.goto(`/patients/enrollment/${response.data.globalId}`)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    create(values) {
      PatientServices.create(values)
        .then((response) => {
          this.success(response.message)
          this.goto(`/hospital/patients/${response.data.globalId}`)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
