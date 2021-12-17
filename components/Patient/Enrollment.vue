<template>
  <div>
    <a-skeleton :loading="loading">
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <PatientEnrollmentForm :patient="patient" />
        <a-form-item>
          <FormActionButton />
          <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
        </a-form-item>
      </a-form>
    </a-skeleton>
  </div>
</template>
<script>
import notifications from '~/mixins/notifications'
import PatientServices from '~/services/API/PatientServices'
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [notifications, routeHelpers],
  data() {
    return {
      loading: false,
      successResponse: '',
      formLayout: 'vertical',
      patient: {},
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
    }
  },
  mounted() {
    this.isCreated()
  },
  methods: {
    isCreated() {
      const patientId = this.$route.params.id

      if (patientId) {
        this.fetch(patientId)
      }
    },
    fetch(id) {
      this.loading = true
      PatientServices.get(id)
        .then((response) => {
          this.patient = response.data
        })
        .finally(() => (this.loading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.create(values)
        } else {
          this.loading = false
        }
      })
    },
    create(values) {
      PatientServices.create(values)
        .then((response) => {
          this.success(response.message)
          this.goto(`/patients/enrollment/${response.data.globalId}`)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
