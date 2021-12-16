<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <PatientEnrollmentForm />
      <a-form-item>
        <FormActionButton />
        <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
      </a-form-item>
    </a-form>
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
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
    }
  },
  methods: {
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
          this.goto(`/patients/enrollment/${response.data.id}`)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
